// Arohi VetMitra - Offline Caching Engine (IndexedDB + LocalStorage Dual Layer)
// Ensures rural farmers can seamlessly view, search, and manage animal records
// and previous clinical consultation summaries even without an internet connection.

import { UniversalAnimalRecord, SAMPLE_ANIMAL_RECORDS } from '../data/mockAnimalsData';
import { VetChatMessage, VetSpecies } from '../types';

export interface VetConsultationSummary {
  id: string;
  animalId?: string;
  animalName: string;
  animalNameOdia?: string;
  species: VetSpecies;
  timestamp: string; // ISO string
  formattedDate: string;
  chiefComplaint: string;
  chiefComplaintOdia?: string;
  symptoms: string[];
  diagnosisOrAssessment: string;
  diagnosisOrAssessmentOdia?: string;
  clinicalAdvice: string;
  clinicalAdviceOdia?: string;
  medicinesOrFirstAid: string[];
  dietaryPlan?: string;
  isEmergency?: boolean;
  status: 'completed' | 'follow_up_needed' | 'critical_referred';
  messagesCount: number;
  lastMessageSnippet: string;
  channel: 'chat' | 'voice_call' | 'scanner_report';
  history?: Array<{
    sender: 'user' | 'arohi';
    text: string;
    timestamp: string;
  }>;
}

export interface StoredOfflineQueueItem {
  id: string;
  animalId?: string;
  species: VetSpecies;
  timestamp: string;
  query: string;
  status: 'pending' | 'synced';
}

const DB_NAME = 'ArohiVetMitraOfflineDB';
const DB_VERSION = 1;

// LocalStorage Keys for resilient secondary fallback
const LS_ANIMALS_KEY = 'arohi_vetmitra_cached_animals_v2';
const LS_CONSULTATIONS_KEY = 'arohi_vetmitra_cached_consultations_v2';
const LS_CHATS_KEY = 'arohi_vetmitra_cached_chats_v2';
const LS_QUEUE_KEY = 'arohi_vetmitra_cached_queue_v2';
const LS_LAST_SYNC_KEY = 'arohi_vetmitra_cache_last_sync_v2';

// Pre-seeded comprehensive consultation records so farmers immediately have offline summaries
export const PRE_SEEDED_CONSULTATION_SUMMARIES: VetConsultationSummary[] = [
  {
    id: 'consult_ganga_milk_drop_01',
    animalId: 'animal_ganga_cow',
    animalName: 'Ganga',
    animalNameOdia: 'ଗଙ୍ଗା',
    species: 'cattle',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    formattedDate: '3 days ago (୩ ଦିନ ପୂର୍ବେ)',
    chiefComplaint: 'Milk yield drop by 3 Litres/day and slower rumination',
    chiefComplaintOdia: 'ଦୈନିକ କ୍ଷୀର ୩ ଲିଟର କମିବା ଏବଂ ଜାବର କାଟିବାରେ ମନ୍ଥରତା',
    symptoms: ['Milk yield dropped from 12L to 9L', 'Slower rumination / cudding', 'Slightly reduced appetite', 'Normal temperature 38.5°C'],
    diagnosisOrAssessment: 'Sub-acute Ruminal Acidosis (SARA) or early subclinical mastitis screening advised. High concentrate without adequate effective fiber.',
    diagnosisOrAssessmentOdia: 'ପେଟରେ ଅମ୍ଳତା (SARA) କିମ୍ବା ଥନ ପରୀକ୍ଷା (Mastitis) ଆବଶ୍ୟକ। ଶୁଖିଲା କୁଟା ଓ ସନ୍ତୁଳିତ ଫାଇବର କମ୍ ରହିଛି।',
    clinicalAdvice: 'Increase dry chopped straw (କୁଟା) to 4 kg/day. Divide concentrate feed into 3 smaller portions. Provide Sodium Bicarbonate (ମିଠା ସୋଡ଼ା) 40-50g mixed with feed daily for 5 days. Strip-cup test milk from all 4 quarters for flakes.',
    clinicalAdviceOdia: 'ପ୍ରତିଦିନ ଖାଦ୍ୟରେ ୪୦-୫୦ ଗ୍ରାମ୍ ମିଠା ସୋଡ଼ା (Sodium Bicarbonate) ୫ ଦିନ ମିଶାଇ ଦିଅନ୍ତୁ। ଶୁଖିଲା କୁଟା ବଢ଼ାନ୍ତୁ। ଚାରିହେଁ ଥନରୁ ପ୍ରଥମ ଧାର କ୍ଷୀର ଯାଞ୍ଚ କରନ୍ତୁ।',
    medicinesOrFirstAid: [
      'Sodium Bicarbonate (ମିଠା ସୋଡ଼ା) 50g daily for 5 days',
      'Probiotic live yeast bolus (Biobloom / Rumentas) 1 bolus twice daily for 3 days',
      'Electrolyte water with 100g Jaggery (ଗୁଡ଼ ପାଣି)'
    ],
    dietaryPlan: '20 kg Green Napier + 4 kg Dry Paddy Straw + 3.5 kg Balanced Cattle Feed + 50g Mineral Mixture',
    isEmergency: false,
    status: 'follow_up_needed',
    messagesCount: 6,
    lastMessageSnippet: 'ମୁଁ ଗଙ୍ଗାର କ୍ଷୀର କମିବା କାରଣ ବୁଝିଲି। ମିଠା ସୋଡ଼ା ଓ ସନ୍ତୁଳିତ ରେସନ୍ ଦିଅନ୍ତୁ, ୩ ଦିନରେ କ୍ଷୀର ପୁଣି ସ୍ୱାଭାବିକ ହେବ।',
    channel: 'chat',
    history: [
      { sender: 'user', text: 'ମୋ ଗାଈ ଗଙ୍ଗାର କ୍ଷୀର ୧୨ ଲିଟରରୁ ୯ ଲିଟରକୁ ଖସିଆସିଛି। ଜାବର କାଟିବା ମନ୍ଥର ହୋଇଛି। କଣ କରିବି?', timestamp: '3 days ago' },
      { sender: 'arohi', text: 'ନମସ୍କାର! ଗଙ୍ଗାର ତାପମାତ୍ରା ୩୮.୫°C ସ୍ୱାଭାବିକ ଅଛି। ଏହା ପେଟରେ ଅମ୍ଳତା (Subacute Ruminal Acidosis) ଯୋଗୁଁ ହୋଇପାରେ। ଦାନା ଏକାଥରେ ନଦେଇ ଦିନକୁ ୩ ଥର ଭାଗ କରି ଦିଅନ୍ତୁ। ଦୈନିକ ୫୦ ଗ୍ରାମ୍ ମିଠା ସୋଡ଼ା (Sodium Bicarbonate) ଦାନାରେ ମିଶାନ୍ତୁ।', timestamp: '3 days ago' },
      { sender: 'user', text: 'କୌଣସି ଥନ ରୋଗ ହୋଇପାରେ କି?', timestamp: '3 days ago' },
      { sender: 'arohi', text: 'ହଁ, କ୍ଷୀର କମିବା ସବକ୍ଲିନିକାଲ୍ ମାଷ୍ଟାଇଟିସ୍ ର ପ୍ରଥମ ଲକ୍ଷଣ ହୋଇପାରେ। ଚାରିହେଁ ଥନକୁ ହାତରେ ସ୍ପର୍ଶ କରି ଦେଖନ୍ତୁ ଉଷୁମ କିମ୍ବା ଟାଣ ଅଛି କି ନାହିଁ। କ୍ଷୀର ଧାରରେ ଛିଣ୍ଡା ଛିଣ୍ଡା ଆସୁଛି କି ଦେଖନ୍ତୁ।', timestamp: '3 days ago' }
    ]
  },
  {
    id: 'consult_ganga_fmd_deworming_02',
    animalId: 'animal_ganga_cow',
    animalName: 'Ganga',
    animalNameOdia: 'ଗଙ୍ଗା',
    species: 'cattle',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    formattedDate: '12 days ago (୧୨ ଦିନ ପୂର୍ବେ)',
    chiefComplaint: 'Post-monsoon Deworming and Vaccination Schedule Advice',
    chiefComplaintOdia: 'ବର୍ଷା ପରବର୍ତ୍ତୀ କୃମିନାଶକ ଓ ଟିକାକରଣ ସମୟସାରଣୀ',
    symptoms: ['Slight pot belly', 'Dull hair coat', 'Upcoming due date for deworming'],
    diagnosisOrAssessment: 'Routine prophylactic seasonal internal parasite deworming and FMD booster preparedness.',
    diagnosisOrAssessmentOdia: 'ନିୟମିତ କୃମିନାଶକ ଚକ୍ର ଏବଂ ଖୁରା ରୋଗ (FMD) ବୁଷ୍ଟର ଟିକା ଆବଶ୍ୟକ।',
    clinicalAdvice: 'Administer Albendazole suspension 100ml orally in the early morning on an empty stomach. Repeat with a different chemical class (Fenbendazole or Oxyclozanide) after 3 months.',
    clinicalAdviceOdia: 'ସକାଳେ ଖାଲି ପେଟରେ ଆଲବେଣ୍ଡାଜୋଲ୍ ୧୦୦ ମି.ଲି. ସସପେନସନ୍ ଦିଅନ୍ତୁ। କୃମି ଔଷଧ ଦେବାର ୭ ଦିନ ପରେ ଲିଭର ଟନିକ୍ (Liv-52) ୫୦ ମି.ଲି. ୭ ଦିନ ଦିଅନ୍ତୁ।',
    medicinesOrFirstAid: [
      'Albendazole 100ml suspension oral',
      'Liver Tonic (Liv-52 Protec) 50ml daily for 7 days post-deworming',
      'Chelated Mineral Mixture 50g daily'
    ],
    dietaryPlan: 'Maintain fresh drinking water, clean green fodder.',
    isEmergency: false,
    status: 'completed',
    messagesCount: 4,
    lastMessageSnippet: 'ଆଲବେଣ୍ଡାଜୋଲ୍ ଖାଲି ପେଟରେ ଦିଅନ୍ତୁ। କ୍ଷୀର ଉତ୍ପାଦନ ଓ ରୋଗ ପ୍ରତିରୋଧକ ଶକ୍ତି ବୃଦ୍ଧି ପାଇବ।',
    channel: 'chat',
    history: [
      { sender: 'user', text: 'ବର୍ଷା ପରେ କୃମି ଔଷଧ କେବେ ଏବଂ କିପରି ଦେବା ଉଚିତ?', timestamp: '12 days ago' },
      { sender: 'arohi', text: 'ବର୍ଷା ଋତୁ ପରେ କୃମି ସଂକ୍ରମଣ ବଢ଼ିଥାଏ। ସକାଳେ ଗଙ୍ଗାକୁ କିଛି ନଖାଇବା ପୂର୍ବରୁ ଆଲବେଣ୍ଡାଜୋଲ୍ ୧୦୦ ମି.ଲି. ପିଆନ୍ତୁ। ତା’ପରେ ୨ ଘଣ୍ଟା ପର୍ଯ୍ୟନ୍ତ କିଛି ଖାଇବାକୁ ଦିଅନ୍ତୁ ନାହିଁ।', timestamp: '12 days ago' }
    ]
  },
  {
    id: 'consult_ramu_bloat_01',
    animalId: 'animal_ramu_goat',
    animalName: 'Ramu',
    animalNameOdia: 'ରାମୁ',
    species: 'goat',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    formattedDate: '5 days ago (୫ ଦିନ ପୂର୍ବେ)',
    chiefComplaint: 'Mild abdominal distension (left side bloat) after eating tender wet grass',
    chiefComplaintOdia: 'ଓଦା ଘାସ ଖାଇବା ପରେ ବାମ ପେଟ ଫୁଲିବା (Bloat/ଅଜୀର୍ଣ୍ଣ)',
    symptoms: ['Left flank enlargement', 'Restlessness', 'Kicking at belly', 'Off-feed'],
    diagnosisOrAssessment: 'Frothy Tympany (Bloat) induced by wet legume forage fermentation in rumen.',
    diagnosisOrAssessmentOdia: 'ପେଟ ଫମ୍ପା / ଗ୍ୟାସ୍ (Frothy Bloat)। ଓଦା ଘାସର ଶୀଘ୍ର ଫର୍ମେଣ୍ଟେସନ୍ କାରଣରୁ ହୋଇଛି।',
    clinicalAdvice: 'IMMEDIATE FIRST AID: Keep front legs elevated on higher ground. Administer 50ml vegetable mustard oil (ସୋରିଷ ତେଲ) mixed with 5g Hing (ହେଙ୍ଗୁ) and 5ml Turpentine oil or Bloatosil suspension. Walk the goat gently.',
    clinicalAdviceOdia: 'ପ୍ରାଥମିକ ଚିକିତ୍ସା: ରାମୁର ଆଗ ଗୋଡ଼ ଦୁଇଟିକୁ ଉଚ୍ଚା ଜାଗାରେ ରଖନ୍ତୁ। ୫୦ ମି.ଲି. ସୋରିଷ ତେଲରେ ଅଳ୍ପ ହେଙ୍ଗୁ ମିଶାଇ ଧୀରେ ଧୀରେ ପିଆନ୍ତୁ କିମ୍ବା Bloatosil/Tympol ଦିଅନ୍ତୁ। ବାମ କୋଖରେ ହାଲୁକା ମାଲିସ୍ କରନ୍ତୁ।',
    medicinesOrFirstAid: [
      'Mustard oil (ସୋରିଷ ତେଲ) 50ml + Hing (ହେଙ୍ଗୁ) 5g',
      'Bloatosil / Tympanol 20-30ml oral',
      'Keep walking the goat, do not allow it to lie down flat'
    ],
    dietaryPlan: 'Stop fresh green fodder for 24 hours. Offer dry hay and clean lukewarm water.',
    isEmergency: true,
    status: 'completed',
    messagesCount: 5,
    lastMessageSnippet: 'ସୋରିଷ ତେଲ ଓ ହେଙ୍ଗୁ ତୁରନ୍ତ ଦିଅନ୍ତୁ। ଯଦି ନିଃଶ୍ୱାସ ନେବାରେ କଷ୍ଟ ହୁଏ, ତୁରନ୍ତ ୧୯୬୨ କଲ୍ କରନ୍ତୁ।',
    channel: 'voice_call',
    history: [
      { sender: 'user', text: 'ମୋ ଛେଳି ରାମୁର ବାମ ପେଟ ଫୁଲି ଯାଇଛି, ସେ ଛଟପଟ ହେଉଛି।', timestamp: '5 days ago' },
      { sender: 'arohi', text: 'ଏହା ବ୍ଲୋଟ୍ (Bloat) ର ଲକ୍ଷଣ। ତୁରନ୍ତ ରାମୁକୁ ଛିଡ଼ା କରାଇ ଆଗ ଗୋଡ଼କୁ ଉଚ୍ଚା ଜାଗାରେ ରଖନ୍ତୁ। ୫୦ ମିଲି ସୋରିଷ ତେଲରେ ଏକ ଚିମୁଟା ହେଙ୍ଗୁ ମିଶାଇ ପିଆଇ ଦିଅନ୍ତୁ। ବାମ ପେଟକୁ ହାତରେ ଉପରୁ ତଳକୁ ମାଲିସ୍ କରନ୍ତୁ ଯାହାଦ୍ୱାରା ଗ୍ୟାସ୍ ବାହାରିଯିବ।', timestamp: '5 days ago' }
    ]
  },
  {
    id: 'consult_bruno_ticks_01',
    animalId: 'animal_bruno_dog',
    animalName: 'Bruno',
    animalNameOdia: 'ବ୍ରୁନୋ',
    species: 'dog',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    formattedDate: '8 days ago (୮ ଦିନ ପୂର୍ବେ)',
    chiefComplaint: 'Brown dog ticks near ears and neck, scratching continuously',
    chiefComplaintOdia: 'କାନ ଓ ବେକ ପାଖରେ ବାହାଙ୍ଗିଆ ପୋକ (Ticks) ଏବଂ କୁଣ୍ଡାଇ ହେବା',
    symptoms: ['Brown dog ticks visible', 'Pruritus / skin scratching', 'Normal appetite', 'No fever (38.6°C)'],
    diagnosisOrAssessment: 'Rhipicephalus sanguineus (Brown dog tick) external parasite infestation.',
    diagnosisOrAssessmentOdia: 'ବାହ୍ୟ ପୋକ ସଂକ୍ରମଣ (Ticks & Fleas)। ସମୟରେ ଚିକିତ୍ସା ନକଲେ ଟିକ-ଫିଭର (Ehrlichia) ହୋଇପାରେ।',
    clinicalAdvice: 'Apply Fipronil + (S)-Methoprene spot-on pipette between shoulder blades on dry skin. Do not bathe for 48 hours before or after. Spray dog bedding with diluted cypermethrin.',
    clinicalAdviceOdia: 'ବ୍ରୁନୋର ପିଠି ଉପରେ କାନ୍ଧ ମଝିରେ ଫିପ୍ରୋନିଲ୍ (Fipronil Spot-on) ୨.୬୮ ମି.ଲି. ପକାନ୍ତୁ। ପୋକ ହାତରେ ଟାଣି ଛିଣ୍ଡାନ୍ତୁ ନାହିଁ। ବାସସ୍ଥାନକୁ ସଫା ରଖନ୍ତୁ।',
    medicinesOrFirstAid: [
      'Fipronil + (S)-Methoprene Spot-on for 20-40 kg dogs (single pipette)',
      'Chlorpheniramine maleate (Avil) if itching is severe',
      'Omega-3 fatty acid coat supplement'
    ],
    dietaryPlan: 'High-protein diet with boiled chicken, egg, and rice.',
    isEmergency: false,
    status: 'completed',
    messagesCount: 4,
    lastMessageSnippet: 'ଫିପ୍ରୋନିଲ୍ ସ୍ପଟ୍-ଅନ୍ ଲଗାଇବା ଦ୍ୱାରା ୨୪-୪୮ ଘଣ୍ଟା ମଧ୍ୟରେ ସବୁ ଟିକ୍ ଝଡ଼ି ପଡ଼ିବେ।',
    channel: 'chat',
    history: [
      { sender: 'user', text: 'ବ୍ରୁନୋ କାନରେ ବହୁତ ବାହାଙ୍ଗିଆ ପୋକ ଲାଗିଛନ୍ତି। କି ଔଷଧ ଦେବି?', timestamp: '8 days ago' },
      { sender: 'arohi', text: 'ବାହାଙ୍ଗିଆ ପୋକ କାମୁଡ଼ିଲେ ରକ୍ତହୀନତା ଓ ଜ୍ୱର ହୋଇପାରେ। ଆପଣ Fipronil Spot-on ଆଣି ତାର ବେକ ପଛ ଚର୍ମରେ ଲଗାନ୍ତୁ। ତାକୁ ୪୮ ଘଣ୍ଟା ଗାଧୋଇବେ ନାହିଁ।', timestamp: '8 days ago' }
    ]
  },
  {
    id: 'consult_lucy_hairball_01',
    animalId: 'animal_lucy_cat',
    animalName: 'Lucy',
    animalNameOdia: 'ଲୁସି',
    species: 'cat',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    formattedDate: '15 days ago (୧୫ ଦିନ ପୂର୍ବେ)',
    chiefComplaint: 'Occasional dry coughing and vomiting cylindrical hairballs',
    chiefComplaintOdia: 'ଶୁଖିଲା ଖାଂଶି ଏବଂ ବାନ୍ତିରେ ଲୋମ ବାହାରିବା (Hairballs)',
    symptoms: ['Hairball retching', 'Licking coat excessively', 'Good appetite', 'Normal urination'],
    diagnosisOrAssessment: 'Trichobezoar (Hairball buildup) due to natural feline grooming in shedding season.',
    diagnosisOrAssessmentOdia: 'ଲୋମ ଜମିବା କାରଣରୁ ହେୟାରବଲ୍ (Trichobezoar)। ସ୍ୱାଭାବିକ କିନ୍ତୁ ପାଚନ ସହାୟତା ଆବଶ୍ୟକ।',
    clinicalAdvice: 'Administer Hairball control malt paste (Laxatone / CatLax) 2-3 cm twice weekly. Brush fur daily with a slicker brush to remove loose hair. Ensure fresh water is always available.',
    clinicalAdviceOdia: 'ଦିନକୁ ଥରେ ଲୁସିର ଲୋମ ବ୍ରସ୍ କରନ୍ତୁ। ହେୟାରବଲ୍ ମାଲ୍ଟ ପେଷ୍ଟ୍ (Laxatone) ସପ୍ତାହକୁ ଦୁଇଥର ୧ ଚାମଚ ଦିଅନ୍ତୁ। ପାଣି ପିଇବା ପାଇଁ ପରିଷ୍କାର ପାତ୍ର ରଖନ୍ତୁ।',
    medicinesOrFirstAid: [
      'Hairball relief malt paste (Laxatone / Beaphar Malt Paste)',
      'Wet canned food with extra hydration',
      'Cat grass (oat/wheat sprout) for gentle digestion'
    ],
    dietaryPlan: 'Balanced wet cat food containing taurine + fresh water bowl.',
    isEmergency: false,
    status: 'completed',
    messagesCount: 4,
    lastMessageSnippet: 'ନିୟମିତ ଲୋମ ବ୍ରସ୍ କଲେ ଓ ମାଲ୍ଟ ପେଷ୍ଟ୍ ଦେଲେ ହେୟାରବଲ୍ ସମସ୍ୟା ସମ୍ପୂର୍ଣ୍ଣ ଦୂର ହୋଇଯିବ।',
    channel: 'chat',
    history: [
      { sender: 'user', text: 'ଲୁସି ବାନ୍ତି କରୁଛି ଏବଂ ସେଥିରୁ ଲୋମ ବାହାରୁଛି। କଣ କରିବି?', timestamp: '15 days ago' },
      { sender: 'arohi', text: 'ବିରାଡ଼ିମାନେ ନିଜ ଶରୀର ଚାଟି ସଫା କଲାବେଳେ ଲୋମ ପେଟକୁ ଯାଏ। ଏହାକୁ ରୋକିବା ପାଇଁ ହେୟାରବଲ୍ ମାଲ୍ଟ ପେଷ୍ଟ୍ ଦିଅନ୍ତୁ ଏବଂ ନିୟମିତ ତାର ଲୋମ ବ୍ରସ୍ କରନ୍ତୁ।', timestamp: '15 days ago' }
    ]
  }
];

// Open IndexedDB instance with promise wrapper
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // 1. Animals Store
      if (!db.objectStoreNames.contains('animals')) {
        db.createObjectStore('animals', { keyPath: 'id' });
      }

      // 2. Consultations Store
      if (!db.objectStoreNames.contains('consultations')) {
        const consultStore = db.createObjectStore('consultations', { keyPath: 'id' });
        consultStore.createIndex('animalId', 'animalId', { unique: false });
        consultStore.createIndex('species', 'species', { unique: false });
        consultStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // 3. Chat History Store
      if (!db.objectStoreNames.contains('chats')) {
        db.createObjectStore('chats', { keyPath: 'animalId' });
      }

      // 4. Offline Queue Store
      if (!db.objectStoreNames.contains('offline_queue')) {
        db.createObjectStore('offline_queue', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * VetOfflineStorage Class
 * Provides offline storage for Animals, Consultations, and Chats
 */
class VetOfflineStorageManager {
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initStorage();
    }
  }

  /**
   * Initializes IndexedDB and populates sample records if first run
   */
  async initStorage(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const db = await openDB();
      // Check if animals store is empty, if so seed with SAMPLE_ANIMAL_RECORDS
      const animalsCount = await this.countStoreItems(db, 'animals');
      if (animalsCount === 0) {
        await this.seedInitialData(db);
      }
      this.isInitialized = true;
    } catch (err) {
      console.warn('[VetOfflineStorage] IndexedDB initialization failed, using LocalStorage fallback:', err);
      this.seedLocalStorageFallback();
      this.isInitialized = true;
    }
  }

  private countStoreItems(db: IDBDatabase, storeName: string): Promise<number> {
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const countReq = store.count();
        countReq.onsuccess = () => resolve(countReq.result);
        countReq.onerror = () => resolve(0);
      } catch {
        resolve(0);
      }
    });
  }

  private async seedInitialData(db: IDBDatabase): Promise<void> {
    try {
      const tx = db.transaction(['animals', 'consultations'], 'readwrite');
      const animalStore = tx.objectStore('animals');
      const consultStore = tx.objectStore('consultations');

      for (const animal of SAMPLE_ANIMAL_RECORDS) {
        animalStore.put(animal);
      }
      for (const consult of PRE_SEEDED_CONSULTATION_SUMMARIES) {
        consultStore.put(consult);
      }

      // Also mirror to LocalStorage for instant zero-latency reading
      this.saveToLocalStorage(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS);
      this.saveToLocalStorage(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES);
      localStorage.setItem(LS_LAST_SYNC_KEY, new Date().toISOString());
    } catch (e) {
      console.warn('[VetOfflineStorage] Failed to seed initial data:', e);
    }
  }

  private seedLocalStorageFallback(): void {
    if (!localStorage.getItem(LS_ANIMALS_KEY)) {
      this.saveToLocalStorage(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS);
    }
    if (!localStorage.getItem(LS_CONSULTATIONS_KEY)) {
      this.saveToLocalStorage(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES);
    }
    if (!localStorage.getItem(LS_LAST_SYNC_KEY)) {
      localStorage.setItem(LS_LAST_SYNC_KEY, new Date().toISOString());
    }
  }

  private saveToLocalStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.warn(`[VetOfflineStorage] LocalStorage quota exceeded for ${key}:`, err);
    }
  }

  private getFromLocalStorage<T>(key: string, fallback: T): T {
    try {
      const val = localStorage.getItem(key);
      if (!val) return fallback;
      return JSON.parse(val) as T;
    } catch {
      return fallback;
    }
  }

  // ==================== ANIMAL RECORDS API ====================

  /**
   * Retrieves all stored animal records (works completely offline)
   */
  async getStoredAnimals(): Promise<UniversalAnimalRecord[]> {
    // 1. Try IndexedDB
    try {
      const db = await openDB();
      return await new Promise<UniversalAnimalRecord[]>((resolve) => {
        const tx = db.transaction('animals', 'readonly');
        const store = tx.objectStore('animals');
        const req = store.getAll();
        req.onsuccess = () => {
          if (req.result && req.result.length > 0) {
            // Keep localstorage in sync
            this.saveToLocalStorage(LS_ANIMALS_KEY, req.result);
            resolve(req.result);
          } else {
            // Fall back to sample
            resolve(this.getFromLocalStorage(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS));
          }
        };
        req.onerror = () => {
          resolve(this.getFromLocalStorage(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS));
        };
      });
    } catch {
      // 2. Fall back to LocalStorage
      return this.getFromLocalStorage(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS);
    }
  }

  /**
   * Saves or updates an animal record (persists to both IndexedDB & LocalStorage)
   */
  async saveAnimal(animal: UniversalAnimalRecord): Promise<void> {
    // Save to LocalStorage immediately
    const existing = this.getFromLocalStorage<UniversalAnimalRecord[]>(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS);
    const index = existing.findIndex((a) => a.id === animal.id);
    if (index >= 0) {
      existing[index] = animal;
    } else {
      existing.unshift(animal);
    }
    this.saveToLocalStorage(LS_ANIMALS_KEY, existing);
    localStorage.setItem(LS_LAST_SYNC_KEY, new Date().toISOString());

    // Save to IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction('animals', 'readwrite');
      tx.objectStore('animals').put(animal);
    } catch (e) {
      console.warn('[VetOfflineStorage] IndexedDB saveAnimal failed, preserved in LocalStorage:', e);
    }
  }

  /**
   * Deletes an animal record
   */
  async deleteAnimal(animalId: string): Promise<void> {
    const existing = this.getFromLocalStorage<UniversalAnimalRecord[]>(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS);
    const updated = existing.filter((a) => a.id !== animalId);
    this.saveToLocalStorage(LS_ANIMALS_KEY, updated);

    try {
      const db = await openDB();
      const tx = db.transaction('animals', 'readwrite');
      tx.objectStore('animals').delete(animalId);
    } catch (e) {
      console.warn('[VetOfflineStorage] IndexedDB deleteAnimal failed:', e);
    }
  }

  // ==================== CONSULTATION SUMMARIES API ====================

  /**
   * Retrieves previous consultation summaries (optionally filtered by animalId)
   */
  async getConsultationSummaries(animalId?: string): Promise<VetConsultationSummary[]> {
    let allSummaries: VetConsultationSummary[] = [];

    // Try IndexedDB
    try {
      const db = await openDB();
      allSummaries = await new Promise<VetConsultationSummary[]>((resolve) => {
        const tx = db.transaction('consultations', 'readonly');
        const store = tx.objectStore('consultations');
        const req = store.getAll();
        req.onsuccess = () => {
          if (req.result && req.result.length > 0) {
            this.saveToLocalStorage(LS_CONSULTATIONS_KEY, req.result);
            resolve(req.result);
          } else {
            resolve(this.getFromLocalStorage(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES));
          }
        };
        req.onerror = () => {
          resolve(this.getFromLocalStorage(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES));
        };
      });
    } catch {
      allSummaries = this.getFromLocalStorage(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES);
    }

    // Sort by newest first
    allSummaries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    if (animalId && animalId !== 'all') {
      return allSummaries.filter((s) => s.animalId === animalId);
    }
    return allSummaries;
  }

  /**
   * Saves a new or updated consultation summary into offline storage
   */
  async saveConsultationSummary(summary: VetConsultationSummary): Promise<void> {
    // Save to LocalStorage immediately
    const existing = this.getFromLocalStorage<VetConsultationSummary[]>(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES);
    const index = existing.findIndex((s) => s.id === summary.id);
    if (index >= 0) {
      existing[index] = summary;
    } else {
      existing.unshift(summary);
    }
    this.saveToLocalStorage(LS_CONSULTATIONS_KEY, existing);
    localStorage.setItem(LS_LAST_SYNC_KEY, new Date().toISOString());

    // Save to IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction('consultations', 'readwrite');
      tx.objectStore('consultations').put(summary);
    } catch (e) {
      console.warn('[VetOfflineStorage] IndexedDB saveConsultationSummary failed, preserved in LocalStorage:', e);
    }
  }

  // ==================== CHAT SESSIONS CACHING ====================

  /**
   * Retrieves cached chat history for an animal or universal session
   */
  async getAnimalChatHistory(animalId: string): Promise<VetChatMessage[]> {
    // Check localStorage fast mirror first
    const allChats = this.getFromLocalStorage<Record<string, any[]>>(LS_CHATS_KEY, {});
    const rawList = allChats[animalId];
    if (Array.isArray(rawList) && rawList.length > 0) {
      return rawList.map((m) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }));
    }

    // Check IndexedDB
    try {
      const db = await openDB();
      return await new Promise<VetChatMessage[]>((resolve) => {
        const tx = db.transaction('chats', 'readonly');
        const store = tx.objectStore('chats');
        const req = store.get(animalId);
        req.onsuccess = () => {
          if (req.result && Array.isArray(req.result.messages)) {
            const parsed = req.result.messages.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp),
            }));
            resolve(parsed);
          } else {
            resolve([]);
          }
        };
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }

  /**
   * Saves chat history for an animal or universal session
   */
  async saveAnimalChatHistory(animalId: string, messages: VetChatMessage[]): Promise<void> {
    if (!animalId || !Array.isArray(messages)) return;

    // Serialize dates for storage
    const serializable = messages.slice(-50).map((m) => ({
      ...m,
      timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : String(m.timestamp),
    }));

    // LocalStorage
    const allChats = this.getFromLocalStorage<Record<string, any[]>>(LS_CHATS_KEY, {});
    allChats[animalId] = serializable;
    this.saveToLocalStorage(LS_CHATS_KEY, allChats);

    // IndexedDB
    try {
      const db = await openDB();
      const tx = db.transaction('chats', 'readwrite');
      tx.objectStore('chats').put({ animalId, messages: serializable, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('[VetOfflineStorage] IndexedDB saveAnimalChatHistory failed:', e);
    }
  }

  /**
   * Clears chat history for an animal
   */
  async clearAnimalChatHistory(animalId: string): Promise<void> {
    const allChats = this.getFromLocalStorage<Record<string, any[]>>(LS_CHATS_KEY, {});
    delete allChats[animalId];
    this.saveToLocalStorage(LS_CHATS_KEY, allChats);

    try {
      const db = await openDB();
      const tx = db.transaction('chats', 'readwrite');
      tx.objectStore('chats').delete(animalId);
    } catch (e) {
      console.warn('[VetOfflineStorage] IndexedDB clearAnimalChatHistory failed:', e);
    }
  }

  // ==================== OFFLINE STATUS & METRICS ====================

  /**
   * Returns cache stats (number of animals, consultations, last sync time)
   */
  getCacheMetrics(): {
    animalsCount: number;
    consultationsCount: number;
    lastSyncFormatted: string;
    isIndexedDBSupported: boolean;
  } {
    const animals = this.getFromLocalStorage<any[]>(LS_ANIMALS_KEY, SAMPLE_ANIMAL_RECORDS);
    const consults = this.getFromLocalStorage<any[]>(LS_CONSULTATIONS_KEY, PRE_SEEDED_CONSULTATION_SUMMARIES);
    const lastSync = localStorage.getItem(LS_LAST_SYNC_KEY) || new Date().toISOString();

    const dateObj = new Date(lastSync);
    const lastSyncFormatted = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      : 'Active';

    return {
      animalsCount: animals.length,
      consultationsCount: consults.length,
      lastSyncFormatted,
      isIndexedDBSupported: typeof window !== 'undefined' && !!window.indexedDB,
    };
  }
}

export const vetOfflineStorage = new VetOfflineStorageManager();
