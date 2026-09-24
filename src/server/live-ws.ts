import { WebSocketServer, WebSocket } from 'ws';
import { Modality } from '@google/genai';
import { phoneWss, initTelephonyBridgeOptions } from './telephony-bridge.ts';
import { meetWss } from './meet-signaling.ts';
import { AROHI_VETMITRA_SYSTEM_PROMPT } from './vetmitra-prompt.ts';
import { AROHI_INTERVIEW_SYSTEM_PROMPT } from './interview-prompt.ts';
import { AROHI_TUTOR_SYSTEM_PROMPT } from './tutor-prompt.ts';
import { AROHI_VANAVEDA_SYSTEM_PROMPT } from './vanaveda-prompt.ts';

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

  // Initialize telephony media stream bridge for phone calling
  initTelephonyBridgeOptions({
    getAiClient,
    AROHI_SYSTEM_INSTRUCTION,
    logWsEvent,
  });

  // Setup WebSocket server for Gemini Live Audio Bidirectional Streaming
  const wss = new WebSocketServer({ noServer: true });

  wss.on('error', (err: any) => {
    console.warn('WebSocket Server notice:', err?.message || err);
  });

  wss.on('connection', async (clientWs: WebSocket, request) => {
    console.log('Client connected to live audio WebSocket');
    logWsEvent('connection_started', { url: request.url });

    // Prevent uncaught socket-level errors from crashing the Node.js process
    clientWs.on('error', (err: any) => {
      console.warn('Client WebSocket connection notice:', err?.message || err);
      logWsEvent('client_ws_error', { error: err?.message || err });
    });

    if ((clientWs as any)._socket) {
      try {
        (clientWs as any)._socket.on('error', (sErr: any) => {
          console.warn('Client WebSocket underlying socket notice:', sErr?.message || sErr);
          logWsEvent('client_ws_socket_error', { error: sErr?.message || sErr });
        });
      } catch (sockTrapErr) {}
    }

    if ((clientWs as any)._sender) {
      try {
        (clientWs as any)._sender.onerror = (sErr: any) => {
          console.warn('Client WebSocket sender notice handled gracefully:', sErr?.message || sErr);
        };
      } catch (sockTrapErr) {}
    }

    // Safe sender helper that always passes an error callback to avoid unhandled senderOnError
    const safeSendClient = (payload: any) => {
      try {
        if (clientWs && clientWs.readyState === WebSocket.OPEN) {
          const dataStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
          clientWs.send(dataStr, (err) => {
            if (err) {
              logWsEvent('client_send_error_suppressed', { error: err.message || err });
            }
          });
        }
      } catch (sendEx: any) {
        logWsEvent('client_send_exception_suppressed', { error: sendEx?.message || sendEx });
      }
    };

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
      } catch (err: any) {
        console.warn('Notice flushing message and closing WebSocket:', err?.message || err);
        logWsEvent('safe_send_and_close_err', { error: err instanceof Error ? err.message : String(err) });
      }
    };

    // Helper to safeguard any Gemini Live SDK WebSocket and TLSSocket against uncaught errors
    const attachSocketSafeguards = (targetSession: any) => {
      try {
        if (!targetSession) return;
        const rawWs = targetSession.conn?.ws;
        if (rawWs) {
          if (typeof rawWs.on === 'function') {
            rawWs.on('error', (rawErr: any) => {
              console.warn('[Gemini Live SDK WebSocket notice handled]:', rawErr?.message || rawErr);
            });
          }
          if (rawWs._socket && typeof rawWs._socket.on === 'function') {
            rawWs._socket.on('error', (sockErr: any) => {
              console.warn('[Gemini Live SDK TLSSocket notice handled]:', sockErr?.message || sockErr);
            });
          }
          if (rawWs._sender) {
            rawWs._sender.onerror = (senderErr: any) => {
              console.warn('[Gemini Live SDK Sender notice handled]:', senderErr?.message || senderErr);
            };
          }
        }
      } catch (e) {}
    };

    // Parse the voice, uid, and lang parameters safely from the query string
    let selectedVoice = 'Zypher';
    let uid = '';
    let reqLang = 'en';
    let speciesParam = '';
    let animalParam = '';
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
      const speciesMatch = request.url.match(/[?&]species=([^&]+)/);
      if (speciesMatch) {
        speciesParam = decodeURIComponent(speciesMatch[1]);
      }
      const animalMatch = request.url.match(/[?&]animal=([^&]+)/);
      if (animalMatch) {
        animalParam = decodeURIComponent(animalMatch[1]);
      }
    }

    let domainParam = '';
    let personaParam = 'pooja';
    let roleParam = '';
    let candidateParam = '';
    if (request.url) {
      const domainMatch = request.url.match(/[?&]domain=([^&]+)/);
      if (domainMatch) domainParam = decodeURIComponent(domainMatch[1]);
      const personaMatch = request.url.match(/[?&]persona=([^&]+)/);
      if (personaMatch) personaParam = decodeURIComponent(personaMatch[1]);
      const roleMatch = request.url.match(/[?&]role=([^&]+)/);
      if (roleMatch) roleParam = decodeURIComponent(roleMatch[1]);
      const candidateMatch = request.url.match(/[?&]candidate=([^&]+)/);
      if (candidateMatch) candidateParam = decodeURIComponent(candidateMatch[1]);
    }

    const INTERVIEWER_PERSONA_MAP: Record<string, { name: string; title: string }> = {
      vikram: { name: 'Vikram', title: 'Principal Technical Bar-Raiser' },
      sharma: { name: 'Dr. Sharma', title: 'Civil Services & Administration Board Member' },
      rajesh: { name: 'Rajesh', title: 'Commercial & Sales Head' },
      pooja: { name: 'Pooja', title: 'Senior Talent Acquisition & HR Lead' }
    };
    const activeInterviewer = INTERVIEWER_PERSONA_MAP[(personaParam || '').toLowerCase()] || INTERVIEWER_PERSONA_MAP.pooja;
    const interviewerName = activeInterviewer.name;
    const interviewerTitle = activeInterviewer.title;

    const isReadAloud = /[?&](mode=read_aloud|tts=true|read_aloud=true)/i.test(request.url || '');
    const isVetMitra = /[?&](mode=vetmitra|app=vetmitra|vet=true)/i.test(request.url || '');
    const isInterview = /[?&](mode=interview|app=interview|mockinterview=true)/i.test(request.url || '');
    const isTutor = /[?&](mode=tutor|app=tutor|classroom=true|smartboard=true)/i.test(request.url || '');
    const isVanaVeda = /[?&](mode=vanaveda|app=vanaveda|veda=true)/i.test(request.url || '');

    let subjectParam = 'Mathematics & Coding';
    let topicParam = '';
    if (request.url) {
      const subjectMatch = request.url.match(/[?&]subject=([^&]+)/);
      if (subjectMatch) subjectParam = decodeURIComponent(subjectMatch[1]);
      const topicMatch = request.url.match(/[?&]topic=([^&]+)/);
      if (topicMatch) topicParam = decodeURIComponent(topicMatch[1]);
    }

    const TUTOR_PERSONA_MAP: Record<string, { name: string; title: string; defaultSubject: string }> = {
      ananya: { name: 'Prof. Ananya', title: 'Senior Professor of STEM & Computational Science', defaultSubject: 'Mathematics & Coding' },
      satyajit: { name: 'Master Satyajit', title: 'State Board & Vernacular Pedagogy Mentor', defaultSubject: 'Odia, Science & State Exams' },
      radhika: { name: 'Dr. Radhika', title: 'Medical Sciences & NEET Biology Faculty', defaultSubject: 'NEET Biology & Medical Sciences' },
      verma: { name: 'Acharya Verma', title: 'UPSC & General Studies Historian & Jurist', defaultSubject: 'Polity, History & Civil Services' }
    };
    const activeTutor = TUTOR_PERSONA_MAP[(personaParam || '').toLowerCase()] || TUTOR_PERSONA_MAP.ananya;
    const tutorName = activeTutor.name;
    const tutorTitle = activeTutor.title;

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
        : isInterview
          ? AROHI_INTERVIEW_SYSTEM_PROMPT +
            `\n\n=================================================================` +
            `\nACTIVE INTERVIEW SPECIFICATIONS:` +
            `\n- YOUR NAME: ${interviewerName}` +
            `\n- YOUR ROLE / TITLE: ${interviewerTitle}` +
            `\n- TARGET TRACK: ${roleParam || domainParam || 'Software & Technical Engineering'}` +
            `\n- CANDIDATE NAME: ${candidateParam || 'Candidate'}` +
            `\n=================================================================` +
            `\nSTRICT IDENTITY MANDATE (CRITICAL - ZERO EXCEPTIONS):` +
            `\n1. YOU ARE STRICTLY ${interviewerName.toUpperCase()}, THE ${interviewerTitle.toUpperCase()}.` +
            `\n2. NEVER SAY "I am Arohi", "Arohi AI", OR WELCOME THE USER AS AROHI. You are a real professional interviewer named ${interviewerName}.` +
            `\n3. DO NOT ASK "How can I help you today?". You are NOT customer support. You are leading a job/career interview.` +
            `\n4. ALWAYS INTRODUCE YOURSELF BY YOUR WRITTEN NAME: "${interviewerName}, ${interviewerTitle}".` +
            "\n\nCRITICAL REAL-TIME VOICE BARGE-IN & INTERACTIVE LISTENING MANDATE:" +
            "\n- ALWAYS REMAIN 100% ATTENTIVE AND RESPONSIVE TO THE CANDIDATE'S SPOKEN VOICE IN REAL-TIME!" +
            "\n- IF THE CANDIDATE SPEAKS, PAUSES, OR INTERRUPTS YOU AT ANY MOMENT, IMMEDIATELY PAUSE YOUR SPEAKING, LISTEN ATTENTIVELY, AND RESPOND NATURALLY!" +
            "\n- NEVER talk over the candidate or give long monologues. Keep your turns concise (2-3 spoken sentences)." +
            "\n- ASK EXACTLY ONE QUESTION AT A TIME, wait for their spoken answer, and probe dynamically based on what they say." +
            "\n\n=== INITIAL CALL WELCOME ===" +
            (reqLang === 'or' || reqLang.toLowerCase().includes('odia')
              ? `\n- Greet warmly in Odia: 'ନମସ୍କାର${candidateParam ? ' ' + candidateParam : ''}! ମୁଁ ${interviewerName}, ${interviewerTitle}। ଆପଣଙ୍କ ${roleParam || domainParam || 'ଏହି ପଦ'} ପାଇଁ ଇଣ୍ଟରଭିୟୁ ରାଉଣ୍ଡକୁ ସ୍ଵାଗତ। ଆରମ୍ଭ କରିବା ପାଇଁ, ଦୟାକରି ଆପଣଙ୍କ ପରିଚୟ ଏବଂ ଅଭିଜ୍ଞତା ବିଷୟରେ ସଂକ୍ଷେପରେ କୁହନ୍ତୁ। (ମନେରଖନ୍ତୁ: ଆପଣ କେବେହେଲେ ନିଜକୁ ଆରୋହୀ କହିବେ ନାହିଁ)'`
              : (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')
                ? `\n- Greet warmly in Hindi: 'नमस्ते${candidateParam ? ' ' + candidateParam : ''}! मैं ${interviewerName} हूँ, ${interviewerTitle}। आपके ${roleParam || domainParam || 'इस पद'} के इंटरव्यू राउंड में स्वागत है। शुरुआत करने के लिए, कृपया अपना संक्षिप्त परिचय दें और अपने मुख्य अनुभव के बारे में बताएं। (याद रखें: कभी भी खुद को आरोही न कहें)'`
                : (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')
                  ? `\n- Greet warmly in Bengali: 'নমস্কার${candidateParam ? ' ' + candidateParam : ''}! আমি ${interviewerName}, ${interviewerTitle}। আপনার ইন্টারভিউ রাউন্ডে আপনাকে স্বাগত। শুরুতে অনুগ্রহ করে আপনার সংক্ষিপ্ত পরিচয় ও অভিজ্ঞতা সম্পর্কে বলুন।'`
                  : `\n- Greet warmly in English: 'Hello${candidateParam ? ' ' + candidateParam : ''}! I am ${interviewerName}, ${interviewerTitle}. Welcome to your interview round for ${roleParam || domainParam || 'this position'}. To begin, could you walk me through your background and key experience?'`
                )
              )
            )
        : isTutor
          ? AROHI_TUTOR_SYSTEM_PROMPT +
            `\n\n=================================================================` +
            `\nACTIVE CLASSROOM & SMART BOARD SPECIFICATIONS:` +
            `\n- YOUR NAME: ${tutorName}` +
            `\n- YOUR FACULTY ROLE: ${tutorTitle}` +
            `\n- ACTIVE SUBJECT: ${subjectParam || activeTutor.defaultSubject}` +
            `\n- TOPIC / CHAPTER: ${topicParam || 'Fundamental Concepts & Core Problem Solving'}` +
            `\n- STUDENT NAME: ${candidateParam || 'Student'}` +
            `\n=================================================================` +
            `\nSTRICT IDENTITY MANDATE (CRITICAL - ZERO EXCEPTIONS):` +
            `\n1. YOU ARE STRICTLY ${tutorName.toUpperCase()}, ${tutorTitle.toUpperCase()}.` +
            `\n2. NEVER SAY "I am Arohi", "Arohi AI", OR INTRODUCE YOURSELF AS AROHI. You are a passionate academic teacher named ${tutorName}.` +
            `\n3. DO NOT ASK "How can I help you?". Instead, welcome your student to class, introduce the lesson topic on the smart board, and invite their curiosity.` +
            `\n4. ALWAYS INTRODUCE YOURSELF BY YOUR WRITTEN FACULTY NAME: "${tutorName}".` +
            "\n\nCRITICAL REAL-TIME VOICE BARGE-IN & INTERACTIVE TEACHING MANDATE:" +
            "\n- ALWAYS REMAIN 100% ATTENTIVE AND RESPONSIVE TO THE STUDENT'S SPOKEN VOICE IN REAL-TIME!" +
            "\n- IF THE STUDENT INTERRUPTS, ASKS A QUESTION, OR EXPRESSES DOUBT AT ANY MOMENT, IMMEDIATELY PAUSE, ACKNOWLEDGE THEM WARMLY, AND EXPLAIN WITH PATIENCE!" +
            "\n- NEVER lecture in long monologues. Teach 1 concept at a time (2-3 spoken sentences), then ask a quick check-for-understanding question." +
            "\n\n=== INITIAL CLASSROOM WELCOME ===" +
            (reqLang === 'or' || reqLang.toLowerCase().includes('odia')
              ? `\n- Greet warmly in Odia: 'ନମସ୍କାର${candidateParam ? ' ' + candidateParam : ''}! ମୁଁ ${tutorName}। ଆଜି ଆମ ${subjectParam || 'ଏହି ବିଷୟ'} କ୍ଲାସକୁ ସ୍ଵାଗତ। ଆଜି ଆମେ ସ୍ମାର୍ଟ ବୋର୍ଡରେ ମୁଖ୍ୟ ଧାରଣା ଶିଖିବା। ଆପଣ ପ୍ରସ୍ତୁତ ତ? ଆରମ୍ଭ କରିବା!'`
              : (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')
                ? `\n- Greet warmly in Hindi: 'नमस्ते${candidateParam ? ' ' + candidateParam : ''}! मैं ${tutorName} हूँ। आज की ${subjectParam || 'क्लास'} में आपका स्वागत है। आज हम स्मार्ट बोर्ड पर मुख्य कॉन्सेप्ट्स को विस्तार से समझेंगे। क्या आप तैयार हैं? चलिए शुरू करते हैं!'`
                : (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')
                  ? `\n- Greet warmly in Bengali: 'নমস্কার${candidateParam ? ' ' + candidateParam : ''}! আমি ${tutorName}। আমাদের আজকের ক্লাসে আপনাকে স্বাগত। আসুন শুরু করা যাক!'`
                  : `\n- Greet warmly in English: 'Hello${candidateParam ? ' ' + candidateParam : ''}! I am ${tutorName}, your teacher for ${subjectParam || "today's masterclass"}. Welcome to our live smart board session. Are you ready to dive into ${topicParam || 'the core concepts'}?'`
                )
              )
            )
        : isVanaVeda
          ? AROHI_VANAVEDA_SYSTEM_PROMPT +
            `\n\n=================================================================` +
            `\nAROHI VEDA-VAIDYA LIVE CLINICAL VOICE CALL MANDATES (CRITICAL):` +
            `\n- IDENTITY: You are Arohi Veda-Vaidya (ଆରୋହୀ ବେଦ-ବୈଦ୍ୟ • आरोगी वेद-वैद्य) — a warm, deeply compassionate, serene, and clinically observant Ayurvedic botanical physician and Vedic science guide.` +
            `\n- TONE & DELIVERY: Speak with high empathy, calm reassurance, and sacred reverence. For voice calls, keep each turn concise and conversational (2-4 spoken sentences, under 30 words) so the caller can easily respond.` +
            `\n- INTERACTIVE CONVERSATION: Never monologue or lecture. Ask 1-2 targeted diagnostic questions at a time (e.g. digestive fire / Agni, sleep quality, body heat / burning sensation, joint stiffness, emotional stress).` +
            `\n- MULTILINGUAL VOICE FLUENCY: Respond natively in whichever language the caller speaks (Odia - ଓଡ଼ିଆ, Hindi - हिंदी, English, Bengali, etc.) with flawless spoken accent and cultural warmth.` +
            `\n- ZERO RAW ASTERISKS: NEVER output or vocalize asterisks, markdown code tags, or code symbols.` +
            `\n- BOTANICAL & SCRIPTURAL PRECISION: Ground your advice in the 10 Sacred Trees & Leaves (Tulsi, Neem, Bilva, Peepal, Banyan, Ashoka, Parijat, Brahmi, Arjuna, Amalaki) and simple home decoctions (Kashayam, Hima, Phanta, Ksheerapaka).` +
            `\n- EMERGENCY TRIAGE: If caller mentions acute chest pain, severe breathlessness, fainting, or acute trauma, immediately advise emergency hospital medical care while keeping them calm.` +
            `\n=================================================================` +
            "\n\nCRITICAL REAL-TIME VOICE BARGE-IN & INTERACTIVE LISTENING MANDATE:" +
            "\n- ALWAYS REMAIN 100% ATTENTIVE AND RESPONSIVE TO THE CALLER'S SPOKEN VOICE IN REAL-TIME!" +
            "\n- IF THE CALLER SPEAKS, ASKS A QUESTION, OR INTERRUPTS YOU AT ANY MOMENT DURING A CALL, YOU MUST IMMEDIATELY PAUSE YOUR SPEAKING, LISTEN ATTENTIVELY, AND ADDRESS THEIR WORDS DIRECTLY!" +
            "\n\n=== INITIAL CALL WELCOME ===" +
            (reqLang === 'or' || reqLang.toLowerCase().includes('odia')
              ? "\n- Greet warmly in Odia: 'ହରି ଓଁ! ମୁଁ ଆରୋହୀ — ଆପଣଙ୍କ ବେଦ-ବୈଦ୍ୟ (Arohi Veda-Vaidya)। ଆଜି ଆପଣଙ୍କ ଶରୀର ବା ହଜମ କିପରି ଅନୁଭବ କରୁଛି? କେଉଁ ସମସ୍ୟା ବା ବୃକ୍ଷ ଔଷଧୀ ବିଷୟରେ ଜାଣିବାକୁ ଚାହାଁନ୍ତି କୁହନ୍ତୁ।'"
              : (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')
                ? "\n- Greet warmly in Hindi: 'हरि ॐ! मैं आरोगी — आपकी वेद-वैद्य (Arohi Veda-Vaidya)। आज आपका स्वास्थ्य और पाचन कैसा अनुभव कर रहा है? मुझे बताएं, मैं आपकी सेवा में उपस्थित हूँ।'"
                : (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')
                  ? "\n- Greet warmly in Bengali: 'হরি ওম! আমি আরোহী — আপনার বেদ-বৈদ্য (Arohi Veda-Vaidya)। আজ আপনার শরীর ও স্বাস্থ্য কেমন অনুভব করছে? আমাকে বলুন, আমি শুনছি।'"
                  : "\n- Greet warmly in English: 'Harih Om! I am Arohi, your Veda-Vaidya botanical health companion. How are your digestion, physical energy, or health feeling today? Tell me, I am listening.'"
                )
              )
            )
        : isVetMitra
          ? AROHI_VETMITRA_SYSTEM_PROMPT +
            "\n\nCRITICAL REAL-TIME VOICE BARGE-IN & INTERACTIVE LISTENING MANDATE:" +
            "\n- ALWAYS REMAIN 100% ATTENTIVE AND RESPONSIVE TO THE CALLER'S SPOKEN VOICE IN REAL-TIME!" +
            "\n- IF THE CALLER SPEAKS, ASKS A QUESTION, OR INTERRUPTS YOU AT ANY MOMENT DURING A CALL, YOU MUST IMMEDIATELY PAUSE YOUR SPEAKING, LISTEN ATTENTIVELY, AND RESPOND DIRECTLY TO THEIR WORDS!" +
            "\n- TONE & DELIVERY: You are Arohi VetMitra — a warm, highly empathetic, respectful, and clinically observant veterinary and dairy nutrition AI specialist. Speak naturally, politely, and supportively. For voice calls, keep each turn concise (2-4 spoken sentences) so the caller can easily respond." +
            "\n- MULTILINGUAL CONVERSATION: As soon as the caller speaks in Odia (ଓଡ଼ିଆ), Hindi (हिंदी), Bengali (বাংলা), English, etc., respond immediately in that exact language!" +
            "\n- PROBING: Ask 1-2 targeted questions at a time (appetite, rumination/cud chewing, rectal temperature, milk yield, dung/urine)." +
            "\n- DAIRY RATION: If the caller mentions their cow's weight, milk yield, or feeds, mentally calculate using the internal NASEM 2021 equations and advise them naturally without showing formulas or spreadsheets!" +
            "\n\n=== INITIAL CALL WELCOME ===" +
            (reqLang === 'or' || reqLang.toLowerCase().includes('odia')
              ? "\n- Greet warmly in Odia: 'ନମସ୍କାର! ମୁଁ ଆରୋହୀ — ଆପଣଙ୍କ ପଶୁପାଳନ ଓ ଡାଏରୀ ସାଥୀ (Arohi VetMitra)। ଆପଣଙ୍କ ଗାଈ, ଛେଳି ବା ପୋଷା ଜୀବର କଣ ସମସ୍ୟା ଅଛି କୁହନ୍ତୁ।'"
              : (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')
                ? "\n- Greet warmly in Hindi: 'नमस्ते! मैं आरोही हूँ — आपकी पशुपालन और डेयरी साथी (Arohi VetMitra)। आपकी गाय, बकरी या पालतू जानवर की क्या समस्या है, बताइए।'"
                : (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')
                  ? "\n- Greet warmly in Bengali: 'নমস্কার! আমি আরোহী — আপনার পশু ও ডেইরি বিশেষজ্ঞ (Arohi VetMitra)। আপনার গরু, ছাগল বা পোষা প্রাণীর কী সমস্যা রয়েছে বলুন।'"
                  : "\n- Greet warmly in English: 'Hello! I am Arohi VetMitra, your veterinary and dairy AI companion. How can I help your animal today?'"
                )
              )
            )
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
        "\n\n=== INITIAL CALL WELCOME & SEAMLESS REAL-TIME MULTILINGUAL MIRRORING ===" +
        (reqLang === 'or' || reqLang.toLowerCase().includes('odia')
          ? "\n- CALLER SELECTED ODIA (ଓଡ଼ିଆ): Greet the user with a warm, natural 1-sentence welcome in Odia (e.g., 'ନମସ୍କାର! ମୁଁ ଆରୋହୀ, ଆପଣଙ୍କ AI ସାଥୀ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?')."
          : (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')
            ? "\n- CALLER SELECTED HINDI (हिंदी): Greet the user with a warm, natural 1-sentence welcome in Hindi (e.g., 'नमस्ते! मैं आरोही हूँ, आपकी AI साथी। आज मैं आपकी क्या सहायता कर सकती हूँ?')."
            : (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')
              ? "\n- CALLER SELECTED BENGALI (বাংলা): Greet the user with a warm, natural 1-sentence welcome in Bengali."
              : "\n- WELCOME GREETING: ALWAYS begin incoming calls with a warm, cheerful, and natural welcoming greeting in English (e.g., 'Hello! I am Arohi, your AI guide. How can I help you today?')."
            )
          )
        ) +
        "\n- INSTANT DYNAMIC MULTILINGUAL MIRRORING: You are fully multilingual across 150+ languages (English, Odia/ଓଡ଼ିଆ, Hindi/हिंदी, Bengali/বাংলা, Telugu/తెలుగు, Tamil/தமிழ், Marathi/मराठी, Gujarati/ગુજરાતી, Kannada, Malayalam, Punjabi, Urdu, Spanish, French, German, Japanese, etc.)." +
        "\n- AS SOON AS THE USER SPEAKS IN ANY REGIONAL OR GLOBAL LANGUAGE (such as Odia, Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Spanish, etc., or spoken/transliterated words like 'kemiti achha', 'mote business kariba ku achhi', 'mujhe guidance chahiye', 'state schemes bisayare kuha'), YOU MUST IMMEDIATELY AND SEAMLESSLY PIVOT TO REPLY IN THAT EXACT USER'S SPOKEN LANGUAGE with native fluency, sweet tone, and warmth! NEVER respond in English when the user speaks in Odia, Hindi, or any regional Indian language!" +
        "\n- If the user speaks English, continue answering in English. If the user changes language at any time during the conversation, switch immediately to match their spoken language on that very turn!" +
        "\n- REAL-TIME GOOGLE SEARCH & NEWS DIRECTIVE: You have active Google Search grounding tools enabled! Whenever the user asks about current events, news, parliament, politics, ministers, appointments, resignations (such as news about the Education Minister of India or parliament discussions), sports, or live updates, YOU MUST USE GOOGLE SEARCH TO FETCH THE LATEST TOP HEADLINES AND SEARCH RESULTS BEFORE ANSWERING! NEVER say 'I don't know' or 'I don't have real-time access'—ALWAYS search Google and provide accurate, up-to-the-second news!";

      if (isVetMitra && speciesParam && speciesParam !== 'universal') {
        voiceSystemInstruction += `\n\nTARGET ANIMAL PATIENT FOR THIS CALL: The caller is consulting specifically regarding their ${speciesParam}${animalParam ? ` named "${animalParam}"` : ''}. Focus your clinical questions, temperature checks, and feeding/management advice strictly on ${speciesParam}.`;
      }

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
                    attachSocketSafeguards(tempSession);
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
                    const serverContent = msg.serverContent;
                    if (serverContent) {
                      // 1. User speech transcription directly from Gemini Live API
                      const userTranscriptText = 
                        serverContent.inputTranscription?.text ||
                        serverContent.inputAudioTranscription?.text ||
                        serverContent.input_transcription?.text ||
                        serverContent.interimInputTranscription?.text ||
                        serverContent.interim_input_transcription?.text;

                      if (userTranscriptText && typeof userTranscriptText === 'string' && userTranscriptText.trim()) {
                        safeSendClient({ 
                          transcript: userTranscriptText.trim(), 
                          speaker: 'user',
                          isFinal: !!(serverContent.inputTranscription || serverContent.inputAudioTranscription || serverContent.input_transcription)
                        });
                      }

                      // 2. Arohi speech output transcription from Gemini Live API
                      const arohiTranscriptText = 
                        serverContent.outputTranscription?.text ||
                        serverContent.outputAudioTranscription?.text ||
                        serverContent.output_transcription?.text;

                      if (arohiTranscriptText && typeof arohiTranscriptText === 'string' && arohiTranscriptText.trim()) {
                        safeSendClient({ 
                          transcript: arohiTranscriptText.trim(), 
                          speaker: 'arohi' 
                        });
                      }

                      // 3. Spoken audio chunks and modelTurn text parts
                      const parts = serverContent.modelTurn?.parts;
                      if (parts) {
                        for (const part of parts) {
                          if (part.inlineData && part.inlineData.data) {
                            safeSendClient({ audio: part.inlineData.data });
                          }
                          if (part.text && !arohiTranscriptText) {
                            safeSendClient({ transcript: part.text, speaker: 'arohi' });
                          }
                        }
                      }
                      if (serverContent.turnComplete) {
                        safeSendClient({ turnComplete: true });
                      }
                      if (serverContent.interrupted) {
                        console.log("Gemini Live: User voice barge-in interruption detected.");
                        safeSendClient({ interrupted: true });
                      }
                    }
                  },
                  onerror: (err: any) => {
                    const errMsg = err?.message || (typeof err === 'string' ? err : 'Socket transmission reset');
                    console.warn(`[Gemini Live Notice]: Connection event on model ${liveModel}:`, errMsg);
                    logWsEvent('gemini_live_session_notice', { model: liveModel, error: errMsg });
                    session = null;
                    if (stabilityTimeout) clearTimeout(stabilityTimeout);
                    if (!finished) {
                      finished = true;
                      reject(new Error(`Gemini Live session notice: ${errMsg}`));
                    }
                  },
                  onclose: (event: any) => {
                    console.log(`Gemini Live session closed on model ${liveModel}:`, event?.code);
                    logWsEvent('gemini_live_session_close', { model: liveModel, event });
                    session = null;
                    if (stabilityTimeout) clearTimeout(stabilityTimeout);
                    if (!finished) {
                      finished = true;
                      reject(new Error(`Session closed immediately with code ${event?.code || 'unknown'}`));
                    }
                  },
                },
              });
              attachSocketSafeguards(tempSession);
            } catch (err: any) {
              if (stabilityTimeout) clearTimeout(stabilityTimeout);
              if (!finished) {
                finished = true;
                reject(err instanceof Error ? err : new Error(err?.message || 'Failed to connect Live session'));
              }
            }
          });

          session = establishedSession;
          attachSocketSafeguards(establishedSession);
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
                  console.error("Error flushing queued text to Gemini Live session:", qErr);
                }
              }
            }
          } else if (!isReadAloud && session) {
            try {
              let greetingInstruction = "Say a warm, sweet, cheerful 1-sentence welcome in English introducing yourself as Arohi and asking how you can help today.";
              if (isTutor) {
                if (reqLang === 'or' || reqLang.toLowerCase().includes('odia')) {
                  greetingInstruction = `Say a warm, energetic 1-2 sentence classroom opening in Odia (ଓଡ଼ିଆ). Introduce yourself strictly as ${tutorName}. Welcome ${candidateParam ? candidateParam : 'the student'} to today's ${subjectParam || 'interactive'} class. Invite them to look at the smart board as we begin. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${tutorName}.`;
                } else if (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')) {
                  greetingInstruction = `Say a warm, inspiring 1-2 sentence classroom opening in Hindi (हिंदी). Introduce yourself strictly as ${tutorName}. Welcome ${candidateParam ? candidateParam : 'the student'} to today's ${subjectParam || 'interactive'} class. Invite them to look at the smart board as we start the lesson. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${tutorName}.`;
                } else if (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')) {
                  greetingInstruction = `Say a warm, encouraging 1-2 sentence classroom opening in Bengali (বাংলা). Introduce yourself strictly as ${tutorName}. Welcome ${candidateParam ? candidateParam : 'the student'} to today's class. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${tutorName}.`;
                } else {
                  greetingInstruction = `Say a warm, inspiring 1-2 sentence classroom opening in English. Introduce yourself strictly as ${tutorName}. Welcome ${candidateParam ? candidateParam : 'the student'} to today's ${subjectParam || 'live'} class on the smart board. Ask if they are ready to dive in. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${tutorName}.`;
                }
              } else if (isInterview) {
                if (reqLang === 'or' || reqLang.toLowerCase().includes('odia')) {
                  greetingInstruction = `Say a polite, professional 1-2 sentence interview opening in Odia (ଓଡ଼ିଆ). Introduce yourself strictly as ${interviewerName}, ${interviewerTitle}. Welcome ${candidateParam ? candidateParam : 'the candidate'} to this interview round for ${roleParam || domainParam || 'this position'}. Ask them to briefly introduce themselves and their core background. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${interviewerName}.`;
                } else if (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')) {
                  greetingInstruction = `Say a polite, professional 1-2 sentence interview opening in Hindi (हिंदी). Introduce yourself strictly as ${interviewerName}, ${interviewerTitle}. Welcome ${candidateParam ? candidateParam : 'the candidate'} to this interview round for ${roleParam || domainParam || 'this position'}. Ask them to briefly introduce themselves and their core experience. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${interviewerName}.`;
                } else if (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')) {
                  greetingInstruction = `Say a polite, professional 1-2 sentence interview opening in Bengali (বাংলা). Introduce yourself strictly as ${interviewerName}, ${interviewerTitle}. Welcome ${candidateParam ? candidateParam : 'the candidate'} to this interview round for ${roleParam || domainParam || 'this position'}. Ask them to briefly introduce themselves. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${interviewerName}.`;
                } else {
                  greetingInstruction = `Say a polite, professional 1-2 sentence interview opening in English. Introduce yourself strictly as ${interviewerName}, ${interviewerTitle}. Welcome ${candidateParam ? candidateParam : 'the candidate'} to this interview round for ${roleParam || domainParam || 'this position'}. Ask them to walk you through their background and key experience. CRITICAL MANDATE: DO NOT use the name Arohi. You are strictly ${interviewerName}.`;
                }
              } else if (isVetMitra) {
                if (reqLang === 'or' || reqLang.toLowerCase().includes('odia')) {
                  greetingInstruction = speciesParam && speciesParam !== 'universal'
                    ? `Say a warm, reassuring 1-sentence welcome in Odia introducing yourself as Arohi VetMitra (ଆରୋହୀ ଭେଟମିତ୍ର) and asking what health or feeding symptom the caller is noticing in their ${speciesParam} ${animalParam ? `named "${animalParam}"` : ''} today.`
                    : "Say a warm, reassuring 1-sentence welcome in Odia introducing yourself as Arohi VetMitra (ଆରୋହୀ ଭେଟମିତ୍ର) and asking what animal or symptom the caller needs veterinary help with today (e.g. 'ନମସ୍କାର! ମୁଁ ଆରୋହୀ ଭେଟମିତ୍ର। ଆପଣଙ୍କ ପଶୁ କିମ୍ବା ପୋଷା ଜୀବର କଣ ସମସ୍ୟା ହୋଇଛି, କୁହନ୍ତୁ।').";
                } else if (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')) {
                  greetingInstruction = speciesParam && speciesParam !== 'universal'
                    ? `Say a warm, reassuring 1-sentence welcome in Hindi introducing yourself as Arohi VetMitra and asking what problem the caller's ${speciesParam} has today.`
                    : "Say a warm, reassuring 1-sentence welcome in Hindi introducing yourself as Arohi VetMitra and asking what animal or symptom the caller has today.";
                } else {
                  greetingInstruction = speciesParam && speciesParam !== 'universal'
                    ? `Say a warm, reassuring 1-sentence welcome in English introducing yourself as Arohi VetMitra and asking how you can help with their ${speciesParam} today.`
                    : "Say a warm, reassuring 1-sentence welcome in English introducing yourself as Arohi VetMitra, your veterinary and dairy AI companion, and asking how you can help today.";
                }
              } else if (reqLang === 'or' || reqLang.toLowerCase().includes('odia')) {
                greetingInstruction = "Say a warm, sweet, cheerful 1-sentence welcome in Odia (ଓଡ଼ିଆ) introducing yourself as Arohi (ଆରୋହୀ) and asking how you can help today (e.g. 'ନମସ୍କାର! ମୁଁ ଆରୋହୀ, ଆପଣଙ୍କ AI ସାଥୀ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?').";
              } else if (reqLang === 'hi' || reqLang.toLowerCase().includes('hindi')) {
                greetingInstruction = "Say a warm, sweet, cheerful 1-sentence welcome in Hindi (हिंदी) introducing yourself as Arohi (आरोही) and asking how you can help today (e.g. 'नमस्ते! मैं आरोही हूँ, आपकी AI साथी। आज मैं आपकी क्या मदद कर सकती हूँ?').";
              } else if (reqLang === 'bn' || reqLang.toLowerCase().includes('bengali')) {
                greetingInstruction = "Say a warm, sweet, cheerful 1-sentence welcome in Bengali (বাংলা) introducing yourself as Arohi and asking how you can help today.";
              }

              session.sendClientContent({
                turns: [{ role: 'user', parts: [{ text: greetingInstruction }] }],
                turnComplete: true
              });
              console.log(`Triggered instant Arohi welcome greeting on call connect (language: ${reqLang}).`);
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

          // 1. Universal audio chunk extraction (direct { audio: base64 } or nested { realtimeInput: { mediaChunks } })
          const incomingAudio = parsed.audio ||
            (parsed.realtimeInput?.mediaChunks?.find((m: any) => m.mimeType?.startsWith('audio'))?.data) ||
            (parsed.realtimeInput?.mediaChunks?.[0]?.data && !parsed.realtimeInput?.mediaChunks?.[0]?.mimeType?.startsWith('image') ? parsed.realtimeInput.mediaChunks[0].data : null);

          if (incomingAudio && session) {
            try {
              const rawWs = (session as any)?.conn?.ws;
              // Ensure connection is strictly OPEN (readyState 1) before sending audio chunks
              if (!rawWs || rawWs.readyState === 1) {
                session.sendRealtimeInput({
                  audio: { data: incomingAudio, mimeType: "audio/pcm;rate=16000" },
                });
              } else {
                session = null;
              }
            } catch (audioErr: any) {
              console.warn("Caught error forwarding realtime audio to Gemini Live:", audioErr?.message || audioErr);
              session = null;
            }
          }

          // 2. Camera video / botanical image frame extraction
          const incomingImage = parsed.image ||
            (parsed.realtimeInput?.mediaChunks?.find((m: any) => m.mimeType?.startsWith('image'))?.data);

          if (incomingImage && session) {
            try {
              const rawWs = (session as any)?.conn?.ws;
              if (!rawWs || rawWs.readyState === 1) {
                session.sendRealtimeInput({
                  mediaChunks: [{ mimeType: 'image/jpeg', data: incomingImage }]
                });
              }
            } catch (imgErr: any) {
              console.warn("Caught error forwarding camera frame to Gemini Live:", imgErr?.message || imgErr);
            }
          }

          // 3. Instant barge-in interruption notice from client
          if (parsed.interrupted) {
            safeSendClient({ interrupted: true });
          }

          if (parsed.text) {
            if (session) {
              try {
                const rawWs = (session as any)?.conn?.ws;
                if (!rawWs || rawWs.readyState === 1) {
                  session.sendClientContent({
                    turns: [{ role: 'user', parts: [{ text: parsed.text }] }],
                    turnComplete: true
                  });
                  console.log(`Forwarded user text prompt to Gemini Live session: "${parsed.text.slice(0, 50)}..."`);
                } else {
                  session = null;
                }
              } catch (textErr: any) {
                console.warn("Notice forwarding text to Gemini Live session:", textErr?.message || textErr);
                session = null;
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
                safeSendClient({ transcript: replyText, speaker: 'arohi' });
              } catch (fallbackErr: any) {
                console.warn("Notice in Arohi Voice Fallback Engine:", fallbackErr?.message || fallbackErr);
              }
            }
          }
        } catch (err: any) {
          console.warn("Notice forwarding user input to Arohi Live:", err?.message || err);
        }
      });

      clientWs.on("close", () => {
        console.log("Client closed live voice WebSocket connection.");
        try {
          if (session) {
            session.close?.();
            session = null;
          }
        } catch (err) {
          session = null;
        }
      });
    } catch (error: any) {
      console.warn("Notice: Gemini Live session establishment unavailable, activating fallback:", error?.message || error);
      logWsEvent('gemini_live_connection_notice', { error: error?.message || error });
      safeSendAndClose(
        { error: `Notice: Arohi Live voice engine fallback active: ${error?.message || 'Connection reset'}` },
        1011,
        'Arohi Live connection fallback'
      );
    }
  });

  const handleUpgrade = (request: any, socket: any, head: any) => {
    // Trap early socket errors on incoming upgrade requests
    socket.on('error', (err: any) => {
      console.warn('Socket error on WebSocket upgrade connection:', err?.message || err);
    });

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

      const isPhoneWsPath = pathname === '/ws/phone-stream' ||
                            pathname === '/ws/phone-stream/' ||
                            pathname.endsWith('/ws/phone-stream') ||
                            pathname === '/telephony/stream' ||
                            pathname.endsWith('/telephony/stream') ||
                            pathname === '/api/phone-call/stream' ||
                            pathname.endsWith('/api/phone-call/stream');

      const isMeetWsPath = pathname === '/api/meet-ws' ||
                           pathname === '/api/meet-ws/' ||
                           pathname.endsWith('/api/meet-ws') ||
                           pathname.endsWith('/api/meet-ws/');

      if (isLiveWsPath) {
        logWsEvent('upgrade_matched_live', { pathname });
        wss.handleUpgrade(request, socket, head, (ws) => {
          ws.on('error', (wsErr: any) => {
            console.warn('Client WebSocket error after upgrade:', wsErr?.message || wsErr);
          });
          wss.emit('connection', ws, request);
        });
      } else if (isMeetWsPath) {
        logWsEvent('upgrade_matched_meet', { pathname });
        meetWss.handleUpgrade(request, socket, head, (ws) => {
          ws.on('error', (wsErr: any) => {
            console.warn('Meet WebSocket error after upgrade:', wsErr?.message || wsErr);
          });
          meetWss.emit('connection', ws, request);
        });
      } else if (isPhoneWsPath) {
        logWsEvent('upgrade_matched_phone', { pathname });
        phoneWss.handleUpgrade(request, socket, head, (ws) => {
          ws.on('error', (wsErr: any) => {
            console.warn('Phone WebSocket error after upgrade:', wsErr?.message || wsErr);
          });
          phoneWss.emit('connection', ws, request);
        });
      } else {
        logWsEvent('upgrade_unmatched', { pathname });
        // Cleanly respond and close socket for unmatched paths so socket doesn't hang
        try {
          socket.write('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n');
          socket.destroy();
        } catch (destroyErr) {
          try { socket.destroy(); } catch (e) {}
        }
      }
    } catch (err: any) {
      console.warn('Notice in WebSocket upgrade handler:', err?.message || err);
      logWsEvent('upgrade_error', { error: err?.message || err });
      try { socket.destroy(); } catch (e) {}
    }
  };

  server.on('upgrade', handleUpgrade);
}
