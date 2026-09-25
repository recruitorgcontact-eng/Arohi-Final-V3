// Screen 1: Arohi VetMitra Home Portal matching Mockup 1
import React from 'react';
import { 
  PhoneCall, Stethoscope, Camera, Mic, ChevronRight, 
  AlertTriangle, ShieldCheck, Heart, Sparkles, ArrowRight
} from 'lucide-react';
import { VetSpecies, VetLanguage } from '../types';
import { VET_STOCK_IMAGES } from '../data/vetStockImages';

interface Props {
  activeSpecies: VetSpecies;
  onSelectSpecies: (species: VetSpecies) => void;
  language: VetLanguage;
  onStartConsult: (presetQuery?: string) => void;
  onStartVoiceCall: () => void;
  onOpenScanner: (mode?: 'animal' | 'milk' | 'lab') => void;
  onOpenEmergency: () => void;
  onViewPassport: () => void;
  onViewHistory?: () => void;
  onOpenCommunity?: () => void;
  onOpenFeed?: () => void;
  onOpenTmrSilage?: () => void;
  onOpenPoultrySchemes?: () => void;
  onOpenSixProblems?: () => void;
}

const SPECIES_HERO_CONFIG: Record<VetSpecies, {
  image: string;
  alt: string;
  headlineEn: string;
  headlineOr: string;
  subtextEn: string;
  subtextOr: string;
  promptPlaceholderEn: string;
  promptPlaceholderOr: string;
  taglineEn: string;
  taglineOr: string;
}> = {
  cattle: {
    image: VET_STOCK_IMAGES.cattleJersey,
    alt: 'Dairy Cattle & Cow',
    headlineEn: "Tell me what's happening with your cow or cattle today...",
    headlineOr: 'ଆପଣଙ୍କ ଗାଈ ବା ମଇଁଷିର କଣ ସମସ୍ୟା ଅଛି କୁହନ୍ତୁ...',
    subtextEn: 'Milk drop, rumination / cud chewing, mastitis check, or NASEM ration balance — Arohi is ready.',
    subtextOr: 'କ୍ଷୀର କମିବା, ଜାବର କାଟିବା, ଥନ ଫୁଲିବା (ମାଷ୍ଟାଇଟିସ୍) ବା NASEM ରେସନ୍ ସନ୍ତୁଳନ — ଆରୋହୀ ପ୍ରସ୍ତୁତ।',
    promptPlaceholderEn: 'Talk to Arohi about your cow or buffalo...',
    promptPlaceholderOr: 'ଆରୋହୀ ସହିତ ଗାଈ କିମ୍ବା ମଇଁଷି ସମ୍ପର୍କରେ କଥା ହୁଅନ୍ତୁ...',
    taglineEn: 'Dairy & Cattle Care',
    taglineOr: 'ଦୁଗ୍ଧ ଓ ଗୋ-ପାଳନ ଯତ୍ନ',
  },
  goat: {
    image: VET_STOCK_IMAGES.goatPortrait,
    alt: 'Goat & Sheep',
    headlineEn: "Tell me what's happening with your goats or sheep today...",
    headlineOr: 'ଆପଣଙ୍କ ଛେଳି ବା ମେଣ୍ଢାର କଣ ସମସ୍ୟା ଅଛି କୁହନ୍ତୁ...',
    subtextEn: 'Rumen bloat, PPR vaccination, bottle jaw anemia, kid care, or weight gain diet — Arohi is ready.',
    subtextOr: 'ପେଟ ଫୁଲିବା (Bloat), PPR ଟିକାକରଣ, ବୋତଲ ଜଡ୍ କୃମି, ଛୁଆ ଯତ୍ନ ବା ଓଜନ ବୃଦ୍ଧି — ଆରୋହୀ ପ୍ରସ୍ତୁତ।',
    promptPlaceholderEn: 'Talk to Arohi about your goats or sheep...',
    promptPlaceholderOr: 'ଆରୋହୀ ସହିତ ଛେଳି ବା ମେଣ୍ଢା ସମ୍ପର୍କରେ କଥା ହୁଅନ୍ତୁ...',
    taglineEn: 'Goat & Sheep Care',
    taglineOr: 'ଛେଳି ଓ ମେଣ୍ଢା ପାଳନ ଯତ୍ନ',
  },
  dog: {
    image: VET_STOCK_IMAGES.dogLabrador,
    alt: 'Dog & Canine Care',
    headlineEn: "Tell me what's happening with your dog today...",
    headlineOr: 'ଆପଣଙ୍କ କୁକୁରର କଣ ସମସ୍ୟା ଅଛି କୁହନ୍ତୁ...',
    subtextEn: 'Vomiting & loose stool, tick prevention, parvo alert, skin itching, or core vaccines — Arohi is ready.',
    subtextOr: 'ବାନ୍ତି ଓ ପତଳା ଝାଡ଼ା, ବାହାଙ୍ଗିଆ (Ticks), ପାର୍ଭୋଭାଇରସ୍ ସତର୍କତା, ଚର୍ମ କୁଣ୍ଡାଇ ବା ଟିକା — ଆରୋହୀ ପ୍ରସ୍ତୁତ।',
    promptPlaceholderEn: 'Talk to Arohi about your dog or puppy...',
    promptPlaceholderOr: 'ଆରୋହୀ ସହିତ କୁକୁର ବା ଛୁଆ ସମ୍ପର୍କରେ କଥା ହୁଅନ୍ତୁ...',
    taglineEn: 'Canine Health & Nutrition',
    taglineOr: 'କୁକୁର ସ୍ୱାସ୍ଥ୍ୟ ଓ ଯତ୍ନ',
  },
  cat: {
    image: VET_STOCK_IMAGES.catPortrait,
    alt: 'Cat & Feline Care',
    headlineEn: "Tell me what's happening with your cat today...",
    headlineOr: 'ଆପଣଙ୍କ ବିରାଡ଼ିର କଣ ସମସ୍ୟା ଅଛି କୁହନ୍ତୁ...',
    subtextEn: 'Urinary straining (FLUTD), hairballs & vomiting, taurine nutrition, hydration, or Tricat vaccines — Arohi is ready.',
    subtextOr: 'ମୂତ୍ର ସମସ୍ୟା (FLUTD), ହେୟାରବଲ୍ ବାନ୍ତି, ଟରିନ୍ ପୋଷଣ, ପାଣି ପିଇବା ବା ଟ୍ରାଇକ୍ୟାଟ୍ ଟିକା — ଆରୋହୀ ପ୍ରସ୍ତୁତ।',
    promptPlaceholderEn: 'Talk to Arohi about your cat or kitten...',
    promptPlaceholderOr: 'ଆରୋହୀ ସହିତ ବିରାଡ଼ି ସମ୍ପର୍କରେ କଥା ହୁଅନ୍ତୁ...',
    taglineEn: 'Feline Health & Wellness',
    taglineOr: 'ବିରାଡ଼ି ସ୍ୱାସ୍ଥ୍ୟ ଓ ଯତ୍ନ',
  },
};

const SPECIES_COMMON_CONCERNS: Record<VetSpecies, Array<{
  id: string;
  titleEn: string;
  titleOr: string;
  icon: string;
  query: string;
  bg: string;
}>> = {
  cattle: [
    {
      id: 'off_feed',
      titleEn: 'Off-feed / No Cudding',
      titleOr: 'ଜାବର କାଟୁନାହିଁ',
      icon: '🌱',
      query: 'ମୋ ଗାଈ ଆଜି ଠିକ୍‌ରେ ଖାଉନାହିଁ ଏବଂ ଜାବର କାଟୁନାହିଁ। କଣ କରିବାକୁ ହେବ?',
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-950',
    },
    {
      id: 'milk_drop',
      titleEn: 'Milk Yield Drop',
      titleOr: 'ଦୁଧ କମିଯିବା',
      icon: '🥛',
      query: 'ମୋ ଗାଈର ଦୁଧ ୧୨ ଲିଟରରୁ ୯ ଲିଟରକୁ କମିଯାଇଛି। ଦୈନିକ ରେସନ୍ ଓ ଖାଦ୍ୟରେ କଣ ବଦଳାଇବି?',
      bg: 'bg-blue-50 border-blue-100 text-blue-950',
    },
    {
      id: 'mastitis',
      titleEn: 'Swollen Udder (Mastitis)',
      titleOr: 'ମାଷ୍ଟାଇଟିସ୍',
      icon: '🐄',
      query: 'ଗାଈର ଥନ ଫୁଲିଯାଇଛି ଏବଂ ଲାଲ୍ ଦିଶୁଛି। ମାଷ୍ଟାଇଟିସ୍ ପରୀକ୍ଷା ଓ ପ୍ରାଥମିକ ଉପଚାର କଣ?',
      bg: 'bg-rose-50 border-rose-100 text-rose-950',
    },
    {
      id: 'scours',
      titleEn: 'Calf Scours / Diarrhea',
      titleOr: 'ବାଛୁରୀ ଝାଡ଼ା',
      icon: '🐂',
      query: 'ଛୋଟ ବାଛୁରୀର ପତଳା ଝାଡ଼ା ହେଉଛି ଏବଂ ସେ ଛିଡ଼ା ହୋଇପାରୁନାହିଁ। କଣ ତୁରନ୍ତ କରିବି?',
      bg: 'bg-amber-50 border-amber-100 text-amber-950',
    },
    {
      id: 'bloat',
      titleEn: 'Bloat / Gas Swelling',
      titleOr: 'ପେଟ ଫୁଲିବା',
      icon: '🫁',
      query: 'ପଶୁର ବାମ ପଟ ପେଟ ଢୋଲ ପରି ଫୁଲିଯାଇଛି ଓ ନିଶ୍ୱାସ ନେବାରେ କଷ୍ଟ ହେଉଛି (Acute Bloat)।',
      bg: 'bg-red-50 border-red-100 text-red-950',
    },
  ],
  goat: [
    {
      id: 'acute_bloat',
      titleEn: 'Acute Bloat / Gas',
      titleOr: 'ପେଟ ଫୁଲିବା',
      icon: '🌾',
      query: 'ମୋ ଛେଳିର ପେଟ ଢୋଲ ପରି ଫୁଲିଯାଇଛି ଏବଂ ସେ ନିଶ୍ୱାସ ନେଇପାରୁନାହିଁ। ତୁରନ୍ତ କଣ ଜରୁରୀ ଉପଚାର କରିବି?',
      bg: 'bg-red-50 border-red-100 text-red-950',
    },
    {
      id: 'ppr_fever',
      titleEn: 'PPR Fever & Sores',
      titleOr: 'ପିପିଆର (PPR)',
      icon: '💉',
      query: 'ଛେଳିକୁ ତୀବ୍ର ଜ୍ୱର ସହ ପାଟିରୁ ଲାଳ ଓ ଘା ହୋଇଛି (PPR ଲକ୍ଷଣ)। କିପରି ସୁରକ୍ଷା ଓ ଚିକିତ୍ସା କରିବି?',
      bg: 'bg-rose-50 border-rose-100 text-rose-950',
    },
    {
      id: 'bottle_jaw',
      titleEn: 'Bottle Jaw / Worms',
      titleOr: 'ତଳ ମୁଣ୍ଡ ଫୁଲିବା',
      icon: '🐐',
      query: 'ଛେଳିର ତଳ ମୁଣ୍ଡ/କଣ୍ଠ ତଳେ ପାଣି ଜମି ଫୁଲିଯାଇଛି (Bottle Jaw)। କୃମିନାଶକ ଡୋଜ୍ କଣ ଦେବି?',
      bg: 'bg-amber-50 border-amber-100 text-amber-950',
    },
    {
      id: 'kid_scours',
      titleEn: 'Kid Scours & Care',
      titleOr: 'ଛୁଆଙ୍କ ଝାଡ଼ା',
      icon: '🍼',
      query: 'ଛୋଟ ଛେଳି ଛୁଆର ହଳଦିଆ ପତଳା ଝାଡ଼ା ହେଉଛି। ଡିହାଇଡ୍ରେସନ୍ ଓ ORS କିପରି ଦେବି?',
      bg: 'bg-blue-50 border-blue-100 text-blue-950',
    },
    {
      id: 'weight_gain',
      titleEn: 'Weight Gain Nutrition',
      titleOr: 'ଓଜନ ବୃଦ୍ଧି ଖାଦ୍ୟ',
      icon: '🌿',
      query: 'ଛେଳିର ସୁସ୍ଥ ଓଜନ ବୃଦ୍ଧି ପାଇଁ ଶସ୍ତା ଦାନା ଓ ସୁବାବୁଲ/ନେପିୟର ଖାଦ୍ୟ ଯୋଜନା ଦିଅନ୍ତୁ।',
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-950',
    },
  ],
  dog: [
    {
      id: 'vomit_diarrhea',
      titleEn: 'Vomiting & Diarrhea',
      titleOr: 'ବାନ୍ତି ଓ ଝାଡ଼ା',
      icon: '🤢',
      query: 'ମୋ କୁକୁର ବାନ୍ତି ଓ ପତଳା ଝାଡ଼ା କରୁଛି। ତୁରନ୍ତ କଣ ପ୍ରାଥମିକ ଚିକିତ୍ସା ଓ ORS ଦେବି?',
      bg: 'bg-rose-50 border-rose-100 text-rose-950',
    },
    {
      id: 'ticks_fleas',
      titleEn: 'Ticks & Skin Rash',
      titleOr: 'ବାହାଙ୍ଗିଆ ଓ କୁଣ୍ଡାଇ',
      icon: '🕷️',
      query: 'କୁକୁର ଦେହରେ ବାହାଙ୍ଗିଆ (Ticks) ହୋଇଛି ଏବଂ ଚର୍ମ କୁଣ୍ଡାଉଛି। କିପରି ସୁରକ୍ଷିତ ଚିକିତ୍ସା କରିବି?',
      bg: 'bg-amber-50 border-amber-100 text-amber-950',
    },
    {
      id: 'parvo_alert',
      titleEn: 'Parvo Red Flags',
      titleOr: 'ପାର୍ଭୋ ସତର୍କତା',
      icon: '⚠️',
      query: 'କୁକୁର ଛୁଆ ପାଇଁ ପାର୍ଭୋଭାଇରସ୍ ସତର୍କତା ଏବଂ ଡିଏଚପିପିଆଇ (DHPPi) ଟିକାକରଣ ନିୟମ କଣ?',
      bg: 'bg-red-50 border-red-100 text-red-950',
    },
    {
      id: 'dog_diet',
      titleEn: 'Diet & Toxic Foods',
      titleOr: 'ଖାଦ୍ୟ ଚାର୍ଟ',
      icon: '🍗',
      query: 'କୁକୁର ପାଇଁ କେଉଁ ଖାଦ୍ୟ ବିଷାକ୍ତ ଏବଂ ଘରେ କିପରି ସୁସ୍ଥ ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ଦାନା ତିଆରି କରିବି?',
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-950',
    },
    {
      id: 'dog_vaccine',
      titleEn: 'Core Vaccines & ARV',
      titleOr: 'ଟିକା ଓ କୃମିନାଶକ',
      icon: '💉',
      query: 'କୁକୁର ପାଇଁ ରେବିଜ୍ ଏବଂ ୭-ଇନ୍-୧ ଟିକା ଏବଂ କୃମି ଔଷଧ ଦେବାର ସଠିକ୍ ସମୟ କଣ?',
      bg: 'bg-blue-50 border-blue-100 text-blue-950',
    },
  ],
  cat: [
    {
      id: 'cat_urinary',
      titleEn: 'Urinary Straining (FLUTD)',
      titleOr: 'ମୂତ୍ର ସମସ୍ୟା (FLUTD)',
      icon: '🚽',
      query: 'ମୋ ବିରାଡ଼ି ପରିସ୍ରା କରିବାରେ କଷ୍ଟ ପାଉଛି ବା ବାରମ୍ବାର ଲିଟର ବକ୍ସ ଯାଉଛି। ଏହା କଣ ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି?',
      bg: 'bg-red-50 border-red-100 text-red-950',
    },
    {
      id: 'cat_hairballs',
      titleEn: 'Hairballs & Vomiting',
      titleOr: 'ହେୟାରବଲ୍ ଓ ବାନ୍ତି',
      icon: '🧶',
      query: 'ମୋ ବିରାଡ଼ି ବାନ୍ତି କରୁଛି ଓ ଲୋମ ବାହାରୁଛି। ଏଥିପାଇଁ କି ପ୍ରକାର ଖାଦ୍ୟ ଓ ପ୍ରାଥମିକ ଚିକିତ୍ସା ଦରକାର?',
      bg: 'bg-amber-50 border-amber-100 text-amber-950',
    },
    {
      id: 'cat_taurine',
      titleEn: 'Taurine & Diet Plan',
      titleOr: 'ଟରିନ୍ ଓ ସନ୍ତୁଳିତ ଖାଦ୍ୟ',
      icon: '🐟',
      query: 'ବିରାଡ଼ି ପାଇଁ ଟରିନ୍ (Taurine) ଓ ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ସନ୍ତୁଳିତ ଖାଦ୍ୟ କିପରି ପ୍ରସ୍ତୁତ କରିବି?',
      bg: 'bg-emerald-50 border-emerald-100 text-emerald-950',
    },
    {
      id: 'cat_fleas',
      titleEn: 'Fleas & Ear Mites',
      titleOr: 'ଚର୍ମ କୁଣ୍ଡାଇ ଓ ପୋକ',
      icon: '🐱',
      query: 'ବିରାଡ଼ି କାନ କୁଣ୍ଡାଉଛି ଏବଂ ଦେହରେ ଫ୍ଲି (Fleas) ଅଛି। କେଉଁ ସୁରକ୍ଷିତ ଔଷଧ ଦେବି?',
      bg: 'bg-purple-50 border-purple-100 text-purple-950',
    },
    {
      id: 'cat_vaccine',
      titleEn: 'Tricat & Core Vaccines',
      titleOr: 'ଟ୍ରାଇକ୍ୟାଟ୍ ଟିକା',
      icon: '💉',
      query: 'ବିରାଡ଼ି ପାଇଁ ଟ୍ରାଇଭେକ୍ (Tricat) ଓ ରେବିଜ୍ ଟିକା ଏବଂ କୃମିନାଶକ ସମୟସାରଣୀ କୁହନ୍ତୁ।',
      bg: 'bg-blue-50 border-blue-100 text-blue-950',
    },
  ],
};

export const VetMitraHomeView: React.FC<Props> = ({
  activeSpecies,
  onSelectSpecies,
  language,
  onStartConsult,
  onStartVoiceCall,
  onOpenScanner,
  onOpenEmergency,
  onViewPassport,
  onViewHistory,
  onOpenCommunity,
  onOpenFeed,
  onOpenTmrSilage,
  onOpenPoultrySchemes,
  onOpenSixProblems,
}) => {
  const isOdia = language === 'or';

  const heroConfig = SPECIES_HERO_CONFIG[activeSpecies] || SPECIES_HERO_CONFIG.cattle;
  const currentConcerns = SPECIES_COMMON_CONCERNS[activeSpecies] || SPECIES_COMMON_CONCERNS.cattle;

  const speciesQuickQueries = {
    cattle: {
      health: isOdia ? 'ମୋ ଗାଈର ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ କରିବାକୁ ଚାହେଁ' : 'Check cow health',
      nutrition: isOdia ? 'ଦୈନିକ NASEM ଖାଦ୍ୟ ରେସନ୍ ପ୍ଲାନ୍ ଦିଅନ୍ତୁ' : 'Calculate daily dairy ration',
    },
    goat: {
      health: isOdia ? 'ମୋ ଛେଳିର ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ ଚାହେଁ' : 'Check goat health',
      nutrition: isOdia ? 'ଛେଳିଙ୍କ ପାଇଁ ଶସ୍ତା ଦାନା ଓ ସୁବାବୁଲ ରାସନ୍ ପ୍ଲାନ୍ ଦିଅନ୍ତୁ' : 'Goat feeding & ration plan',
    },
    dog: {
      health: isOdia ? 'ମୋ କୁକୁରର ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ ଚାହେଁ' : 'Check dog health',
      nutrition: isOdia ? 'କୁକୁର ପାଇଁ ସୁସ୍ଥ ପ୍ରୋଟିନ୍ ଯୁକ୍ତ ଖାଦ୍ୟ ଚାର୍ଟ ଦିଅନ୍ତୁ' : 'Dog diet & nutrition chart',
    },
    cat: {
      health: isOdia ? 'ମୋ ବିରାଡ଼ିର ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ ଚାହେଁ' : 'Check cat health',
      nutrition: isOdia ? 'ବିରାଡ଼ି ପାଇଁ ଟରିନ୍ ଓ ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଚାର୍ଟ ଦିଅନ୍ତୁ' : 'Cat nutrition & taurine plan',
    },
  }[activeSpecies] || {
    health: isOdia ? 'ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ ଚାହେଁ' : 'Check animal health',
    nutrition: isOdia ? 'ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଯୋଜନା' : 'Balanced diet plan',
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in-50 duration-300">
      {/* Hero Welcome Card with Real Livestock Photography */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-100 shadow-sm">
        {/* Background Decorative Gradient & Tagline */}
        <div className="absolute right-3 top-3 text-right hidden sm:block">
          <span className="text-[11px] font-serif italic text-emerald-800/80 font-medium block">
            Better Animals
          </span>
          <span className="text-[11px] font-serif italic text-emerald-800/80 font-medium block">
            Brighter Tomorrows
          </span>
        </div>

        <div className="p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-left w-full md:w-1/2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-900 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              <span>{isOdia ? heroConfig.taglineOr : heroConfig.taglineEn}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-950 font-sans">
              {isOdia ? 'ନମସ୍କାର!' : 'Namaskar!'}
            </h2>
            <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
              {isOdia ? heroConfig.headlineOr : heroConfig.headlineEn}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isOdia ? heroConfig.subtextOr : heroConfig.subtextEn}
            </p>
          </div>

          {/* Real Photo Montage Banner dynamically matching selected species */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white max-w-sm w-full h-44 sm:h-52 bg-slate-100">
              <img
                src={heroConfig.image}
                alt={heroConfig.alt}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {/* Compact floating live status pill without dark shadow over photo */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide">
                  {isOdia ? '୨୪x୭ ଲାଇଭ୍ AI ଚିକିତ୍ସକ ଉପଲବ୍ଧ' : '24x7 Live AI Veterinary Available'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Species Tactile Switcher Cards (Matching Mockup 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { id: 'cattle' as VetSpecies, label: 'Dairy & Cattle', odia: 'ଗାଈ ଓ ମଇଁଷି', img: VET_STOCK_IMAGES.cattleJersey, icon: '🐄' },
          { id: 'goat' as VetSpecies, label: 'Goats & Sheep', odia: 'ଛେଳି ଓ ମେଣ୍ଢା', img: VET_STOCK_IMAGES.goatPortrait, icon: '🐐' },
          { id: 'dog' as VetSpecies, label: 'Dogs', odia: 'କୁକୁର', img: VET_STOCK_IMAGES.dogLabrador, icon: '🐕' },
          { id: 'cat' as VetSpecies, label: 'Cats', odia: 'ବିରାଡ଼ି', img: VET_STOCK_IMAGES.catPortrait, icon: '🐈' },
        ].map((sp) => {
          const isSelected = activeSpecies === sp.id;
          return (
            <button
              key={sp.id}
              onClick={() => onSelectSpecies(sp.id)}
              className={`relative overflow-hidden rounded-2xl p-3 flex flex-col items-center justify-between text-center transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-900/20 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-white/60 shadow-sm">
                <img src={sp.img} alt={sp.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold block">{sp.label}</span>
              <span className={`text-[11px] block mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                {sp.odia}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating Prompt & Voice Bar (Talk to Arohi...) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3 sm:p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <button
            onClick={() => onStartConsult()}
            className="flex-1 text-left px-3 py-2 text-slate-500 text-sm bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors truncate"
          >
            {isOdia ? heroConfig.promptPlaceholderOr : heroConfig.promptPlaceholderEn}
          </button>
          <button
            onClick={() => onOpenScanner('animal')}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shrink-0"
            title="Scan animal photo or milk slip"
          >
            <Camera className="w-5 h-5" />
          </button>
          <button
            onClick={onStartVoiceCall}
            className="w-11 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-800/30 transition-transform active:scale-95 shrink-0"
            title="Live Voice Call"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] text-slate-500 font-semibold uppercase shrink-0">
            {isOdia ? 'ତ୍ୱରିତ ପ୍ରଶ୍ନ:' : 'Quick:'}
          </span>
          <button
            onClick={() => onStartConsult(speciesQuickQueries.health)}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ସ୍ୱାସ୍ଥ୍ୟ ପରାମର୍ଶ' : 'Health consultation'}
          </button>
          <button
            onClick={() => {
              if (onOpenFeed) {
                onOpenFeed();
              } else {
                onStartConsult(speciesQuickQueries.nutrition);
              }
            }}
            className="px-3 py-1 rounded-xl bg-emerald-100/70 hover:bg-emerald-200/80 text-emerald-900 border border-emerald-300 font-bold shrink-0 whitespace-nowrap flex items-center gap-1"
          >
            <span>🌾</span>
            <span>
              {activeSpecies === 'cattle' 
                ? (isOdia ? 'ରେସନ୍ ଷ୍ଟୁଡିଓ (NASEM)' : 'Dairy Ration Studio')
                : (isOdia ? 'ସନ୍ତୁଳିତ ଖାଦ୍ୟ ଯୋଜନା' : 'Feed & Nutrition Studio')}
            </span>
          </button>
          <button
            onClick={() => onViewPassport()}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ଟିକାକରଣ ରେକର୍ଡ' : 'Vaccinations'}
          </button>
          {onViewHistory && (
            <button
              onClick={onViewHistory}
              className="px-3 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold shrink-0 whitespace-nowrap flex items-center gap-1"
            >
              <span>{isOdia ? 'ପୂର୍ବ ପରାମର୍ଶ (Offline)' : 'Past Consultations (Offline)'}</span>
            </button>
          )}
          <button
            onClick={() => onOpenScanner('lab')}
            className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium shrink-0 whitespace-nowrap"
          >
            {isOdia ? 'ରିପୋର୍ଟ ଅପଲୋଡ୍' : 'Upload reports'}
          </button>
        </div>
      </div>

      {/* Prominent Emergency 1962 Banner (Matching Mockup 1) */}
      <div 
        onClick={onOpenEmergency}
        className="cursor-pointer rounded-3xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white p-4 sm:p-5 shadow-lg shadow-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black tracking-wide">
                ଜରୁରୀକାଳୀନ ପଶୁ ହେଲ୍ପଲାଇନ୍ ୧୯୬୨
              </span>
            </div>
            <p className="text-xs text-rose-100 font-medium">
              National Animal Helpline 1962 • (Toll-Free 24x7 • Veterinary Ambulance)
            </p>
          </div>
        </div>

        <a 
          href="tel:1962"
          onClick={(e) => e.stopPropagation()}
          className="px-5 py-2.5 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-sm flex items-center justify-center gap-2 shadow-sm shrink-0 self-start sm:self-auto no-underline"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 1962</span>
        </a>
      </div>

      {/* Common Concerns Card Container (Wrapped in clean white surface for perfect contrast and readability) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-3.5 sm:p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              {isOdia ? 'ସାଧାରଣ ସମସ୍ୟା (Common Concerns)' : 'Common Concerns'}
            </h3>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
              {activeSpecies}
            </span>
          </div>
          <button
            onClick={() => onStartConsult()}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>{isOdia ? 'ସବୁ ଦେଖନ୍ତୁ' : 'See All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {currentConcerns.map((c) => (
            <button
              key={c.id}
              onClick={() => onStartConsult(c.query)}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 transition-all hover:shadow-md cursor-pointer ${c.bg}`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-bold leading-tight line-clamp-1">
                {c.titleEn}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">
                {c.titleOr}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pet Community & Industry Showcase Banner */}
      {onOpenCommunity && (
        <div 
          onClick={onOpenCommunity}
          className="cursor-pointer rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-4 sm:p-5 shadow-lg border border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-transform hover:scale-[1.01] active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shrink-0 group-hover:bg-emerald-500/30 transition-colors">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                  Pet Social Media & Products
                </span>
                <span className="text-emerald-400 text-xs font-bold">• New</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                {isOdia ? 'ପୋଷା ପଶୁ ସାମାଜିକ କମ୍ୟୁନିଟି ଓ ଉତ୍ପାଦ ବଜାର' : 'Pet Parents Community & Industry Showcase'}
              </h4>
              <p className="text-xs text-emerald-100/80">
                {isOdia
                  ? 'ପୋଷ୍ଟ ଓ ଫଟୋ ସେୟାର କରନ୍ତୁ (ପବ୍ଲିକ୍/ପ୍ରାଇଭେଟ୍), ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ ଡାଏରୀ ଲେଖନ୍ତୁ ଏବଂ ଯାଞ୍ଚିତ ଖାଦ୍ୟ ଓ ସେବା ଦେଖନ୍ତୁ।'
                  : 'Share public/private photos, keep a pet diary, and discover certified foods, grooming & clinics.'}
              </p>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpenCommunity();
            }}
            className="px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shrink-0 self-start sm:self-auto transition-colors"
          >
            <span>{isOdia ? 'କମ୍ୟୁନିଟି ଦେଖନ୍ତୁ' : 'Explore Community'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Universal Feed & Ration Studio Feature Banner */}
      {onOpenFeed && (
        <div
          onClick={onOpenFeed}
          className="cursor-pointer rounded-3xl bg-gradient-to-r from-amber-900/80 via-emerald-900/90 to-teal-950 text-white p-4 sm:p-5 shadow-lg border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-transform hover:scale-[1.01] active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0 group-hover:bg-amber-500/30 transition-colors">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  Ration & Feeding Engine
                </span>
                <span className="text-emerald-400 text-xs font-bold">• 4 Species</span>
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                {isOdia ? 'ପଶୁ ଖାଦ୍ୟ ଓ ରାସନ୍ ଷ୍ଟୁଡିଓ (Feed & Ration Studio)' : 'Universal Feed & Ration Formulation Studio'}
              </h4>
              <p className="text-xs text-amber-100/80">
                {isOdia
                  ? 'ଗାଈ (NASEM ୨୦୨୧), ଛେଳି (ଓଜନ ବୃଦ୍ଧି), କୁକୁର (କ୍ୟାଲୋରୀ/ପ୍ରୋଟିନ୍) ଓ ବିରାଡ଼ି (ଟରିନ୍) ପାଇଁ ବୈଜ୍ଞାନିକ ଖାଦ୍ୟ ଯୋଜନା।'
                  : 'Formulate precision rations: NASEM dairy balancer, goat fattening diets, canine calories, and feline carnivore plans.'}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenFeed();
            }}
            className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shrink-0 self-start sm:self-auto transition-colors"
          >
            <span>{isOdia ? 'ରାସନ୍ ଗଣନା କରନ୍ତୁ' : 'Open Feed Studio'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SMILE & Odisha F&ARD Dairy & Poultry Centers */}
      <div className="bg-slate-950/90 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold text-white font-serif tracking-tight">
              {isOdia ? 'ଓଡ଼ିଶା ଦୁଗ୍ଧ ଓ କୁକୁଡ଼ା ପାଳନ ମିଶନ (SMILE & F&ARD)' : 'Odisha Dairy & Poultry Mission (SMILE & F&ARD)'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            Govt & Scientific Protocols
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: TMR & Maize Silage */}
          {onOpenTmrSilage && (
            <div
              onClick={onOpenTmrSilage}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group flex flex-col justify-between space-y-2 hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl">🌽</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    TMR & Silage
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-100 mt-2 group-hover:text-emerald-300 transition-colors">
                  {isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ ମିଶ୍ରିତ ଖାଦ୍ୟ (TMR) ଓ ମକା ସାଇଲେଜ୍' : 'Total Mixed Ration (TMR) & Corn Silage'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {isOdia ? 'ମକା ସାଇଲେଜ୍, ଆଜୋଲା ଓ ସନ୍ତୁଳିତ Ca:P ରେସିପି (୧୦L ଗାଈ ପାଇଁ)' : 'Balanced TMR recipes, Azolla usage, and silage quality testing.'}
                </p>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 pt-1">
                <span>{isOdia ? 'ଷ୍ଟୁଡିଓ ଖୋଲନ୍ତୁ' : 'Open Studio'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Card 2: Odisha Poultry Schemes */}
          {onOpenPoultrySchemes && (
            <div
              onClick={onOpenPoultrySchemes}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/70 to-slate-900 border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between space-y-2 hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl">🐥</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                    50% - 60% Subsidy
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-100 mt-2 group-hover:text-amber-300 transition-colors">
                  {isOdia ? 'ଓଡ଼ିଶା କୁକୁଡ଼ା ପାଳନ ଯୋଜନା (୨୦୨୫-୨୬)' : 'Odisha Poultry Schemes 2025–26'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {isOdia ? 'ବ୍ରଏଲର, ଲେୟାର, ବତକ ଓ ଦାନା ମିଲ୍ ପାଇଁ ସରକାରୀ ସବସିଡି ଗଣନା' : 'Broiler, layer, duck units, and mini feed mills with CDVO process.'}
                </p>
              </div>
              <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1 pt-1">
                <span>{isOdia ? 'ଯୋଜନା ଦେଖନ୍ତୁ' : 'Explore Schemes'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Card 3: 6 Major Dairy Problems Hub */}
          {onOpenSixProblems && (
            <div
              onClick={onOpenSixProblems}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/70 to-slate-900 border border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer group flex flex-col justify-between space-y-2 hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl">🩺</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold">
                    SMILE Training
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-100 mt-2 group-hover:text-blue-300 transition-colors">
                  {isOdia ? 'ଦୁଗ୍ଧଚାଷୀଙ୍କ ୬ଟି ପ୍ରମୁଖ ସମସ୍ୟା ଓ ନିଦାନ' : '6 Major Dairy Problems & Solutions'}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {isOdia ? 'ଖାଦ୍ୟ, ଦୁଧ ହ୍ରାସ, ଥନ ରୋଗ, ପ୍ରଜନନ ଓ ବାଛୁରୀ ଯତ୍ନର ସମାଧାନ' : 'Mastitis, repeat breeding, milk persistency, and calf health.'}
                </p>
              </div>
              <div className="text-[11px] text-blue-400 font-bold flex items-center gap-1 pt-1">
                <span>{isOdia ? 'ସମାଧାନ ଦେଖନ୍ତୁ' : 'View Clinical Hub'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mission Banner with Rural Farmer & Cow Visual */}
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 to-teal-900 text-white relative shadow-md">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1 max-w-md text-left">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Arohi Mission 87 For Livestock</span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold text-white">
              Healthy Animals • Stronger Farmers • Happier Communities
            </h4>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              {isOdia
                ? 'ଓଡ଼ିଶା ତଥା ସାରା ଭାରତର ପଶୁପାଳକ ମାନଙ୍କୁ ସର୍ବୋତ୍ତମ AI ଚିକିତ୍ସା ଓ NASEM ପୋଷଣ ଯୋଗାଇବା ଆମର ଲକ୍ଷ୍ୟ।'
                : 'Democratizing world-class veterinary diagnostics and dairy ration balancing for every rural farmer.'}
            </p>
          </div>

          <button
            onClick={() => onViewPassport()}
            className="px-4 py-2 rounded-2xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-2 hover:bg-emerald-50 transition-colors shrink-0"
          >
            <span>{isOdia ? 'ପାସପୋର୍ଟ ଦେଖନ୍ତୁ' : 'View Animal Passport'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
