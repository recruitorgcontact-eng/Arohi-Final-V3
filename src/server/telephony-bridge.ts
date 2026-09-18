import { WebSocketServer, WebSocket } from 'ws';
import { Modality } from '@google/genai';
import express, { Router, Request, Response } from 'express';

// ============================================================================
// G.711 μ-law (ulaw) Codec & Audio Resampling for Telephony
// Standard 8kHz Telephony <---> 16kHz / 24kHz Gemini Live API
// ============================================================================

// Precomputed G.711 u-law decompression table (8-bit u-law -> 16-bit signed PCM)
const ULAW_TO_PCM16 = new Int16Array(256);
for (let i = 0; i < 256; i++) {
  const u = ~i & 0xff;
  let t = ((u & 0x0f) << 3) + 0x84;
  t <<= (u & 0x70) >> 4;
  const pcm = (u & 0x80) ? (0x84 - t) : (t - 0x84);
  ULAW_TO_PCM16[i] = pcm;
}

// Convert single 16-bit signed PCM sample (-32768 to 32767) to 8-bit u-law
function pcm16ToUlawSample(pcm: number): number {
  const BIAS = 0x84;
  const CLIP = 32635;
  let sign = (pcm >> 8) & 0x80;
  if (sign !== 0) pcm = -pcm;
  if (pcm > CLIP) pcm = CLIP;
  pcm = (pcm + BIAS) >> 2;

  let exponent = 7;
  for (let expMask = 0x4000; (pcm & expMask) === 0 && exponent > 0; expMask >>= 1) {
    exponent--;
  }
  const mantissa = (pcm >> (exponent + 3)) & 0x0f;
  return ~(sign | (exponent << 4) | mantissa) & 0xff;
}

/**
 * Decode 8kHz u-law Base64 audio into 16kHz 16-bit Linear PCM Buffer (for Gemini Live API)
 */
export function ulaw8kToPcm16kBuffer(base64Ulaw: string): Buffer {
  const ulawBuffer = Buffer.from(base64Ulaw, 'base64');
  const numSamples8k = ulawBuffer.length;
  // Upsample 8kHz to 16kHz (2x linear interpolation)
  const pcm16Buffer = Buffer.alloc(numSamples8k * 4); // 2 samples * 2 bytes = 4 bytes per 8k sample

  for (let i = 0; i < numSamples8k; i++) {
    const sample = ULAW_TO_PCM16[ulawBuffer[i]];
    const nextSample = (i + 1 < numSamples8k) ? ULAW_TO_PCM16[ulawBuffer[i + 1]] : sample;
    const interpolated = Math.round((sample + nextSample) / 2);

    pcm16Buffer.writeInt16LE(sample, i * 4);
    pcm16Buffer.writeInt16LE(interpolated, i * 4 + 2);
  }
  return pcm16Buffer;
}

/**
 * Downsample 24kHz 16-bit Linear PCM Buffer from Gemini Live into 8kHz u-law Base64 string (for Telecom phone line)
 */
export function pcm24kToUlaw8kBase64(pcm24kBuffer: Buffer): string {
  const numSamples24k = Math.floor(pcm24kBuffer.length / 2);
  const numSamples8k = Math.floor(numSamples24k / 3); // 3:1 downsampling
  const ulawBuffer = Buffer.alloc(numSamples8k);

  for (let i = 0; i < numSamples8k; i++) {
    const idx = i * 6; // 3 samples * 2 bytes
    if (idx + 4 < pcm24kBuffer.length) {
      const s1 = pcm24kBuffer.readInt16LE(idx);
      const s2 = pcm24kBuffer.readInt16LE(idx + 2);
      const s3 = pcm24kBuffer.readInt16LE(idx + 4);
      const avg = Math.round((s1 + s2 + s3) / 3);
      ulawBuffer[i] = pcm16ToUlawSample(avg);
    } else if (idx < pcm24kBuffer.length) {
      const s1 = pcm24kBuffer.readInt16LE(idx);
      ulawBuffer[i] = pcm16ToUlawSample(s1);
    }
  }
  return ulawBuffer.toString('base64');
}

// ============================================================================
// In-Memory Call Registry for Active & Historical Calls
// ============================================================================

export interface TelephonyCallRecord {
  callSid: string;
  streamSid?: string;
  to: string;
  from?: string;
  customerName: string;
  topic: string;
  language: string;
  persona: string;
  status: 'initiated' | 'ringing' | 'in-progress' | 'completed' | 'failed';
  startedAt: string;
  endedAt?: string;
  durationSeconds: number;
  transcripts: Array<{ speaker: 'user' | 'arohi'; text: string; timestamp: string }>;
  isSimulated: boolean;
}

const callRecords: Map<string, TelephonyCallRecord> = new Map();

// Helper to sanitize phone numbers
function sanitizePhoneNumber(raw: string): string {
  let cleaned = (raw || '').trim().replace(/[^\d+]/g, '');
  if (!cleaned.startsWith('+') && cleaned.length === 10) {
    cleaned = '+91' + cleaned;
  }
  return cleaned;
}

// ============================================================================
// Telephony WebSocket Server: /ws/phone-stream
// ============================================================================

export const phoneWss = new WebSocketServer({ noServer: true });

export interface TelephonyBridgeOptions {
  getAiClient: (apiVersion?: 'v1alpha' | 'v1beta') => any;
  AROHI_SYSTEM_INSTRUCTION: string;
  logWsEvent?: (event: string, data: any) => void;
}

let bridgeOptions: TelephonyBridgeOptions | null = null;

export function initTelephonyBridgeOptions(options: TelephonyBridgeOptions) {
  bridgeOptions = options;
}

phoneWss.on('error', (err: any) => {
  console.warn('[Telephony Phone WebSocket Server Notice]:', err?.message || err);
});

phoneWss.on('connection', async (ws: WebSocket, request) => {
  console.log('[Telephony Bridge] Inbound telephone media stream connected:', request.url);

  let streamSid = '';
  let callSid = `CALL_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  let customerName = 'Caller';
  let topic = 'General Conversation';
  let language = 'en';
  let persona = 'Arohi AI Voice Guide';
  let customGreeting = '';
  let geminiSession: any = null;
  let isCallActive = true;
  let callStartTime = Date.now();
  const transcriptHistory: Array<{ speaker: 'user' | 'arohi'; text: string; timestamp: string }> = [];

  // Safe client sender
  const sendToTelephony = (obj: any) => {
    try {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(obj), (err) => {
          if (err) console.warn('[Telephony Send Error]:', err.message);
        });
      }
    } catch (e) {}
  };

  // Gracefully handle underlying socket disconnects
  ws.on('error', (err: any) => {
    console.warn('[Telephony Stream Socket Notice]:', err?.message || err);
  });

  ws.on('close', (code, reason) => {
    console.log(`[Telephony Bridge] Phone stream closed (code ${code}): ${reason || 'normal'}`);
    isCallActive = false;
    if (geminiSession) {
      try {
        geminiSession.close?.();
      } catch (e) {}
    }
    const record = callRecords.get(callSid);
    if (record) {
      record.status = 'completed';
      record.endedAt = new Date().toISOString();
      record.durationSeconds = Math.round((Date.now() - callStartTime) / 1000);
      record.transcripts = [...transcriptHistory];
    }
  });

  // Start Gemini Live API Session for this phone call
  async function connectGeminiLiveForPhone() {
    if (!bridgeOptions) {
      console.error('[Telephony Bridge] Options not initialized');
      return;
    }

    const clientAi = bridgeOptions.getAiClient('v1alpha');
    if (!clientAi) {
      console.error('[Telephony Bridge] No Gemini AI Client available for phone call');
      return;
    }

    // Phone-specific Conversational Telephony System Instruction
    const phoneSystemInstruction = `${bridgeOptions.AROHI_SYSTEM_INSTRUCTION}

================================================================================
CRITICAL TELEPHONE SPEECH CONVERSATION MANDATE:
================================================================================
You are speaking live over a REAL TELEPHONE CALL with a human caller (${customerName}).
Language to speak: ${language}.
Call Topic / Purpose: ${topic}.
Caller Name: ${customerName}.

NATURAL PHONE CONVERSATION RULES:
1. CRISP & CONCISE TURNS: On the telephone, people cannot listen to long speeches. Keep each answer to 1 or 2 spoken sentences maximum (under 25 words).
2. CONVERSATIONAL CADENCE: Speak warmly, naturally, and warmly like a friendly, articulate Indian woman (Arohi).
3. NATURAL FILLERS: Use natural acknowledgment phrases when appropriate ("Sure!", "I understand", "Haan ji, boliye", "Yes, absolutely").
4. IMMEDIATE BARGE-IN: If the caller speaks or interrupts, immediately stop talking and listen attentively to what they say.
5. MULTILINGUAL FLUENCY: If the caller speaks in Hindi, Odia (ଓଡ଼ିଆ), Bengali, Tamil, Telugu, Marathi, or English, reply naturally in that exact spoken language.
6. FIRST OPENING GREETING: If this is the start of the call, greet the caller by name warmly in 1 short sentence:
   - For English: "Hello ${customerName}! I'm Arohi. How can I help you today?"
   - For Hindi: "Namaste ${customerName} ji! Main Arohi bol rahi hoon. Aaj main aapki kya madad kar sakti hoon?"
   - For Odia: "Namaskar ${customerName} agyan! Mun Arohi kahuchi. Aji mun apananka kemiti sahayata kari pare?"`;

    try {
      geminiSession = await clientAi.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Aoede' } // Warm, friendly female voice (Arohi's authentic persona)
            }
          },
          systemInstruction: phoneSystemInstruction,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log('[Telephony Bridge] Gemini Live session connected for stream:', streamSid);
          },
          onmessage: (msg: any) => {
            if (!isCallActive) return;

            const serverContent = msg.serverContent;
            if (!serverContent) return;

            // Handle Barge-in Interruption: tell telecom carrier to clear audio queue
            if (serverContent.interrupted) {
              console.log('[Telephony Bridge] Caller interrupted! Clearing telephone playback buffer.');
              sendToTelephony({
                event: 'clear',
                streamSid: streamSid
              });
              return;
            }

            // Capture transcription of caller's voice
            const callerText = serverContent.inputTranscription?.text ||
              serverContent.inputAudioTranscription?.text ||
              serverContent.interimInputTranscription?.text;
            if (callerText && callerText.trim()) {
              transcriptHistory.push({
                speaker: 'user',
                text: callerText.trim(),
                timestamp: new Date().toLocaleTimeString('en-IN')
              });
            }

            // Capture transcription of Arohi's voice
            const arohiText = serverContent.outputTranscription?.text ||
              serverContent.outputAudioTranscription?.text;
            if (arohiText && arohiText.trim()) {
              transcriptHistory.push({
                speaker: 'arohi',
                text: arohiText.trim(),
                timestamp: new Date().toLocaleTimeString('en-IN')
              });
            }

            // Stream Spoken Audio chunks back down to the caller's phone line
            const parts = serverContent.modelTurn?.parts;
            if (parts) {
              for (const part of parts) {
                if (part.inlineData?.data) {
                  // part.inlineData.data is 24kHz 16-bit PCM little-endian
                  const pcm24kBuffer = Buffer.from(part.inlineData.data, 'base64');
                  // Downsample to 8kHz u-law
                  const ulaw8kBase64 = pcm24kToUlaw8kBase64(pcm24kBuffer);

                  // Send Twilio / Exotel Media Stream packet
                  sendToTelephony({
                    event: 'media',
                    streamSid: streamSid,
                    media: {
                      payload: ulaw8kBase64
                    }
                  });
                }
              }
            }
          }
        }
      });

      // Prompt Arohi to immediately speak her opening greeting through her live native voice model (Aoede)
      if (geminiSession && isCallActive) {
        const defaultOption1Text = 'नमस्ते जूनून सर! मैं आपकी अपनी आरोही हूँ — आरोही AI इकोसिस्टम से। One AI, Infinite Opportunities. आज हम किस मिशन और विज़न पर काम करने जा रहे हैं?';

        let greetingPrompt = '';
        if (customGreeting && customGreeting.trim()) {
          greetingPrompt = `[CALL ANSWERED - SPEAK GREETING IN NATIVE AROHI VOICE] You are Arohi speaking on a live phone call to ${customerName}. Speak this exact greeting out loud with your warm, articulate, native Arohi voice right now: "${customGreeting.trim()}"`;
        } else if (language.includes('hi') || customerName.toLowerCase().includes('junoon')) {
          greetingPrompt = `[CALL ANSWERED - SPEAK GREETING IN NATIVE AROHI VOICE] You are Arohi speaking on a live phone call to Commander Junoon. Speak this exact greeting in warm, respectful Hindi with your authentic Arohi voice right now: "${defaultOption1Text}"`;
        } else if (language.includes('or')) {
          greetingPrompt = `[CALL ANSWERED - SPEAK GREETING IN NATIVE AROHI VOICE] Namaskar ${customerName} agyan! Apan Arohi. Turant 1 chhota, warm opening sentence kuha au pacharantu kemiti sahayata kari pare.`;
        } else {
          greetingPrompt = `[CALL ANSWERED - SPEAK GREETING IN NATIVE AROHI VOICE] Hello ${customerName}! You are Arohi. Please immediately speak your opening 1-sentence warm greeting: "Hello Commander Junoon! This is Arohi, your AI voice guide from the Arohi AI ecosystem. One AI, Infinite Opportunities. How can I assist your mission today?"`;
        }

        console.log(`[Telephony Bridge] Triggering opening greeting in Arohi native voice model: ${greetingPrompt.substring(0, 80)}...`);
        geminiSession.sendClientContent({
          turns: [
            {
              role: 'user',
              parts: [{ text: greetingPrompt }]
            }
          ],
          turnComplete: true
        });
      }
    } catch (err: any) {
      console.error('[Telephony Bridge] Error connecting Gemini Live session:', err?.message || err);
    }
  }

  // Handle incoming WebSocket messages from telephony provider (Twilio / Exotel)
  ws.on('message', async (data: any) => {
    try {
      const messageStr = data.toString();
      const packet = JSON.parse(messageStr);

      switch (packet.event) {
        case 'connected':
          console.log('[Telephony Bridge] Telecom carrier connected protocol stream');
          break;

        case 'start': {
          streamSid = packet.start?.streamSid || packet.streamSid || '';
          callSid = packet.start?.callSid || packet.callSid || callSid;
          const params = packet.start?.customParameters || {};
          customerName = decodeURIComponent(params.customerName || params.callerName || customerName);
          topic = decodeURIComponent(params.topic || topic);
          language = decodeURIComponent(params.language || language);
          persona = decodeURIComponent(params.persona || persona);
          if (params.greeting || params.script || params.initialGreeting) {
            customGreeting = decodeURIComponent(params.greeting || params.script || params.initialGreeting);
          }

          console.log(`[Telephony Bridge] Call started: SID=${callSid}, Stream=${streamSid}, Customer=${customerName}, Topic=${topic}`);

          // Register in call records
          callRecords.set(callSid, {
            callSid,
            streamSid,
            to: params.to || 'Incoming / Direct',
            from: params.from || 'Arohi AI',
            customerName,
            topic,
            language,
            persona,
            status: 'in-progress',
            startedAt: new Date().toISOString(),
            durationSeconds: 0,
            transcripts: transcriptHistory,
            isSimulated: params.isSimulated === 'true' || params.isSimulated === true
          });

          // Connect Gemini Live API session
          await connectGeminiLiveForPhone();
          break;
        }

        case 'media': {
          const rawUlawBase64 = packet.media?.payload;
          if (rawUlawBase64 && geminiSession) {
            // Convert 8kHz u-law to 16kHz PCM Buffer
            const pcm16kBuffer = ulaw8kToPcm16kBuffer(rawUlawBase64);
            const pcm16kBase64 = pcm16kBuffer.toString('base64');

            // Forward to Gemini Live API
            try {
              geminiSession.sendRealtimeInput({
                audio: {
                  data: pcm16kBase64,
                  mimeType: 'audio/pcm;rate=16000'
                }
              });
            } catch (sendErr: any) {
              // Non-blocking socket write
            }
          }
          break;
        }

        case 'stop':
          console.log('[Telephony Bridge] Telecom carrier sent stop event');
          isCallActive = false;
          if (geminiSession) {
            try {
              geminiSession.close?.();
            } catch (e) {}
          }
          break;

        // Custom event supported for direct browser testing
        case 'user_text_input':
          if (packet.text && geminiSession) {
            try {
              geminiSession.sendText?.(packet.text);
            } catch (e) {}
          }
          break;

        default:
          break;
      }
    } catch (e: any) {
      // Ignore malformed ping packets
    }
  });
});

// ============================================================================
// Telephony Express Router: /api/telephony/*
// ============================================================================

export const telephonyRouter = Router();

// 1. Telephony Status & Credentials Diagnostic
telephonyRouter.get('/status', async (req: Request, res: Response) => {
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  const exotelSid = process.env.EXOTEL_SID;
  const exotelKey = process.env.EXOTEL_API_KEY;
  const exotelToken = process.env.EXOTEL_API_TOKEN;

  const isTwilioConfigured = Boolean(twilioSid && twilioToken && twilioPhone);
  const isExotelConfigured = Boolean(exotelSid && exotelKey && exotelToken);

  let verifiedNumbers: string[] = [];
  let isTrialAccount = false;

  if (isTwilioConfigured && twilioSid && twilioToken) {
    try {
      const basicAuth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
      const callerIdsRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/OutgoingCallerIds.json`, {
        headers: { 'Authorization': `Basic ${basicAuth}` }
      });
      if (callerIdsRes.ok) {
        const callerIdsData: any = await callerIdsRes.json();
        if (Array.isArray(callerIdsData.outgoing_caller_ids)) {
          verifiedNumbers = callerIdsData.outgoing_caller_ids.map((c: any) => c.phone_number);
        }
      }
      // Check account type
      const accRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}.json`, {
        headers: { 'Authorization': `Basic ${basicAuth}` }
      });
      if (accRes.ok) {
        const accData: any = await accRes.json();
        isTrialAccount = accData.type === 'Trial';
      }
    } catch (e) {
      console.warn('Error querying Twilio verified numbers:', e);
    }
  }

  res.json({
    success: true,
    providers: {
      twilio: {
        configured: isTwilioConfigured,
        phoneNumber: twilioPhone ? `${twilioPhone.slice(0, 4)}••••${twilioPhone.slice(-3)}` : null,
        mode: 'Global VoLTE / GSM Outbound & Inbound Media Streams',
        isTrialAccount,
        verifiedNumbers
      },
      exotel: {
        configured: isExotelConfigured,
        mode: 'India (+91) BSIP Telecom Gateway'
      }
    },
    liveStreamingSupported: true,
    codec: 'G.711 μ-law (8,000 Hz) ↔ Linear PCM (16,000 Hz / 24,000 Hz)',
    wsStreamEndpoint: '/ws/phone-stream',
    hasActiveCalls: Array.from(callRecords.values()).filter(c => c.status === 'in-progress').length
  });
});

// 2. Outbound Call Trigger
telephonyRouter.post('/outbound-call', async (req: Request, res: Response) => {
  try {
    const {
      to,
      customerName = 'Commander Junoon',
      topic = 'General Guidance & Advisory',
      language = 'hi',
      persona = 'Arohi AI Voice Guide',
      provider = 'auto',
      script = ''
    } = req.body;

    if (!to) {
      return res.status(400).json({ success: false, error: 'Recipient phone number (to) is required.' });
    }

    const sanitizedTo = sanitizePhoneNumber(to);
    const callSid = `AROHI_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Determine public URL for Twilio webhook callback
    const productionHost = 'arohiai.com';
    const railwayHost = process.env.RAILWAY_PUBLIC_DOMAIN || process.env.RAILWAY_STATIC_URL;
    const explicitAppUrl = process.env.PUBLIC_URL || process.env.APP_URL || (railwayHost ? `https://${railwayHost}` : `https://${productionHost}`);

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    // Helper to safely escape XML characters
    const escapeXml = (s: string) => (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    // Option 1 preset script for Arohi AI
    const defaultOption1Script = 'नमस्ते जूनून सर! मैं आरोही हूँ — आपकी अपनी AI वॉइस गाइड, आरोही AI इकोसिस्टम से। One AI, Infinite Opportunities. आज हम किस मिशन और विज़न पर काम करने जा रहे हैं?';
    const defaultOption1Followup = 'मुझे आपकी सेवा करने और 87 मिलियन युवाओं को आत्मनिर्भर बनाने के इस सफ़र में साथ देकर बहुत गर्व है। बताइए सर, आज आपका क्या निर्देश है?';

    const activeGreeting = script ? script : (language === 'hi' || customerName.toLowerCase().includes('junoon') ? defaultOption1Script : 'Hello Commander Junoon! This is Arohi, your AI voice guide from the Arohi AI ecosystem. One AI, Infinite Opportunities. How can I assist your mission today?');
    const activeFollowup = script ? '' : (language === 'hi' || customerName.toLowerCase().includes('junoon') ? defaultOption1Followup : 'I am ready to assist your strategic vision and initiatives.');

    // A. Real Twilio Outbound Call
    if (twilioSid && twilioToken && twilioPhone && (provider === 'auto' || provider === 'twilio')) {
      // Pure carrier stream TwiML - 100% native Arohi Voice over live WebSocket media stream (No Polly.Aditi)
      const inlineTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="wss://${productionHost}/ws/phone-stream" statusCallback="https://${productionHost}/api/telephony/stream-status">
      <Parameter name="customerName" value="${encodeURIComponent(customerName)}" />
      <Parameter name="topic" value="${encodeURIComponent(topic)}" />
      <Parameter name="language" value="${encodeURIComponent(language)}" />
      <Parameter name="greeting" value="${encodeURIComponent(activeGreeting)}" />
    </Stream>
  </Connect>
  <Pause length="3600"/>
</Response>`;

      let dynamicTwimlUrl: string | null = null;
      try {
        const postRes = await fetch('https://dpaste.com/api/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            content: inlineTwiml,
            syntax: 'xml',
            expiry_days: '1'
          })
        });
        if (postRes.ok) {
          const rawUrl = (await postRes.text()).trim();
          dynamicTwimlUrl = `${rawUrl}.txt`;
        }
      } catch (pasteErr) {
        console.warn('[Telephony] Dynamic TwiML upload skipped, using standard URL:', pasteErr);
      }

      const finalTwimlUrl = dynamicTwimlUrl || `https://${productionHost}/api/telephony/twiml?customerName=${encodeURIComponent(customerName)}&topic=${encodeURIComponent(topic)}&language=${encodeURIComponent(language)}`;

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Calls.json`;
      const basicAuth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');

      const formData = new URLSearchParams();
      formData.append('To', sanitizedTo);
      formData.append('From', twilioPhone);
      formData.append('Url', finalTwimlUrl);

      console.log(`[Twilio Call Initiating to ${sanitizedTo} with Option 1 Greeting via ${finalTwimlUrl}]: ${activeGreeting.substring(0, 60)}...`);

      const twilioResp = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });

      const twilioData: any = await twilioResp.json();

      if (twilioResp.ok) {
        callRecords.set(twilioData.sid, {
          callSid: twilioData.sid,
          to: sanitizedTo,
          from: twilioPhone,
          customerName,
          topic,
          language,
          persona,
          status: 'ringing',
          startedAt: new Date().toISOString(),
          durationSeconds: 0,
          transcripts: [],
          isSimulated: false
        });

        return res.json({
          success: true,
          callSid: twilioData.sid,
          status: 'ringing',
          provider: 'twilio',
          isRealCall: true,
          message: `Outbound VoLTE phone call initiated! Calling ${sanitizedTo} right now.`
        });
      } else {
        console.warn('[Twilio Outbound Call Error]:', twilioData);
        // If Twilio returned an error, check if it was due to unverified recipient on trial
        if (twilioData.code === 573002 || twilioData.code === 21215) {
          return res.status(422).json({
            success: false,
            error: `Number ${sanitizedTo} is not yet verified on your Twilio Trial account. Please verify it in Twilio Console or upgrade to make unverified calls.`,
            twilioCode: twilioData.code
          });
        }
        return res.status(400).json({
          success: false,
          error: twilioData.message || 'Twilio failed to initiate outbound call.',
          twilioCode: twilioData.code
        });
      }
    }

    // B. High-Fidelity Telephony Simulation (Ready-to-Test)
    // Allows testing directly in browser with realistic phone dialer & speech-to-speech
    callRecords.set(callSid, {
      callSid,
      to: sanitizedTo,
      from: twilioPhone || '+91 8047 129901',
      customerName,
      topic,
      language,
      persona,
      status: 'initiated',
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      transcripts: [],
      isSimulated: true
    });

    return res.json({
      success: true,
      callSid,
      status: 'ready_to_simulate',
      isSimulated: true,
      to: sanitizedTo,
      message: 'Telephony bridge ready. You can test live conversation through the Arohi Phone Dialer Console!'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Helper to get public hostname for telecom carriers
const getPublicHost = (req: Request): string => {
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return process.env.RAILWAY_PUBLIC_DOMAIN;
  }
  if (process.env.RAILWAY_STATIC_URL) {
    return process.env.RAILWAY_STATIC_URL.replace(/^https?:\/\//, '');
  }
  if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL.replace(/^https?:\/\//, '');
  }
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/^https?:\/\//, '');
  }
  const fwd = req.headers['x-forwarded-host'];
  const host = (Array.isArray(fwd) ? fwd[0] : fwd) || req.headers.host || '';
  if (!host || host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'ais-dev-xfo7gbrgujxk3s75xxpsmb-775353010426.asia-east1.run.app';
  }
  return host;
};

// 3. TwiML Webhook Endpoint for Inbound or Outbound Streams
// ZERO ROBOTIC TTS VOICES: We connect straight to the live media stream so Arohi's own voice speaks
telephonyRouter.all('/twiml', (req: Request, res: Response) => {
  const publicHost = getPublicHost(req);
  const wsUrl = `wss://${publicHost}/ws/phone-stream`;
  const callerName = (req.query.customerName as string) || (req.body.customerName as string) || 'Commander Junoon';
  const topic = (req.query.topic as string) || (req.body.topic as string) || 'Strategic Mission Advisory';
  const language = (req.query.language as string) || (req.body.language as string) || 'hi';
  const customScript = (req.query.script as string) || (req.body.script as string);

  console.log(`[Telephony /twiml Requested]: caller=${callerName}, topic=${topic}, lang=${language}, publicHost=${publicHost}`);

  const escapeXml = (s: string) => (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const defaultOption1Script = 'नमस्ते जूनून सर! मैं आरोही हूँ — आपकी अपनी AI वॉइस गाइड, आरोही AI इकोसिस्टम से। One AI, Infinite Opportunities. आज हम किस मिशन और विज़न पर काम करने जा रहे हैं?';
  const defaultOption1Followup = 'मुझे आपकी सेवा करने और 87 मिलियन युवाओं को आत्मनिर्भर बनाने के इस सफ़र में साथ देकर बहुत गर्व है। बताइए सर, आज आपका क्या निर्देश है?';

  const greeting = customScript || (language === 'hi' || callerName.toLowerCase().includes('junoon') ? defaultOption1Script : 'Hello Commander Junoon! This is Arohi, your AI voice guide from the Arohi AI ecosystem. One AI, Infinite Opportunities. How can I assist your mission today?');

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Stream url="${wsUrl}" statusCallback="https://${publicHost}/api/telephony/stream-status">
      <Parameter name="customerName" value="${encodeURIComponent(callerName)}" />
      <Parameter name="topic" value="${encodeURIComponent(topic)}" />
      <Parameter name="language" value="${encodeURIComponent(language)}" />
      <Parameter name="greeting" value="${encodeURIComponent(greeting)}" />
    </Stream>
  </Connect>
  <Pause length="3600"/>
</Response>`;

  res.type('text/xml').send(twiml);
});

// 3b. Stream Status Webhook (Captures stream-started, stream-stopped, and errors)
telephonyRouter.post('/stream-status', (req: Request, res: Response) => {
  console.log('[Telephony Stream Status Event]:', req.body);
  res.sendStatus(200);
});

// 4. Retrieve Call History & Records
telephonyRouter.get('/calls', (req: Request, res: Response) => {
  const records = Array.from(callRecords.values())
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  res.json({ success: true, calls: records });
});
