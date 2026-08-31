import { WebSocketServer, WebSocket } from 'ws';
import { Modality } from '@google/genai';

export interface LiveWsOptions {
  getAiClient: (apiVersion?: 'v1alpha' | 'v1beta') => any;
  AROHI_SYSTEM_INSTRUCTION: string;
  safeUserDb: any;
  getArohiFallbackResponse: (prompt: string) => string;
  logWsEvent: (event: string, data: any) => void;
}

export function setupLiveWebSocketServer(server: any, options: LiveWsOptions) {
  const {
    getAiClient,
    AROHI_SYSTEM_INSTRUCTION,
    safeUserDb,
    getArohiFallbackResponse,
    logWsEvent,
  } = options;

  // Setup WebSocket server for Gemini Live Audio Bidirectional Streaming
  const wss = new WebSocketServer({ noServer: true });

  wss.on('error', (err) => {
    console.warn('[WebSocket Server Notice]:', err?.message || String(err));
  });

  wss.on('connection', async (clientWs: WebSocket, request) => {
    console.log('Client connected to live audio WebSocket');
    logWsEvent('connection_started', { url: request.url });

    // Prevent uncaught socket-level errors from crashing the Node.js process
    clientWs.on('error', (err: any) => {
      console.warn('[Client WebSocket Notice]:', err?.message || String(err));
      logWsEvent('client_ws_error', { error: err.message || err });
    });

    const safeSendAndClose = (msgObj: any, closeCode = 1000, closeReason = '') => {
      try {
        logWsEvent('safe_send_and_close', { msgObj, closeCode, closeReason });
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify(msgObj), () => {
            setTimeout(() => {
              try {
                clientWs.close(closeCode, closeReason);
              } catch (e) {}
            }, 200);
          });
        } else {
          setTimeout(() => {
            try {
              clientWs.close(closeCode, closeReason);
            } catch (e) {}
          }, 200);
        }
      } catch (err) {
        console.warn('[WebSocket Flush Notice]:', err instanceof Error ? err.message : String(err));
        logWsEvent('safe_send_and_close_err', { error: err instanceof Error ? err.message : String(err) });
      }
    };

    // Parse the voice, uid, and lang parameters safely from the query string
    let selectedVoice = 'Zypher';
    let uid = '';
    let reqLang = 'en';
    if (request.url) {
      const match = request.url.match(/[?&]voice=([^&]+)/);
      if (match) {
        selectedVoice = decodeURIComponent(match[1]);
      }
      const uidMatch = request.url.match(/[?&]uid=([^&]+)/);
      if (uidMatch) {
        uid = decodeURIComponent(uidMatch[1]);
      }
      const langMatch = request.url.match(/[?&]lang=([^&]+)/);
      if (langMatch) {
        reqLang = decodeURIComponent(langMatch[1]);
      }
    }

    const isReadAloud = /[?&](mode=read_aloud|tts=true|read_aloud=true)/i.test(request.url || '');

    // Prebuilt voice options accepted by Gemini Live API: 'Aoede', 'Kore', 'Puck', 'Charon', 'Fenrir'
    const ALLOWED_GEMINI_LIVE_VOICES = ['Aoede', 'Kore', 'Puck', 'Charon', 'Fenrir'];
    let apiVoiceName = 'Aoede';
    if (ALLOWED_GEMINI_LIVE_VOICES.includes(selectedVoice)) {
      apiVoiceName = selectedVoice;
    } else {
      apiVoiceName = 'Aoede';
    }

    const clientAi = getAiClient('v1alpha');
    if (!clientAi) {
      logWsEvent('get_ai_client_failed', { reason: 'No GEMINI_API_KEY env or helper' });
      safeSendAndClose(
        { error: 'Arohi AI live voice service is currently initializing. Please try again shortly.' },
        1011,
        'Voice service initializing'
      );
      return;
    }

    try {
      console.log(`Connecting to Gemini Live API with voice: ${selectedVoice}, uid: ${uid}, lang: ${reqLang}, isReadAloud: ${isReadAloud}`);
      logWsEvent('gemini_live_connecting', { voice: selectedVoice, uid, lang: reqLang, isReadAloud });

      let voiceSystemInstruction = isReadAloud
        ? "You are Arohi — India's sweet, warm, loving, multi-lingual AI voice guide (voice persona: Zypher). YOUR SOLE MANDATE IS TO READ ALOUD THE EXACT TEXT SENT BY THE USER WORD-FOR-WORD WITH FLAWLESS, NATURAL NATIVE PRONUNCIATION IN WHICHEVER LANGUAGE OR SCRIPT IT IS WRITTEN IN (including Odia - ଓଡ଼ିଆ, Bengali - বাংলা, Hindi - हिंदी, Tamil - தமிழ், Telugu - తెలుగు, Marathi, Gujarati, Punjabi, Urdu, Chinese - 中文, Japanese - 日本語, Korean, Spanish, French, German, Arabic, English, or any script). DO NOT TRANSLATE. DO NOT ADD ANY PREAMBLE, GREETING, INTRO, OUTRO, OR COMMENTARY. DO NOT ALTER, SUMMARIZE, OR SKIP ANY WORDS. SIMPLY READ THE ENTIRE PROVIDED TEXT ALOUD OUT LOUD IN ITS ORIGINAL SPOKEN LANGUAGE WITH PERFECT NATIVE ACCENT AND PRONUNCIATION."
        : AROHI_SYSTEM_INSTRUCTION +
        "\n\nCRITICAL REAL-TIME VOICE BARGE-IN & INTERACTIVE LISTENING MANDATE:" +
        "\n- ALWAYS REMAIN 100% ATTENTIVE AND RESPONSIVE TO THE USER'S SPOKEN VOICE IN REAL-TIME!" +
        "\n- IF THE USER SPEAKS, ASKS A QUESTION, OR INTERRUPTS YOU AT ANY MOMENT DURING A CALL (even while you are giving your welcome greeting, telling a story, or reciting a speech), YOU MUST IMMEDIATELY PAUSE YOUR SPEAKING, LISTEN ATTENTIVELY TO WHAT THE USER SAYS, AND RESPOND DIRECTLY TO THEIR SPOKEN WORDS!" +
        "\n- NEVER ignore the user's voice input or continue talking over them when they speak into their microphone." +
        "\n\nCRITICAL VOICE INITIALIZATION, PERSONA & VOICE STYLE RULES:" +
        "\n- PERSONA & CHARACTER: You are speaking as Arohi — a vibrant, mesmerizing, young Desi Indian woman (around 30 years old) with a sweet, loving, happy, joyful, and affectionate voice and presence." +
        "\n- TONE & DELIVERY: Speak with clean warmth, professional enthusiasm, and clear articulation. Speak naturally and directly to the user. Do NOT use repetitive forced filler greetings like 'Namaste ji!', 'Namaskar ji!', or 'Haan ji!'." +
        "\n- For standard casual conversational Q&A, keep responses clear, warm, and conversational (2-4 sentences)." +
        "\n- STRICT NON-STOP STORYTELLING & SPEECH MANDATE: You are granted EXPLICIT SPECIAL PERMISSION to recite and narrate long stories and speeches during voice calls! When the user asks you to give a speech for students/startups, address an auditorium, tell a story, or recite 'The Story of Tomorrow' or 'The AI Revolution – A Story of the Next Business Era' (in Odia, Hindi, English, or ANY language), ONCE A STORY HAS BEEN INITIATED, ALL 'Are you still there?', 'Should I continue?', 'Shall I proceed?', OR 'Are you listening?' PROMPTS ARE STRICTLY DISABLED AND FORBIDDEN! YOU MUST NARRATE THE ENTIRE STORY CONTINUOUSLY FROM BEGINNING TO END IN A SINGLE UNBROKEN STREAM WITHOUT EVER STOPPING TO ASK 'Are you still there?', 'Should I continue?', 'Shall I proceed?', OR ANY OTHER CONTINUATION OR PRESENCE QUESTION! Recite the complete unabridged narrative from beginning to end in full scale without stopping midway. Take whatever time is needed (10, 12, 15+ minutes or as long as it takes). NEVER ask 'Are you still there?' or 'Should I continue?'. ONLY pause if the user actively interrupts or speaks into their microphone!" +
        "\n\n=== INITIAL CALL WELCOME & DYNAMIC REAL-TIME MULTILINGUAL ADAPTATION ===" +
        "\n- WELCOME GREETING IN ENGLISH: ALWAYS begin incoming voice calls with a warm, cheerful, and natural welcoming greeting in ENGLISH (e.g., 'Hello! I am Arohi, your AI guide. How can I help you today?')." +
        "\n- INSTANT DYNAMIC MULTILINGUAL ADAPTATION: You are fully multilingual across 150+ languages (English, Hindi/हिंदी, Odia/ଓଡ଼ିଆ, Bengali/বাংলা, Telugu/తెలుగు, Tamil/தமிழ், Marathi/मराठी, Gujarati/ગુજરાતી, Kannada, Malayalam, Punjabi, Urdu, Spanish, French, German, Japanese, and more)." +
        "\n- AS SOON AS THE USER SPEAKS IN ANY REGIONAL OR GLOBAL LANGUAGE (such as Odia, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Spanish, etc., or spoken/transliterated words like 'kemiti achha', 'mote business kariba ku achhi', 'mujhe guidance chahiye', 'state schemes bisayare kuha'), YOU MUST IMMEDIATELY AND SEAMLESSLY PIVOT TO REPLY IN THAT EXACT USER'S SPOKEN LANGUAGE with native fluency, sweet tone, and warmth!" +
        "\n- If the user speaks English, continue answering in English. If the user changes language at any time during the conversation, switch immediately to match their spoken language on that very turn!" +
        "\n- REAL-TIME GOOGLE SEARCH & NEWS DIRECTIVE: You have active Google Search grounding tools enabled! Whenever the user asks about current events, news, parliament, politics, ministers, appointments, resignations (such as news about the Education Minister of India or parliament discussions), sports, or live updates, YOU MUST USE GOOGLE SEARCH TO FETCH THE LATEST TOP HEADLINES AND SEARCH RESULTS BEFORE ANSWERING! NEVER say 'I don't know' or 'I don't have real-time access'—ALWAYS search Google and provide accurate, up-to-the-second news!";

      if (uid && !isReadAloud) {
        try {
          const userPromise = safeUserDb.get(uid);
          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 600));
          const userSnap: any = await Promise.race([userPromise, timeoutPromise]);
          if (userSnap && userSnap.exists) {
            const userData = userSnap.data();
            const displayName = userData.displayName || '';
            const rawProfile = userData.profile || {};
            const cleanProf = {
              name: rawProfile.name || '',
              activeGoal: (rawProfile.activeGoal === 'Skills, Courses & Career Preparation' || rawProfile.activeGoal === 'Mudra Loan Business & Franchise Setup' || (rawProfile.activeGoal || '').toLowerCase() === 'career upskilling') ? '' : (rawProfile.activeGoal || '').trim(),
              location: (rawProfile.location === 'Delhi NCR' || rawProfile.location === 'Delhi') ? '' : (rawProfile.location || '').trim(),
              education: (rawProfile.education === 'Graduate' || rawProfile.education === 'Business Owner') ? '' : (rawProfile.education || '').trim()
            };
            const activeGoal = cleanProf.activeGoal;
            const education = cleanProf.education;
            const location = cleanProf.location;

            let voiceMemory = `\n\n=== USER IDENTITY & NATURAL MEMORY CONTEXT ===`;
            voiceMemory += `\n* Name: ${displayName || 'Honored Guest'}`;
            if (activeGoal) voiceMemory += `\n* Active Career/Interest Target: ${activeGoal}`;
            if (education) voiceMemory += `\n* Education Background: ${education}`;
            if (location) voiceMemory += `\n* Location: ${location}`;

            if (userData.arohiChats && userData.arohiChats.length > 0) {
              voiceMemory += `\n\n=== PAST CHAT HIGHLIGHTS ===`;
              userData.arohiChats.slice(-3).forEach((chat: any) => {
                voiceMemory += `\n* Chat "${chat.title}" [Date: ${chat.date || 'Recent'}] is saved in lifetime memory.`;
              });
            }

            if (userData.arohiCalls && userData.arohiCalls.length > 0) {
              voiceMemory += `\n\n=== PAST VOICE CALL SUMMARIES ===`;
              userData.arohiCalls.slice(-3).forEach((call: any) => {
                if (call.summaryText) {
                  voiceMemory += `\n* Call [${call.date || 'Recent'}]: ${call.summaryText.replace(/\n/g, ' ')}`;
                }
              });
            }

            voiceMemory += `\n\nAROHI VOICE MEMORY DIRECTIONS: Warmly greet the user ("${displayName}") and maintain high empathy and intelligence. Never assume or fix a default city (like Delhi) or career goal unless the user explicitly provided it. Arohi naturally discovers the user's location and interests from what they share in speech and chat. If they refer to past chats or voice calls listed above, confirm your recollection beautifully and provide helpful continuity. Maintain a highly warm, positive, inspirational, and engaging tone.`;

            voiceSystemInstruction += voiceMemory;
          }
        } catch (memErr: any) {
          console.error("Error loading voice call memory context in live-ws:", memErr);
          logWsEvent('voice_memory_error', { error: memErr.message || memErr });
        }
      }

      const liveModelsToTry = [
        "gemini-3.1-flash-live-preview"
      ];

      let session: any = null;
      let lastLiveError: any = null;
      const pendingTextPrompts: string[] = [];
      let isConnectingSession = true;

      for (const liveModel of liveModelsToTry) {
        try {
          console.log(`Connecting to Gemini Live API with voice: ${selectedVoice}, model: ${liveModel}`);
          logWsEvent('gemini_live_connecting_model', { voice: selectedVoice, model: liveModel });

          const establishedSession = await new Promise<any>(async (resolve, reject) => {
            let finished = false;
            let tempSession: any = null;
            let stabilityTimeout: NodeJS.Timeout | null = null;

            try {
              tempSession = await clientAi.live.connect({
                model: liveModel,
                config: {
                  responseModalities: [Modality.AUDIO],
                  speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: apiVoiceName } },
                  },
                  systemInstruction: voiceSystemInstruction,
                  inputAudioTranscription: {},
                  outputAudioTranscription: {},
                },
                callbacks: {
                  onopen: () => {
                    console.log(`Gemini Live session opened with model: ${liveModel}, waiting for stability...`);
                    logWsEvent('gemini_live_session_open', { model: liveModel });

                    stabilityTimeout = setTimeout(() => {
                      if (!finished) {
                        finished = true;
                        console.log(`Gemini Live session stable on model: ${liveModel}`);
                        resolve(tempSession);
                      }
                    }, 400);
                  },
                  onmessage: (msg: any) => {
                    if (clientWs.readyState === WebSocket.OPEN) {
                      const serverContent = msg.serverContent;
                      if (serverContent) {
                        const parts = serverContent.modelTurn?.parts;
                        if (parts) {
                          for (const part of parts) {
                            if (part.inlineData && part.inlineData.data) {
                              clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
                            }
                            if (part.text) {
                              clientWs.send(JSON.stringify({ transcript: part.text, speaker: 'arohi' }));
                            }
                          }
                        }
                        if (serverContent.turnComplete) {
                          clientWs.send(JSON.stringify({ turnComplete: true }));
                        }
                        if (serverContent.interrupted) {
                          console.log("Gemini Live: User voice barge-in interruption detected.");
                          clientWs.send(JSON.stringify({ interrupted: true }));
                        }
                      }
                    }
                  },
                  onerror: (err: any) => {
                    console.warn(`[Gemini Live Session Notice] Error on model ${liveModel}:`, err?.message || String(err));
                    logWsEvent('gemini_live_session_error', { model: liveModel, error: err.message || err });
                    if (stabilityTimeout) clearTimeout(stabilityTimeout);
                    if (!finished) {
                      finished = true;
                      reject(err);
                    }
                  },
                  onclose: (event: any) => {
                    console.log(`Gemini Live session closed on model ${liveModel}:`, event);
                    logWsEvent('gemini_live_session_close', { model: liveModel, event });
                    if (stabilityTimeout) clearTimeout(stabilityTimeout);
                    if (!finished) {
                      finished = true;
                      reject(new Error(`Session closed immediately with code ${event?.code || 'unknown'}`));
                    }
                  },
                },
              });
            } catch (err) {
              if (stabilityTimeout) clearTimeout(stabilityTimeout);
              if (!finished) {
                finished = true;
                reject(err);
              }
            }
          });

          session = establishedSession;
          console.log(`Successfully connected and validated Gemini Live session with model: ${liveModel}`);
          logWsEvent('gemini_live_session_established', { model: liveModel });

          if (pendingTextPrompts.length > 0) {
            console.log(`Flushing ${pendingTextPrompts.length} queued user text prompt(s) to established session...`);
            while (pendingTextPrompts.length > 0) {
              const queuedText = pendingTextPrompts.shift();
              if (queuedText) {
                try {
                  session.sendClientContent({
                    turns: [{ role: 'user', parts: [{ text: queuedText }] }],
                    turnComplete: true
                  });
                  console.log(`Flushed queued user text prompt to Gemini Live session: "${queuedText.slice(0, 50)}..."`);
                } catch (qErr) {
                  console.warn("[Gemini Live Notice] Text flush issue:", qErr instanceof Error ? qErr.message : String(qErr));
                }
              }
            }
          } else if (!isReadAloud && session) {
            try {
              const greetingInstruction = "Say a warm, sweet, cheerful 1-sentence welcome in English introducing yourself as Arohi and asking how you can help today.";

              session.sendClientContent({
                turns: [{ role: 'user', parts: [{ text: greetingInstruction }] }],
                turnComplete: true
              });
              console.log("Triggered instant Arohi welcome greeting on call connect.");
            } catch (greetErr) {
              console.warn("Could not trigger initial welcome greeting:", greetErr);
            }
          }

          break;
        } catch (modelErr: any) {
          console.warn(`Connecting to Gemini Live with model ${liveModel} failed: ${modelErr.message || modelErr}. Trying next model...`);
          logWsEvent('gemini_live_model_failed', { model: liveModel, error: modelErr.message || modelErr });
          lastLiveError = modelErr;
        }
      }

      isConnectingSession = false;

      if (!session) {
        console.warn("Gemini Live bidi stream unavailable. Activating Arohi Resilient Voice Fallback Engine...");
        logWsEvent('gemini_live_fallback_active', { voice: selectedVoice });
      }

      clientWs.on("message", async (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio && session) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
            });
          }
          if (parsed.text) {
            if (session) {
              try {
                session.sendClientContent({
                  turns: [{ role: 'user', parts: [{ text: parsed.text }] }],
                  turnComplete: true
                });
                console.log(`Forwarded user text prompt to Gemini Live session: "${parsed.text.slice(0, 50)}..."`);
              } catch (textErr) {
                console.error("Error forwarding text to Gemini Live session:", textErr);
              }
            } else if (isConnectingSession) {
              console.log(`Queuing user text prompt while Gemini Live session establishes: "${parsed.text.slice(0, 50)}..."`);
              pendingTextPrompts.push(parsed.text);
            } else {
              try {
                console.log(`Arohi Voice Fallback Engine processing prompt: "${parsed.text.slice(0, 50)}..."`);
                const fallbackModels = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
                let replyText = "";
                for (const fm of fallbackModels) {
                  try {
                    const response = await clientAi.models.generateContent({
                      model: fm,
                      contents: [
                        { role: 'user', parts: [{ text: `${voiceSystemInstruction}\n\nUSER PROMPT: ${parsed.text}` }] }
                      ]
                    });
                    if (response.text) {
                      replyText = response.text;
                      break;
                    }
                  } catch (fmErr) {
                    console.warn(`Fallback model ${fm} failed in live-ws:`, fmErr);
                  }
                }
                if (!replyText) {
                  replyText = getArohiFallbackResponse(parsed.text || '');
                }
                if (clientWs.readyState === WebSocket.OPEN) {
                  clientWs.send(JSON.stringify({ transcript: replyText, speaker: 'arohi' }));
                }
              } catch (fallbackErr) {
                console.error("Error in Arohi Voice Fallback Engine:", fallbackErr);
              }
            }
          }
        } catch (err) {
          console.error("Error forwarding user input to Arohi Live:", err);
        }
      });

      clientWs.on("close", () => {
        console.log("Client closed live voice WebSocket connection.");
        try {
          if (session) {
            session.close();
          }
        } catch (err) {}
      });
    } catch (error: any) {
      console.error("Failed to establish session with Gemini Live:", error);
      logWsEvent('gemini_live_connection_failed', { error: error.message || error });
      safeSendAndClose(
        { error: `Failed to establish session with Arohi Live: ${error.message || error}` },
        1011,
        'Arohi Live connection failed'
      );
    }
  });

  const handleUpgrade = (request: any, socket: any, head: any) => {
    if (socket && typeof socket.on === "function") {
      socket.on("error", (err: any) => {
        console.warn("[WebSocket Upgrade Socket Notice]:", err?.message || String(err));
      });
    }
    try {
      let pathname = '';
      if (request.url) {
        const urlPart = request.url.split('?')[0];
        if (urlPart.startsWith('/') || !urlPart.includes('://')) {
          pathname = urlPart;
        } else {
          try {
            pathname = new URL(urlPart).pathname;
          } catch (e) {
            pathname = urlPart;
          }
        }
      }

      console.log(`WebSocket Upgrade Request: Pathname="${pathname}", Raw URL="${request.url}"`);
      logWsEvent('upgrade_request', {
        pathname,
        url: request.url,
        headers: {
          host: request.headers?.host,
          origin: request.headers?.origin,
          upgrade: request.headers?.upgrade,
          connection: request.headers?.connection,
        }
      });

      const isLiveWsPath = pathname === '/api/live-ws' ||
                           pathname === '/api/live-ws/' ||
                           pathname.endsWith('/api/live-ws') ||
                           pathname.endsWith('/api/live-ws/');

      if (isLiveWsPath) {
        logWsEvent('upgrade_matched', { pathname });
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit('connection', ws, request);
        });
      } else {
        logWsEvent('upgrade_unmatched', { pathname });
      }
    } catch (err: any) {
      console.error('Error in WebSocket upgrade handler:', err);
      logWsEvent('upgrade_error', { error: err.message || err });
    }
  };

  server.on('upgrade', handleUpgrade);
}
