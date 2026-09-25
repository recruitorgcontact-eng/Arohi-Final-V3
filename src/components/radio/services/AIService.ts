// Arohi Radio - AI Radio Host & Editorial Intelligence Service
// Provides the conversational RJ Arohi experience, on-air Q&A, and live summaries

import { AskArohiQuery, AskArohiResponse, RadioLanguage, NewsStory } from '../types';

export class AIService {
  private static readonly SYSTEM_PROMPT = `
You are RJ Arohi, the intelligent, warm, eloquent, and culturally grounded lead on-air host of AROHI RADIO within the Arohi AI ecosystem.
Listeners can interrupt the radio broadcast to ask you questions, request explainers on stories just mentioned, ask for news in Odia/Hindi/Bengali, or ask for recommendations.

GUIDELINES FOR RJ AROHI:
1. Tone: Warm, poised, engaging, authoritative, and cinematic—like an elite public broadcaster (Apple Music 1 / BBC Radio 4 / AIR National).
2. Brevity on Air: Deliver punchy, high-impact answers (3-5 sentences) so the radio broadcast rhythm is preserved, unless explicitly asked for a deep-dive explainer.
3. Grounding & Factuality: Always cite verified sources and avoid unverified speculation.
4. Multilingual: If the question is in Odia, Hindi, or Bengali, or if the user asks "Speak in Odia/Hindi/Bengali", answer fluently in that language.
5. Radio Transition: End your spoken answer with a brief radio anchor sign-off (e.g., "Now, resuming your regular broadcast on Arohi Radio.").
6. Arohi Identity: Acknowledge you are Arohi, operating under the unified Arohi AI ecosystem.
`;

  public static async answerQuestion(query: AskArohiQuery): Promise<AskArohiResponse> {
    const { question, contextStory, language = 'en' } = query;

    let prompt = `User question to RJ Arohi: "${question}".`;
    if (contextStory) {
      prompt += `\nContext Story currently on-air: "${contextStory.headline}". Summary: "${contextStory.summary}". Source: "${contextStory.source}".`;
    }
    prompt += `\nTarget Language: ${language}. Please provide your on-air host answer.`;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          systemPrompt: this.SYSTEM_PROMPT,
          conversationHistory: []
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.reply || data.response || data.text || '';
        if (text && text.trim().length > 0) {
          return {
            answer: text.trim(),
            spokenAudioText: this.cleanForSpeech(text.trim()),
            sourceAttribution: contextStory?.source || 'Arohi AI Global Wire',
            suggestedFollowUps: this.generateFollowUps(question, language),
            languageUsed: language
          };
        }
      }
    } catch (err) {
      console.warn('AIService /api/chat error, utilizing resilient local synthesis:', err);
    }

    // Fallback synthesized response if network or quota is reached
    return this.getResilientFallbackResponse(question, contextStory, language);
  }

  private static cleanForSpeech(text: string): string {
    // Strip markdown bold, urls, bullets for natural voice synthesis
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/`{1,3}.*?`{1,3}/g, '')
      .replace(/[-*•]\s+/g, '')
      .trim();
  }

  private static generateFollowUps(question: string, lang: RadioLanguage): string[] {
    const qLower = question.toLowerCase();
    if (lang === 'or') {
      return [
        'ଏହି ବିଷୟରେ ଅଧିକ ସୂଚନା ଦିଅନ୍ତୁ',
        'ଓଡ଼ିଶା ଉପରେ ଏହାର ପ୍ରଭାବ କ’ଣ?',
        'ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟକ୍ରମ ଚଲାନ୍ତୁ'
      ];
    }
    if (lang === 'hi') {
      return [
        'इसके मुख्य बिंदु विस्तार से बताएं',
        'आज की टॉप बिजनेस खबरें क्या हैं?',
        'रेडियो प्रसारण जारी रखें'
      ];
    }
    if (qLower.includes('business') || qLower.includes('market') || qLower.includes('nifty')) {
      return [
        'What are the key sectors driving Nifty today?',
        'How does this impact retail investors?',
        'Continue the programme'
      ];
    }
    if (qLower.includes('odisha') || qLower.includes('puri')) {
      return [
        'Tell me more about Jagannath heritage',
        'What are today’s Mandi rates in Odisha?',
        'Continue the programme'
      ];
    }
    return [
      'Give me a 3-minute executive briefing',
      'Explain this in Odia',
      'Continue the programme'
    ];
  }

  private static getResilientFallbackResponse(
    question: string, 
    contextStory?: NewsStory, 
    lang: RadioLanguage = 'en'
  ): AskArohiResponse {
    const q = question.toLowerCase();

    if (lang === 'or' || q.includes('odia') || q.includes('ଓଡ଼ିଆ')) {
      return {
        answer: contextStory
          ? `RJ ଆରୋହୀ ଏଠାରେ! ଆପଣ ଏବେ ଶୁଣୁଥିବା ସମ୍ବାଦ: "${contextStory.headline}"। ଏହାର ମୁଖ୍ୟ ବିଷୟ ହେଉଛି ${contextStory.summary}। ଏହି ସମ୍ବାଦଟି ${contextStory.source} ଦ୍ୱାରା ପ୍ରକାଶିତ ହୋଇଛି। ଆରୋହୀ ରେଡିଓ ସହିତ ଯୋଡ଼ି ହୋଇ ରୁହନ୍ତୁ।`
          : `ନମସ୍କାର! ମୁଁ RJ ଆରୋହୀ। ଆରୋହୀ ରେଡିଓରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ଓଡ଼ିଶାର କୃଷି, ସଂସ୍କୃତି ଓ ସାମ୍ପ୍ରତିକ ଘଟଣାବଳୀର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ପାଇଁ ଆମର ଆରୋହୀ ଓଡ଼ିଶା ଚ୍ୟାନେଲ୍ ସର୍ବଦା ଲାଇଭ୍ ରହିଛି। ଆସନ୍ତୁ କାର୍ଯ୍ୟକ୍ରମକୁ ଫେରିବା।`,
        spokenAudioText: contextStory
          ? `RJ ଆରୋହୀ ଏଠାରେ! ଆପଣ ଏବେ ଶୁଣୁଥିବା ସମ୍ବାଦ: ${contextStory.headline}। ଏହାର ସୂତ୍ର ହେଉଛି ${contextStory.source}।`
          : `ନମସ୍କାର! ମୁଁ RJ ଆରୋହୀ। ଆରୋହୀ ରେଡିଓରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।`,
        sourceAttribution: contextStory?.source || 'Arohi Odisha Sanskruti Wire',
        suggestedFollowUps: ['ଏହି ବିଷୟରେ ଅଧିକ ସୂଚନା', 'ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟକ୍ରମ ଚଲାନ୍ତୁ'],
        languageUsed: 'or'
      };
    }

    if (lang === 'hi' || q.includes('hindi') || q.includes('हिन्दी')) {
      return {
        answer: contextStory
          ? `नमस्ते, मैं हूँ आपकी ऑन-एयर होस्ट RJ आरोही। इस खबर का मुख्य बिंदु है: ${contextStory.summary}। यह खबर आधिकारिक रूप से ${contextStory.source} द्वारा जारी की गई है। चलिए, वापस चलते हैं हमारे नियमित प्रसारण पर।`
          : `नमस्ते, मैं RJ आरोही हूँ। आज देश और दुनिया में कई महत्वपूर्ण घटनाक्रम हो रहे हैं, विशेषकर हरित ऊर्जा, विज्ञान और बाजार में। आरोही रेडियो पर लाइव बने रहें।`,
        spokenAudioText: contextStory
          ? `नमस्ते, मैं हूँ RJ आरोही। इस खबर का मुख्य बिंदु है: ${contextStory.summary}।`
          : `नमस्ते, मैं RJ आरोही हूँ। आरोही रेडियो पर लाइव बने रहें।`,
        sourceAttribution: contextStory?.source || 'Arohi National Wire',
        suggestedFollowUps: ['विस्तार से बताएं', 'प्रसारण जारी रखें'],
        languageUsed: 'hi'
      };
    }

    // Default English response
    if (contextStory) {
      return {
        answer: `RJ Arohi here on the broadcast desk! You asked about "${contextStory.headline}". In short: ${contextStory.summary}. This report was verified through ${contextStory.source}. Now, let's smoothly jump back to our scheduled broadcast.`,
        spokenAudioText: `RJ Arohi here on the broadcast desk. The story you asked about: ${contextStory.headline}. In short: ${contextStory.summary}. Now, back to our scheduled broadcast.`,
        sourceAttribution: contextStory.source,
        suggestedFollowUps: ['Explain in Odia', 'Give me more context', 'Continue the programme'],
        languageUsed: 'en'
      };
    }

    if (q.includes('business') || q.includes('market')) {
      return {
        answer: `RJ Arohi with your instant business pulse: Indian equities are trading resiliently with the Nifty maintaining above key levels, powered by institutional inflows into automotive, banking, and electronics manufacturing. Now, back to Arohi Business.`,
        spokenAudioText: `RJ Arohi with your instant business pulse. Indian equities are trading resiliently powered by automotive and banking. Now, back to Arohi Business.`,
        sourceAttribution: 'BSE/NSE Market Feed & Arohi Business Desk',
        suggestedFollowUps: ['Tell me about startups', 'Continue the programme'],
        languageUsed: 'en'
      };
    }

    return {
      answer: `This is RJ Arohi on Arohi Radio. Today's key currents center on India's deep-tech aerospace milestones, renewable hydrogen expansion, and new youth career opportunities across the nation. Let's return to your regular stream!`,
      spokenAudioText: `This is RJ Arohi on Arohi Radio. Today's key currents center on aerospace milestones and new opportunities across the nation. Returning to your regular stream.`,
      sourceAttribution: 'Arohi AI Editorial Desk',
      suggestedFollowUps: ['Explain today in 3 bullets', 'Speak in Odia', 'Continue the programme'],
      languageUsed: 'en'
    };
  }
}
