// Arohi VetMitra - Multi-Species Veterinary Knowledge Base & Triage Framework
// Covers Cattle (Dairy), Goat, Dog, and Cat

import { VetSpecies } from '../types';

export interface SpeciesProfile {
  id: VetSpecies;
  displayName: string;
  displayNameOdia: string;
  displayNameHindi: string;
  emoji: string;
  normalPhysiology: {
    temperatureC: string;
    heartRateBpm: string;
    respiratoryRateBpm: string;
    gestationDays: string;
  };
  emergencyRedFlags: {
    condition: string;
    conditionOdia: string;
    warningSign: string;
    immediateAction: string;
  }[];
  commonConditions: {
    name: string;
    nameOdia: string;
    probingChecklist: string[];
    screeningTests: string[];
    firstAidSafeGuidance: string;
  }[];
}

export const SPECIES_KNOWLEDGE: Record<VetSpecies, SpeciesProfile> = {
  cattle: {
    id: 'cattle',
    displayName: 'Dairy Cattle & Cow',
    displayNameOdia: 'ଗାଈ ଓ ବାଛୁରୀ (Cattle)',
    displayNameHindi: 'गाय एवं बछड़ा (Dairy Cattle)',
    emoji: '🐄',
    normalPhysiology: {
      temperatureC: '38.5°C – 39.5°C (101.5°F – 103.0°F)',
      heartRateBpm: '48 – 84 beats/min',
      respiratoryRateBpm: '26 – 50 breaths/min',
      gestationDays: '279 – 287 days (~9 months 9 days)',
    },
    emergencyRedFlags: [
      {
        condition: 'Acute Frothy / Free Gas Bloat',
        conditionOdia: 'ପେଟ ଫୁଲିବା (Bloat / Tympany)',
        warningSign: 'Left paralumbar distension drum-tight, mouth open panting, cyanosis',
        immediateAction: 'Keep head elevated, walk gently, call vet immediately for emergency stomach tube.',
      },
      {
        condition: 'Clinical Hypocalcemia (Milk Fever)',
        conditionOdia: 'ସୁତିକା ଜ୍ୱର / ମିଲ୍କ ଫିଭର୍ (Milk Fever)',
        warningSign: 'Cow down after calving, cold ears, S-shaped neck kink, unable to stand',
        immediateAction: 'Do NOT force drench liquids into throat (aspiration risk). Urgent IV calcium borogluconate by vet.',
      },
      {
        condition: 'Pesticide / Organophosphate Poisoning',
        conditionOdia: 'କୀଟନାଶକ ବିଷକ୍ରିୟା (Poisoning)',
        warningSign: 'Profuse salivation, pinpoint pupils, muscle fasciculations, collapse',
        immediateAction: 'Secure the pesticide label/packet safely. Call emergency vet immediately for atropine therapy.',
      },
      {
        condition: 'Severe Neonatal Calf Dehydration',
        conditionOdia: 'ବାଛୁରୀର ଗୁରୁତର ଡିହାଇଡ୍ରେସନ୍',
        warningSign: 'Sunken eyeballs, skin tent > 4 seconds, cold extremities, absent suckle',
        immediateAction: 'Keep calf warm, offer warm oral rehydration solution if suckling; otherwise emergency IV fluids by vet.',
      },
    ],
    commonConditions: [
      {
        name: 'Clinical & Subclinical Mastitis',
        nameOdia: 'ଥନ ପାଚିବା / ମାଷ୍ଟାଇଟିସ୍',
        probingChecklist: ['Is udder quarter hot or firm?', 'Are there clots or flakes in milk?', 'Is milk watery or blood-tinged?'],
        screeningTests: ['California Mastitis Test (CMT)', 'Milk culture & antibiotic sensitivity', 'Somatic Cell Count'],
        firstAidSafeGuidance: 'Strip out affected quarter completely every 2 hours; apply clean cold compress if udder is severely inflamed. Consult vet for targeted intramammary tubes.',
      },
      {
        name: 'Sub-Acute Ruminal Acidosis (SARA)',
        nameOdia: 'ଖଟା ପେଟ / ଏସିଡୋସିସ (Acidosis)',
        probingChecklist: ['Was concentrate increased suddenly?', 'Is dung watery with gas bubbles or undigested grain?', 'Is milk fat dropping?'],
        screeningTests: ['NASEM NDF fiber balance check', 'Rumen fluid pH testing'],
        firstAidSafeGuidance: 'Reduce concentrate feed temporarily. Ensure 4-5 kg chopped dry roughage (paddy straw) is consumed before concentrates. Add sodium bicarbonate (30-50g/day) under guidance.',
      },
      {
        name: 'Nutrient Gap & Low Milk Yield',
        nameOdia: 'ପୋଷଣ ଅଭାବ ଓ କମ୍ କ୍ଷୀର',
        probingChecklist: ['What is daily Dry Matter Intake?', 'Are protein cakes (Soya/Mustard/GNOC) fed?', 'Is mineral mixture given daily?'],
        screeningTests: ['Arohi NASEM 2021 Ration Screening', 'Feed dry matter & crude protein analysis'],
        firstAidSafeGuidance: 'Balance dry matter and crude protein using the Arohi NASEM 2021 Ration Studio.',
      },
    ],
  },
  goat: {
    id: 'goat',
    displayName: 'Goat & Sheep (Small Ruminants)',
    displayNameOdia: 'ଛେଳି ଓ ମେଣ୍ଢା (Goat & Sheep)',
    displayNameHindi: 'बकरी एवं भेड़ (Small Ruminants)',
    emoji: '🐐',
    normalPhysiology: {
      temperatureC: '38.5°C – 40.0°C (101.5°F – 104.0°F)',
      heartRateBpm: '70 – 90 beats/min',
      respiratoryRateBpm: '15 – 30 breaths/min',
      gestationDays: '148 – 152 days (~5 months)',
    },
    emergencyRedFlags: [
      {
        condition: 'Enterotoxemia (Pulpy Kidney)',
        conditionOdia: 'ଇଣ୍ଟେରୋଟକ୍ସେମିଆ / ହଠାତ୍ ମୃତ୍ୟୁ',
        warningSign: 'Convulsions, head thrown backward (opisthotonos), sudden death after lush grain eating',
        immediateAction: 'Urgent vet intervention; isolate remaining herd from rich concentrate immediately.',
      },
      {
        condition: 'Severe Anemia (Haemonchus contortus / Barber Pole Worm)',
        conditionOdia: 'ଅତ୍ୟଧିକ ରକ୍ତହୀନତା ଓ ବୋତଲ ଜଳ (Bottle Jaw)',
        warningSign: 'Chalky white conjunctiva (FAMACHA score 5), fluid swelling under jaw',
        immediateAction: 'Fecal egg count test; emergency deworming with targeted anthelmintic and iron support.',
      },
    ],
    commonConditions: [
      {
        name: 'Peste des Petits Ruminants (PPR)',
        nameOdia: 'ଛେଳି ବସନ୍ତ / ପି.ପି.ଆର୍.',
        probingChecklist: ['High fever (>40°C)?', 'Nasal discharge and mouth ulcers?', 'Profuse foul diarrhea?'],
        screeningTests: ['Clinical examination by vet', 'PPR antigen detection'],
        firstAidSafeGuidance: 'Isolate affected goats immediately. Clean mouth with potassium permanganate (1:1000) or saline wash. Provide soft gruel. Consult vet immediately.',
      },
      {
        name: 'Goat Acidosis & Bloat',
        nameOdia: 'ଛେଳିର ପେଟ ଫାମ୍ପିବା',
        probingChecklist: ['Did goat accidentally break into grain store / cooked rice?', 'Is left flank swollen?'],
        screeningTests: ['Clinical rumen assessment'],
        firstAidSafeGuidance: 'Administer oral antacid (magnesium hydroxide) or vegetable oil (50-100ml) under tele-vet guidance. Keep goat standing with front legs elevated.',
      },
    ],
  },
  dog: {
    id: 'dog',
    displayName: 'Pet Dog (Canine)',
    displayNameOdia: 'ପୋଷା କୁକୁର (Pet Dog)',
    displayNameHindi: 'पालतू कुत्ता (Pet Dog)',
    emoji: '🐕',
    normalPhysiology: {
      temperatureC: '38.3°C – 39.2°C (101.0°F – 102.5°F)',
      heartRateBpm: '60 – 140 beats/min (smaller breeds higher)',
      respiratoryRateBpm: '10 – 30 breaths/min',
      gestationDays: '58 – 68 days (~63 days)',
    },
    emergencyRedFlags: [
      {
        condition: 'Gastric Dilatation-Volvulus (GDV / Bloat)',
        conditionOdia: 'ପେଟ ଫୁଲିବା ଓ ମୋଡ଼ି ହେବା (GDV Emergency)',
        warningSign: 'Unproductive retching, swollen hard abdomen, pacing, excessive drooling',
        immediateAction: 'Rush to veterinary emergency hospital within the hour — surgical emergency.',
      },
      {
        condition: 'Canine Parvovirus (Puppies)',
        conditionOdia: 'ପାର୍ଭୋଭାଇରସ୍ ସଂକ୍ରମଣ',
        warningSign: 'Persistent vomiting, bloody foul diarrhea, extreme lethargy, refusal to drink',
        immediateAction: 'Isolate from other dogs. Immediate IV fluid resuscitation and antiemetics at clinic.',
      },
      {
        condition: 'Toxic Ingestion (Chocolate, Grapes, Xylitol, Rodenticide)',
        conditionOdia: 'ବିଷାକ୍ତ ଖାଦ୍ୟ (ଚକୋଲେଟ୍, ଅଙ୍ଗୁର, ମୂଷା ଔଷଧ)',
        warningSign: 'Seizures, vomiting, trembling, sudden collapse',
        immediateAction: 'Do not induce vomiting without vet instruction. Bring toxic package to hospital immediately.',
      },
    ],
    commonConditions: [
      {
        name: 'Tick Fever (Ehrlichiosis / Babesiosis)',
        nameOdia: 'ଟିକ୍ ଫିଭର୍ (ରକ୍ତ ପରଜୀବୀ)',
        probingChecklist: ['History of ticks?', 'High fever, loss of appetite?', 'Pale gums or nose bleeding?'],
        screeningTests: ['Complete Blood Count (CBC) with Platelet count', 'Tick fever PCR or 4Dx snap test'],
        firstAidSafeGuidance: 'Keep in cool resting place. Do NOT administer human paracetamol (toxic to pets). Visit vet for tick blood panel.',
      },
      {
        name: 'Skin Allergies & Demodicosis',
        nameOdia: 'ଚର୍ମ ରୋଗ ଓ କାଛୁ',
        probingChecklist: ['Intense scratching/itching?', 'Hair loss patches around eyes or paws?'],
        screeningTests: ['Skin scrapings examination', 'Fungal culture'],
        firstAidSafeGuidance: 'Use gentle veterinary chlorhexidine wash under advice. Prevent constant licking with an Elizabethan collar.',
      },
    ],
  },
  cat: {
    id: 'cat',
    displayName: 'Pet Cat (Feline)',
    displayNameOdia: 'ବିଲେଇ (Pet Cat)',
    displayNameHindi: 'बिल्ली (Pet Cat)',
    emoji: '🐈',
    normalPhysiology: {
      temperatureC: '38.0°C – 39.2°C (100.5°F – 102.5°F)',
      heartRateBpm: '140 – 220 beats/min',
      respiratoryRateBpm: '20 – 30 breaths/min',
      gestationDays: '63 – 67 days (~65 days)',
    },
    emergencyRedFlags: [
      {
        condition: 'Urethral Obstruction (Blocked Cat / FLUTD)',
        conditionOdia: 'ପିଶାବ ବନ୍ଦ ହେବା (Urinary Blockage)',
        warningSign: 'Male cat straining in litter box crying, producing no urine or drops, licking penis',
        immediateAction: 'Life-threatening emergency within 24 hours. Immediate catheterization required at clinic.',
      },
      {
        condition: 'Lily Flower Poisoning',
        conditionOdia: 'ଲିଲି ଫୁଲ ବିଷକ୍ରିୟା',
        warningSign: 'Chewed any part of true lily plant/pollen, followed by sudden vomiting',
        immediateAction: 'Causes fatal acute kidney failure. Immediate clinic decontamination and IV flushing.',
      },
    ],
    commonConditions: [
      {
        name: 'Feline Upper Respiratory Infection (Cat Flu)',
        nameOdia: 'ବିଲେଇ ଥଣ୍ଡା / କ୍ୟାଟ୍ ଫ୍ଲୁ',
        probingChecklist: ['Sneezing and eye discharge?', 'Nasal congestion preventing eating?'],
        screeningTests: ['Veterinary ophthalmic & respiratory exam'],
        firstAidSafeGuidance: 'Gently clean eyes and nose with warm sterile saline pads. Provide warm, aromatic canned food.',
      },
      {
        name: 'Hairballs & Digestive Motility',
        nameOdia: 'ଲୋମ ଜମିବା (Hairball)',
        probingChecklist: ['Coughing up hair cylinder?', 'Constipation or dry stool?'],
        screeningTests: ['Abdominal palpation'],
        firstAidSafeGuidance: 'Frequent gentle brushing. Use veterinary hairball malt paste as directed.',
      },
    ],
  },
};
