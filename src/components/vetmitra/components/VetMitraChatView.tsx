// Arohi VetMitra - Dynamic Clinical & Consultation Chat View
// Provides species-specific, individualized chats for each animal (Cattle, Buffalo, Goat, Dog, Cat)
// Clean typography without markdown hashtag symbols (###, ##), horizontal rules (---), or asterisk clutter (* **Item:**)

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Mic, Volume2, VolumeX, Paperclip, 
  PhoneCall, RefreshCw, Loader2, Camera, Upload, FileText, 
  Copy, Check, Sparkles, AlertTriangle, Play, Pause, Trash2,
  Stethoscope
} from 'lucide-react';
import { VetChatMessage, VetSpecies, VetLanguage } from '../types';
import { playArohiVoice, stopArohiVoice } from '../../../utils/arohiVoicePlayer';
import { AROHI_VETMITRA_SYSTEM_PROMPT } from '../engine/vetMitraSystemPrompt';
import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from '../data/mockAnimalsData';
import { VetMessageRenderer, cleanTextForVoice } from './VetMessageRenderer';
import { vetOfflineStorage, VetConsultationSummary } from '../utils/vetOfflineStorage';

interface Props {
  species: VetSpecies;
  language: VetLanguage;
  activeAnimal?: UniversalAnimalRecord;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  onStartVoiceCall: () => void;
  onOpenEmergencyGuide?: () => void;
  onChangeAnimal?: () => void;
}

/**
 * Builds a dynamic, personalized welcome message tailored to the specific animal or universal mode
 */
function createWelcomeMessage(animal: UniversalAnimalRecord | undefined, species: VetSpecies, isOdia: boolean): VetChatMessage {
  if (animal) {
    const speciesLabelsOdia: Record<string, string> = {
      cattle: 'ଗାଈ (Cattle)',
      goat: 'ଛେଳି (Goat)',
      dog: 'କୁକୁର (Dog)',
      cat: 'ବିରାଡ଼ି (Cat)',
    };
    const spOdia = speciesLabelsOdia[animal.species] || animal.species;

    const text = isOdia
      ? `ନମସ୍କାର! ମୁଁ ଆରୋହୀ ଭେଟମିତ୍ର (Arohi VetMitra) ଅଟେ। ଆପଣଙ୍କ ${spOdia} '${animal.name}' (${animal.breed}, ଓଜନ: ${animal.weightKg} କିଲୋ, ଟ୍ୟାଗ୍: ${animal.tagNumber}) ର ସ୍ୱାସ୍ଥ୍ୟ, ଖାଦ୍ୟ କିମ୍ବା ରୋଗ ଲକ୍ଷଣ ସମ୍ପର୍କରେ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?

ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ, ଭଏସ୍ ମେସେଜ୍ ପଠାନ୍ତୁ କିମ୍ବା ଫଟୋ/ରିପୋର୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ।`
      : `Hello! I am Arohi VetMitra. How can I assist you with your ${animal.species} '${animal.name}' (${animal.breed}, ${animal.weightKg} kg, Tag: ${animal.tagNumber}) today?

Feel free to describe any symptoms, dietary needs, or upload a photo or medical report.`;

    return {
      id: `welcome_${animal.id}_${Date.now()}`,
      sender: 'arohi',
      text,
      timestamp: new Date(),
      species: animal.species,
    };
  }

  // Universal Welcome:
  const text = isOdia
    ? `ନମସ୍କାର! ମୁଁ ଆରୋହୀ ଭେଟମିତ୍ର (Arohi VetMitra) - ଆପଣଙ୍କ ୨୪x୭ AI ପଶୁ ଚିକିତ୍ସକ।

ଆପଣଙ୍କ ଗାଈ, ମଇଁଷି, ଛେଳି, କୁକୁର, ବିରାଡ଼ି କିମ୍ବା ଅନ୍ୟ ଯେକୌଣସି ପଶୁପକ୍ଷୀଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ଖାଦ୍ୟ ଯୋଜନା, ରୋଗ ଲକ୍ଷଣ କିମ୍ବା ଟିକାକରଣ ବିଷୟରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।

ଆପଣ ଓଡ଼ିଆରେ କହିପାରିବେ, ଟାଇପ୍ କରିପାରିବେ କିମ୍ବା ଫଟୋ/ରିପୋର୍ଟ ଅପଲୋଡ୍ କରିପାରିବେ।`
    : `Namaskar! I am Arohi VetMitra, your 24x7 AI Veterinary Doctor.

Ask me any clinical, diagnostic, or feeding questions about cattle, buffalo, goats, dogs, cats, or any other livestock and pets.

Type your query in Odia, English, or Hindi, or send a voice message / upload a photo.`;

  return {
    id: `welcome_universal_${Date.now()}`,
    sender: 'arohi',
    text,
    timestamp: new Date(),
    species,
  };
}

/**
 * Returns dynamic suggested prompts specific to the animal species
 */
function getSpeciesSuggestions(species: VetSpecies, isOdia: boolean) {
  switch (species) {
    case 'cat':
      return [
        {
          label: isOdia ? '🚽 ମୂତ୍ର ସମସ୍ୟା (FLUTD)' : 'Urination / Straining',
          query: isOdia 
            ? 'ମୋ ବିରାଡ଼ି ପରିସ୍ରା କରିବାରେ କଷ୍ଟ ପାଉଛି ବା ବାରମ୍ବାର ଲିଟର ବକ୍ସ ଯାଉଛି। ଏହା କଣ ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି?' 
            : 'My cat is straining to urinate or frequenting the litter box. Is this a medical emergency?'
        },
        {
          label: isOdia ? '🧶 ବାନ୍ତି ଓ ହେୟାରବଲ୍' : 'Hairballs & Vomiting',
          query: isOdia 
            ? 'ମୋ ବିରାଡ଼ି ବାନ୍ତି କରୁଛି ଓ ଲୋମ ବାହାରୁଛି। ଏଥିପାଇଁ କି ପ୍ରକାର ଖାଦ୍ୟ ଓ ପ୍ରାଥମିକ ଚିକିତ୍ସା ଦରକାର?' 
            : 'My cat is vomiting hairballs. What dietary adjustments and care should I provide?'
        },
        {
          label: isOdia ? '🐟 ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଯୋଜନା' : 'Diet & Taurine Needs',
          query: isOdia 
            ? 'ବିରାଡ଼ି ପାଇଁ ଟରିନ୍ (Taurine) ଓ ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ସନ୍ତୁଳିତ ଖାଦ୍ୟ କିପରି ପ୍ରସ୍ତୁତ କରିବି?' 
            : 'What is a balanced diet plan with essential taurine and protein for a domestic cat?'
        },
        {
          label: isOdia ? '💉 ଟିକାକରଣ ଓ କୃମି' : 'Vaccines & Deworming',
          query: isOdia 
            ? 'ବିରାଡ଼ି ପାଇଁ ଟ୍ରାଇଭେକ୍ (Tricat) ଓ ରେବିଜ୍ ଟିକା ଏବଂ କୃମିନାଶକ ସମୟସାରଣୀ କୁହନ୍ତୁ।' 
            : 'What is the recommended core vaccination (Tricat, Rabies) and deworming schedule for my cat?'
        },
      ];
    case 'dog':
      return [
        {
          label: isOdia ? '🤢 ବାନ୍ତି ଓ ଝାଡ଼ା (Vomiting)' : 'Vomiting & Diarrhea',
          query: isOdia 
            ? 'ମୋ କୁକୁର ବାନ୍ତି ଓ ପତଳା ଝାଡ଼ା କରୁଛି। ତୁରନ୍ତ କଣ ପ୍ରାଥମିକ ଚିକିତ୍ସା ଓ ORS ଦେବି?' 
            : 'My dog is vomiting and having loose stool. What immediate first aid, ORS, and bland diet should I give?'
        },
        {
          label: isOdia ? '🕷️ ବାହାଙ୍ଗିଆ ଓ ଚର୍ମ କୁଣ୍ଡାଇ' : 'Ticks & Skin Allergy',
          query: isOdia 
            ? 'କୁକୁର ଦେହରେ ବାହାଙ୍ଗିଆ (Ticks) ହୋଇଛି ଏବଂ ଚର୍ମ କୁଣ୍ଡାଉଛି। କିପରି ସୁରକ୍ଷିତ ଚିକିତ୍ସା କରିବି?' 
            : 'How should I safely treat tick infestation and relieve itching in my dog?'
        },
        {
          label: isOdia ? '🍗 କୁକୁର ଖାଦ୍ୟ ଚାର୍ଟ' : 'Safe Diet & Toxic Foods',
          query: isOdia 
            ? 'କୁକୁର ପାଇଁ କେଉଁ ଖାଦ୍ୟ ବିଷାକ୍ତ ଏବଂ ଘରେ କିପରି ସୁସ୍ଥ ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ଦାନା ତିଆରି କରିବି?' 
            : 'Which human foods are toxic to dogs, and how do I formulate a healthy homemade meal?'
        },
        {
          label: isOdia ? '💉 ପାର୍ଭୋ ଓ ଟିକା ନିୟମ' : 'Parvovirus & Vaccines',
          query: isOdia 
            ? 'କୁକୁର ଛୁଆ ପାଇଁ ପାର୍ଭୋଭାଇରସ୍ ସତର୍କତା ଏବଂ ଡିଏଚପିପିଆଇ (DHPPi) ଟିକାକରଣ ନିୟମ କଣ?' 
            : 'What are the red flag symptoms of puppy parvovirus and the 9-in-1 vaccine schedule?'
        },
      ];
    case 'goat':
      return [
        {
          label: isOdia ? '🌾 ପେଟ ଫୁଲିବା (Bloat)' : 'Rumen Bloat / Gas',
          query: isOdia 
            ? 'ମୋ ଛେଳିର ପେଟ ଫୁଲିଯାଇଛି (Acute Bloat) ଏବଂ ସେ କଷ୍ଟ ପାଉଛି। ତୁରନ୍ତ କଣ ଜରୁରୀ ପ୍ରାଥମିକ ଚିକିତ୍ସା କରିବି?' 
            : 'My goat has acute bloat from grains/greens. What is the immediate emergency first aid?'
        },
        {
          label: isOdia ? '💉 PPR ଓ କୃମିନାଶକ' : 'PPR Vaccine & Deworming',
          query: isOdia 
            ? 'ଛେଳିଙ୍କ ପାଇଁ PPR ଓ ଏଣ୍ଟେରୋଟକ୍ସେମିଆ ଟିକା ଏବଂ ବୋତଲ ଜଡ୍ (Bottle Jaw) କୃମି ନିୟନ୍ତ୍ରଣ କିପରି କରିବି?' 
            : 'How do I prevent PPR disease and treat parasitic bottle jaw anemia in goats?'
        },
        {
          label: isOdia ? '🐐 ଛୁଆ ଯତ୍ନ ଓ ଖାଦ୍ୟ' : 'Kid Care & Nutrition',
          query: isOdia 
            ? 'ନବଜାତ ଛେଳି ଛୁଆକୁ କୋଲୋଷ୍ଟ୍ରମ୍ କେତେ ଦେବି ଏବଂ ଝାଡ଼ା ହେଲେ କିପରି ଯତ୍ନ ନେବି?' 
            : 'How to manage colostrum feeding and prevent diarrhea in young goat kids?'
        },
        {
          label: isOdia ? '🌿 ଓଜନ ବୃଦ୍ଧି ରାସନ୍' : 'Weight Gain Diet',
          query: isOdia 
            ? 'ଛେଳିର ସୁସ୍ଥ ଓଜନ ବୃଦ୍ଧି ପାଇଁ ଶସ୍ତା ଦାନା ଓ ସୁବାବୁଲ/ନେପିୟର ଖାଦ୍ୟ ଯୋଜନା ଦିଅନ୍ତୁ।' 
            : 'What is a balanced and economical feeding ration for healthy goat weight gain?'
        },
      ];
    case 'cattle':
    default:
      return [
        {
          label: isOdia ? '🥛 ଦୁଗ୍ଧ ବୃଦ୍ଧି ଓ ଖାଦ୍ୟ' : 'Milk Yield & Diet',
          query: isOdia 
            ? 'ମୋ ଗାଈର ଦୁଧ କମିଯାଇଛି। NASEM ଅନୁସାରେ ସନ୍ତୁଳିତ ନେପିୟର, ନଡ଼ା ଓ ଦାନା ଯୋଜନା ଦିଅନ୍ତୁ।' 
            : 'My cow\'s milk yield has dropped. Please provide a balanced NASEM feeding plan to restore production.'
        },
        {
          label: isOdia ? '🌿 ଜାବର କାଟିବା ଯାଞ୍ଚ' : 'Cud Chewing & Rumen',
          query: isOdia 
            ? 'ଗାଈ ଜାବର କମ କାଟୁଛି କିମ୍ବା ହଜମ ଠିକ ହେଉନାହିଁ। ରୁମେନ୍ ସ୍ୱାସ୍ଥ୍ୟ ପାଇଁ କଣ ଉପଚାର କରିବି?' 
            : 'My cow is chewing cud less frequently. How do I restore rumen microbial digestion?'
        },
        {
          label: isOdia ? '🩺 ଥନ ଫୁଲିବା (Mastitis)' : 'Mastitis Prevention',
          query: isOdia 
            ? 'ଗାଈର ଥନ ଟାଣ ଅଛି ବା କ୍ଷୀରରେ ଛିଣ୍ଡା ପଡ଼ୁଛି। ମାଷ୍ଟାଇଟିସ୍ ଚିକିତ୍ସା ଓ ପରୀକ୍ଷା କିପରି କରିବି?' 
            : 'Udder quarter is swollen or milk has flakes. How to test for mastitis and care for it?'
        },
        {
          label: isOdia ? '🌡️ ଜ୍ୱର ଓ ଟିକବାହିତ ରୋଗ' : 'Fever & Tick Disease',
          query: isOdia 
            ? 'ଗାଈକୁ ଜ୍ୱର ଅଛି ଏବଂ ସେ ଖାଇବା ବନ୍ଦ କରିଛି। କେଉଁ ଲକ୍ଷଣ ଦେଖି ଡାକ୍ତରଙ୍କୁ ଡାକିବି?' 
            : 'My cow has high fever and is off-feed. What signs indicate tick-borne hemoprotozoa?'
        },
      ];
  }
}

export const VetMitraChatView: React.FC<Props> = ({
  species,
  language,
  activeAnimal,
  initialQuery,
  onClearInitialQuery,
  onStartVoiceCall,
  onOpenEmergencyGuide,
  onChangeAnimal,
}) => {
  const isOdia = language === 'or';

  // Per-animal conversation storage to prevent cross-animal contamination
  const [messagesByAnimal, setMessagesByAnimal] = useState<Record<string, VetChatMessage[]>>({});
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [activeSpeechMessageId, setActiveSpeechMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<{ name: string; type: string; base64: string; previewUrl: string } | null>(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentAnimalId = activeAnimal ? activeAnimal.id : 'universal_chat';
  const currentMessages = messagesByAnimal[currentAnimalId] || [];

  // Initialize and load cached conversation for active animal or universal session
  useEffect(() => {
    let isMounted = true;
    const loadCachedConversation = async () => {
      try {
        const cached = await vetOfflineStorage.getAnimalChatHistory(currentAnimalId);
        if (isMounted) {
          if (cached && cached.length > 0) {
            setMessagesByAnimal((prev) => ({
              ...prev,
              [currentAnimalId]: cached,
            }));
          } else if (!messagesByAnimal[currentAnimalId] || messagesByAnimal[currentAnimalId].length === 0) {
            const welcomeMsg = createWelcomeMessage(activeAnimal, species, isOdia);
            setMessagesByAnimal((prev) => ({
              ...prev,
              [currentAnimalId]: [welcomeMsg],
            }));
          }
        }
      } catch (err) {
        console.warn('Failed to load cached conversation:', err);
      }
    };

    loadCachedConversation();
    return () => {
      isMounted = false;
    };
  }, [currentAnimalId, isOdia, activeAnimal?.id, species]);

  // Handle incoming initial query if passed from Home view
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery.trim());
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length, isAiThinking]);

  // Clean Audio Playback
  const handlePlayVoice = (message: VetChatMessage) => {
    if (activeSpeechMessageId === message.id) {
      stopArohiVoice();
      setActiveSpeechMessageId(null);
      return;
    }

    stopArohiVoice();
    setActiveSpeechMessageId(message.id);

    // Clean text of all markdown artifacts (###, **, bullets, ---) so voice is completely natural
    const cleanSpeech = cleanTextForVoice(message.text);

    playArohiVoice(cleanSpeech, {
      language: language === 'or' ? 'or-IN' : language === 'hi' ? 'hi-IN' : 'en-IN',
      voice: 'Zypher',
      onEnd: () => setActiveSpeechMessageId(null),
      onError: () => setActiveSpeechMessageId(null),
    });
  };

  // Copy Clean Text
  const handleCopyText = (message: VetChatMessage) => {
    const clean = cleanTextForVoice(message.text);
    navigator.clipboard.writeText(clean);
    setCopiedMessageId(message.id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Reset conversation for this animal
  const handleClearAnimalChat = async () => {
    const freshWelcome = createWelcomeMessage(activeAnimal, species, isOdia);
    setMessagesByAnimal((prev) => ({
      ...prev,
      [currentAnimalId]: [freshWelcome],
    }));
    await vetOfflineStorage.saveAnimalChatHistory(currentAnimalId, [freshWelcome]);
    stopArohiVoice();
    setActiveSpeechMessageId(null);
  };

  // Send Message Flow
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query && !selectedFile) return;

    const userMessage: VetChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query || (selectedFile ? `[Attached: ${selectedFile.name}]` : ''),
      timestamp: new Date(),
      species: activeAnimal?.species || species,
      attachments: selectedFile
        ? [
            {
              type: 'image',
              url: selectedFile.previewUrl,
              name: selectedFile.name,
            },
          ]
        : undefined,
    };

    // Append to current animal's conversation
    setMessagesByAnimal((prev) => ({
      ...prev,
      [currentAnimalId]: [...(prev[currentAnimalId] || []), userMessage],
    }));

    setInputText('');
    const currentFile = selectedFile;
    setSelectedFile(null);
    setShowAttachMenu(false);
    setIsAiThinking(true);

    try {
      // Build conversation history excluding welcome greeting
      const historyPayload = currentMessages
        .filter((m) => !m.id.startsWith('welcome_'))
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }));

      const animalContextSummary = activeAnimal ? `
CURRENT CONSULTATION ANIMAL:
- Name: ${activeAnimal.name} (${activeAnimal.nameOdia || activeAnimal.name})
- Species: ${activeAnimal.species.toUpperCase()}
- Breed: ${activeAnimal.breed}
- Age: ${activeAnimal.ageYears} years
- Body Weight: ${activeAnimal.weightKg} kg
- Identification Tag: ${activeAnimal.tagNumber}
- General Status: ${activeAnimal.status}
- Rectal Temperature: ${activeAnimal.temperatureC}°C
- Appetite: ${activeAnimal.appetite}
- Rumination / Activity: ${activeAnimal.ruminationOrActivity}
${activeAnimal.milkYieldLDay ? `- Daily Milk Yield: ${activeAnimal.milkYieldLDay} L/day (recent yield: ${activeAnimal.recentYieldDropLDay || activeAnimal.milkYieldLDay} L/day)` : ''}
${activeAnimal.vaccinations?.length ? `- Last Vaccines: ${activeAnimal.vaccinations.map(v => `${v.name} (${v.status})`).join(', ')}` : ''}

USER LANGUAGE: ${language === 'or' ? 'Odia (ଓଡ଼ିଆ)' : language === 'hi' ? 'Hindi' : 'English'}.
Address the animal as '${activeAnimal.name}'. Give tailored, compassionate, clinical advice specific to this ${activeAnimal.species}.
MANDATORY FORMATTING: NEVER output raw "###" or "##" hashes or "---" lines or "* **" combos. Write clean, natural sentences, clear headings without symbols, and simple numbered points.
` : `
UNIVERSAL VETERINARY CONSULTATION:
The user is asking a veterinary question about any livestock or pet (cattle, buffalo, goat, sheep, dog, cat, poultry, etc.).
Do NOT assume any fixed animal profile like Ganga or Bruno. Identify the animal species and symptoms directly from what the user describes, and give clear clinical triage.
USER LANGUAGE: ${language === 'or' ? 'Odia (ଓଡ଼ିଆ)' : language === 'hi' ? 'Hindi' : 'English'}.
MANDATORY FORMATTING: NEVER output raw "###" or "##" hashes or "---" lines or "* **" combos. Write clean, natural sentences, clear headings without symbols, and simple numbered points.
`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query || 'Analyze attached animal photo or report.',
          history: historyPayload,
          language: language,
          mode: 'vetmitra',
          systemContext: `${AROHI_VETMITRA_SYSTEM_PROMPT}\n${animalContextSummary}`,
          file: currentFile
            ? {
                name: currentFile.name,
                mimeType: currentFile.type || 'image/jpeg',
                base64: currentFile.base64,
              }
            : undefined,
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const botMessage: VetChatMessage = {
        id: `arohi_${Date.now()}`,
        sender: 'arohi',
        text: data.response || (isOdia 
          ? (activeAnimal ? `ମୁଁ ${activeAnimal.name} ର ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ କଲି। ତାର ସ୍ୱାସ୍ଥ୍ୟ ବଜାୟ ରଖିବା ପାଇଁ ପରାମର୍ଶ ଧ୍ୟାନ ଦିଅନ୍ତୁ।` : `ମୁଁ ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ କଲି। ପଶୁଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ବଜାୟ ରଖିବା ପାଇଁ ତଳେ ଉଲ୍ଲିଖିତ ପରାମର୍ଶ ଅନୁସରଣ କରନ୍ତୁ।`)
          : (activeAnimal ? `I have evaluated ${activeAnimal.name}'s condition and provided clinical recommendations above.` : `I have evaluated the symptoms and provided clinical recommendations above.`)),
        timestamp: new Date(),
        species: activeAnimal?.species || species,
      };

      const updatedList = [...(currentMessages), userMessage, botMessage];
      setMessagesByAnimal((prev) => ({
        ...prev,
        [currentAnimalId]: updatedList,
      }));
      setIsAiThinking(false);

      // Persist conversation to offline storage (IndexedDB + LocalStorage)
      vetOfflineStorage.saveAnimalChatHistory(currentAnimalId, updatedList).catch((err) => {
        console.warn('Failed to cache chat offline:', err);
      });

      // Auto-save/update consultation summary for active animal so it is viewable offline
      if (activeAnimal && query) {
        const consultSummary: VetConsultationSummary = {
          id: `consult_${activeAnimal.id}_${Date.now()}`,
          animalId: activeAnimal.id,
          animalName: activeAnimal.name,
          animalNameOdia: activeAnimal.nameOdia,
          species: activeAnimal.species,
          timestamp: new Date().toISOString(),
          formattedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          chiefComplaint: query.slice(0, 140),
          chiefComplaintOdia: isOdia ? query.slice(0, 140) : undefined,
          symptoms: [query.slice(0, 60)],
          diagnosisOrAssessment: botMessage.text.slice(0, 300) + '...',
          diagnosisOrAssessmentOdia: isOdia ? botMessage.text.slice(0, 300) + '...' : undefined,
          clinicalAdvice: botMessage.text.slice(0, 450),
          medicinesOrFirstAid: [
            query.toLowerCase().includes('mastitis') || query.includes('ଥନ') 
              ? 'Teat dip & veterinary antibiotic intramammary tube (under vet advice)'
              : query.toLowerCase().includes('bloat') || query.includes('ପେଟ')
              ? 'Tympanil / Turpentine oil emulsion + withhold concentrates'
              : 'Hydration with electrolytes & supportive feed',
            'Follow-up in 24-48 hours if fever/symptoms persist'
          ],
          status: 'completed',
          messagesCount: updatedList.length,
          lastMessageSnippet: botMessage.text.slice(0, 100),
          channel: 'chat',
          history: updatedList.map((m) => ({
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp instanceof Date ? m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : String(m.timestamp),
          })),
        };

        vetOfflineStorage.saveConsultationSummary(consultSummary).catch((err) => {
          console.warn('Failed to cache consultation summary:', err);
        });
      }
    } catch (err) {
      setIsAiThinking(false);
      const fallbackMsg: VetChatMessage = {
        id: `arohi_fb_${Date.now()}`,
        sender: 'arohi',
        text: isOdia
          ? (activeAnimal 
              ? `ମୁଁ ${activeAnimal.name} ର ସମସ୍ୟା ବୁଝିଲି। ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଓ ସ୍ୱଚ୍ଛ ପାଣି ନିୟମିତ ଦିଅନ୍ତୁ। ଅଧିକ ଜରୁରୀ ପରାମର୍ଶ ପାଇଁ "ଭଏସ୍ କଲ୍" (Voice Call) ବଟନ୍ ଦବାନ୍ତୁ କିମ୍ବା ୧୯୬୨ ରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।`
              : `ମୁଁ ଆପଣଙ୍କ ପଶୁଙ୍କ ସମସ୍ୟା ବୁଝିଲି। ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଓ ସ୍ୱଚ୍ଛ ପାଣି ନିୟମିତ ଦିଅନ୍ତୁ। ଜରୁରୀ ପରାମର୍ଶ ପାଇଁ "ଭଏସ୍ କଲ୍" (Voice Call) ବଟନ୍ ଦବାନ୍ତୁ କିମ୍ବା ୧୯୬୨ ରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।`)
          : (activeAnimal
              ? `I have noted the details for ${activeAnimal.name}. Ensure access to clean water and supportive care. Tap Voice Call if you need live guidance or dial 1962.`
              : `I have noted the details for your animal. Ensure access to clean water and supportive care. Tap Voice Call if you need live guidance or dial 1962.`),
        timestamp: new Date(),
        species: activeAnimal?.species || species,
      };
      const updatedList = [...(currentMessages), userMessage, fallbackMsg];
      setMessagesByAnimal((prev) => ({
        ...prev,
        [currentAnimalId]: updatedList,
      }));
      vetOfflineStorage.saveAnimalChatHistory(currentAnimalId, updatedList).catch(() => {});
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Clean = result.split(',')[1] || '';
      setSelectedFile({
        name: file.name,
        type: file.type,
        base64: base64Clean,
        previewUrl: result,
      });
      setShowAttachMenu(false);
    };
    reader.readAsDataURL(file);
  };

  const quickSuggestions = getSpeciesSuggestions(activeAnimal?.species || species, isOdia);

  return (
    <div className="flex flex-col h-[780px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl animate-in fade-in-50 duration-300">
      {/* Top Active Animal Context Header */}
      <div className="p-3.5 sm:p-4 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {activeAnimal ? (
            <>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0">
                <img
                  src={activeAnimal.photoUrl}
                  alt={activeAnimal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {activeAnimal.species.toUpperCase()} • {activeAnimal.breed}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-emerald-700 font-bold">Active</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  <strong className="text-slate-900">{activeAnimal.name}</strong> • {activeAnimal.weightKg} kg • Tag: {activeAnimal.tagNumber}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm shrink-0">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900">
                    Arohi VetMitra™ • {isOdia ? 'ପଶୁ ଚିକିତ୍ସା ଓ ପରାମର୍ଶ' : 'AI Veterinary Doctor'}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-emerald-700 font-bold">24x7 Live</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {isOdia 
                    ? 'ସମସ୍ତ ପଶୁପକ୍ଷୀଙ୍କ ପାଇଁ ଉନ୍ମୁକ୍ତ ପରାମର୍ଶ (ଗାଈ, ମଇଁଷି, ଛେଳି, କୁକୁର, ବିରାଡ଼ି)' 
                    : 'Universal Veterinary Care for All Livestock & Pets'}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onChangeAnimal && (
            <button
              onClick={onChangeAnimal}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              title={activeAnimal ? "Select different animal" : "Open Animal Passport"}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{activeAnimal ? "Change Animal" : "Animal Passport"}</span>
            </button>
          )}

          <button
            onClick={handleClearAnimalChat}
            className="p-1.5 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-colors"
            title="Reset conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onStartVoiceCall}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isOdia ? 'ଭଏସ୍ କଲ୍' : 'Voice Call'}</span>
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
        {currentMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSpeechActive = activeSpeechMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in-50 duration-200`}
            >
              <div
                className={`max-w-[92%] sm:max-w-[82%] rounded-2xl p-4 text-sm leading-relaxed space-y-2.5 ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white text-slate-900 border border-slate-200/90 rounded-bl-none shadow-sm'
                }`}
              >
                {/* Photo Attachments */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="rounded-xl overflow-hidden border border-emerald-200 max-w-xs shadow-xs">
                    <img
                      src={msg.attachments[0].url}
                      alt="Attachment"
                      className="w-full h-44 object-cover"
                    />
                  </div>
                )}

                {/* Clean Message Content (no raw ###, ##, --- or asterisk debris) */}
                <VetMessageRenderer content={msg.text} isUser={isUser} />

                {/* Bot action bar: Voice playback & Copy buttons */}
                {!isUser && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePlayVoice(msg)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          isSpeechActive 
                            ? 'bg-emerald-600 text-white shadow-xs' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title="Listen to advice"
                      >
                        {isSpeechActive ? (
                          <>
                            <Pause className="w-3 h-3 animate-pulse" />
                            <span>{isOdia ? 'ବନ୍ଦ କରନ୍ତୁ' : 'Stop'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-emerald-600" />
                            <span>{isOdia ? 'ଶୁଣନ୍ତୁ' : 'Listen'}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopyText(msg)}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                        title="Copy clean advice text"
                      >
                        {copiedMessageId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-[11px] text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                )}

                {isUser && (
                  <div className="text-[10px] text-emerald-100 text-right pt-0.5">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isAiThinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-2 text-xs text-emerald-700 shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>
                {isOdia 
                  ? (activeAnimal 
                      ? `ଆରୋହୀ ${activeAnimal.name} ର ସମସ୍ୟା ବିଶ୍ଳେଷଣ କରୁଛନ୍ତି...` 
                      : 'ଆରୋହୀ ଲକ୍ଷଣ ବିଶ୍ଳେଷଣ କରୁଛନ୍ତି...')
                  : (activeAnimal 
                      ? `Arohi is analyzing symptoms for ${activeAnimal.name}...` 
                      : 'Arohi is analyzing symptoms...')}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Species-Specific Suggested Quick Consult Chips */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
        <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          {isOdia ? 'ଦ୍ରୁତ ପରାମର୍ଶ:' : 'Quick:'}
        </span>
        {quickSuggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.query)}
            className="px-3 py-1 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-900 font-medium shrink-0 whitespace-nowrap transition-all shadow-2xs"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Bottom Input Dock with Attachment Drawer */}
      <div className="p-3 bg-white border-t border-slate-200 relative">
        {/* Selected file badge preview */}
        {selectedFile && (
          <div className="mb-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold truncate">{selectedFile.name}</span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-rose-600 font-bold hover:bg-rose-50"
            >
              Remove
            </button>
          </div>
        )}

        {/* Attachment Menu Popup */}
        {showAttachMenu && (
          <div className="absolute bottom-16 left-4 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 w-64 space-y-1 z-20 animate-in slide-in-from-bottom-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <Camera className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isOdia ? 'ଫଟୋ ଉଠାନ୍ତୁ (Take Photo)' : 'Take Animal / Symptom Photo'}
              </span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <Upload className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                {isOdia ? 'ଗ୍ୟାଲେରୀରୁ ଫଟୋ ବାଛନ୍ତୁ' : 'Choose from Gallery'}
              </span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
              <span>
                {isOdia ? 'ଲାବ୍ ରିପୋର୍ଟ / CBC ଅପଲୋଡ୍' : 'Upload Lab Report / CBC'}
              </span>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0"
            title="Attach photo or report"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              isOdia 
                ? (activeAnimal 
                    ? `${activeAnimal.name} ପାଇଁ ଲକ୍ଷଣ ବା ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...` 
                    : 'ପଶୁପକ୍ଷୀଙ୍କ ଲକ୍ଷଣ, ରୋଗ ବା ଖାଦ୍ୟ ବିଷୟରେ ଲେଖନ୍ତୁ...')
                : (activeAnimal 
                    ? `Type symptoms or questions for ${activeAnimal.name}...` 
                    : 'Type symptoms, feeding, or veterinary questions...')
            }
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-50 focus:bg-white rounded-2xl border border-transparent focus:border-emerald-500 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all"
          />

          <button
            onClick={onStartVoiceCall}
            className="w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-800/30 transition-transform active:scale-95 shrink-0"
            title={isOdia ? 'ଭଏସ୍ କଲ୍ ମାଧ୍ୟମରେ କଥା ହୁଅନ୍ତୁ' : 'Live Voice Call'}
          >
            <Mic className="w-5 h-5" />
          </button>

          {(inputText.trim() || selectedFile) && (
            <button
              onClick={() => handleSendMessage()}
              className="w-11 h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};
