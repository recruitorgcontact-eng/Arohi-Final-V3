// VanaVeda by Arohi - Vedic Science, Scriptural Matrix, 5-Koshas, Nadis & Ritucharya

export interface ScripturalNode {
  id: string;
  source: string;
  verseDevanagari: string;
  verseOdia: string;
  transliteration: string;
  englishMeaning: string;
  modernScienceParallel: string;
  undiscoveredInnovation: string;
  botanicalApplication: string;
}

export const VEDIC_SCRIPTURAL_MATRIX: ScripturalNode[] = [
  {
    id: 'oshadhi_sukta',
    source: 'Rigveda 10.97 (ओषधि सूक्त - Oshadhi Sukta)',
    verseDevanagari: 'शतं वो अम्ब धामानि सहस्रमुत वो रुहः। अधा शतक्रत्वो यूयमिमं मे अगदं कृत॥',
    verseOdia: 'ଶତଂ ବୋ ଅମ୍ବ ଧାମାନି ସହସ୍ରମୁତ ବୋ ରୁହଃ। ଅଧା ଶତକ୍ରତ୍ବୋ ୟୂୟମିମଂ ମେ ଅଗଦଂ କୃତ॥',
    transliteration: 'śataṁ vo amba dhāmāni sahasramuta vo ruhaḥ | adhā śatakratvo yūyamimaṁ me agadaṁ kṛta ||',
    englishMeaning: 'A hundred, O Mother Plants, are your abodes, a thousand are your branches and sproutings. You who possess a hundred powers, make this patient free from suffering and whole again.',
    modernScienceParallel: 'Ultra-weak biophoton emission and plant secondary metabolite diversity. Plants do not produce a single synthetic compound; they generate complex synergistic matrices (phytochemical cascades) that prevent microbial resistance mutations.',
    undiscoveredInnovation: 'Synergistic Network Pharmacology: Rather than isolating a single patented molecule which induces toxic liver load, classical Vedic botany utilizes whole-matrix complexes that cross cellular barriers with zero side-effects.',
    botanicalApplication: 'Tulsi, Neem, and Peepal decoction protocols for comprehensive immune defense.'
  },
  {
    id: 'nasadiya_sukta',
    source: 'Rigveda 10.129 (नासदीय सूक्त - Quantum Creation)',
    verseDevanagari: 'ना॑सदासी॒न्नो सदा॑सीत्त॒दानीं॒ नासी॒द्रजो॒ नो व्यो॑मा प॒रो यत्।',
    verseOdia: 'ନାସଦାସୀନ୍ନୋ ସଦାସୀତ୍ତଦାନୀଂ ନାସୀଦ୍ରଜୋ ନୋ ବ୍ୟୋମା ପରୋ ୟତ୍।',
    transliteration: 'nā́sadāsīn nó sádāsīttadānī́ṁ nāsī́drajo nó vyòmā paró yát |',
    englishMeaning: 'Then was not non-existence nor existence: there was no realm of air, no sky beyond it. What covered it, and where? And what gave it shelter? Was water there, unfathomed depth of water?',
    modernScienceParallel: 'Quantum Field Theory (QFT) & The Zero-Point Field. All physical matter arises from non-local vacuum fluctuations (Spanda / Primordial Vibration). Plant consciousness senses environmental frequency fields.',
    undiscoveredInnovation: 'Acoustic Plant Bio-signaling: Classical Ayurvedic farming (Vrikshayurveda) played microtonal ragas to enhance medicinal yield. Sound frequencies stimulate stomatal aperture opening and cellular nutrient uptake.',
    botanicalApplication: 'Steeping medicinal leaves under 432Hz harmonic acoustic resonance.'
  },
  {
    id: 'agnihotra_physics',
    source: 'Yajurveda (अग्निहोत्र भौतिकी - Atmospheric Aerosols)',
    verseDevanagari: 'अग्नये स्वाहा अग्नये इदं न मम। प्रजापतये स्वाहा प्रजापतये इदं न मम॥',
    verseOdia: 'ଅଗ୍ନୟେ ସ୍ୱାହା ଅଗ୍ନୟେ ଇଦଂ ନ ମମ। ପ୍ରଜାପତୟେ ସ୍ୱାହା ପ୍ରଜାପତୟେ ଇଦଂ ନ ମମ॥',
    transliteration: 'agnaye svāhā agnaye idaṁ na mama | prajāpataye svāhā prajāpataye idaṁ na mama ||',
    englishMeaning: 'Unto Agni, the cosmic transformative fire, this offering is surrendered. It is no longer mine. Unto Prajapati, the creator of life, this is surrendered.',
    modernScienceParallel: 'Sub-micron aerosolized combustion. Simmering medicinal dry herbs with cow ghee in inverted copper pyramid resonators produces formaldehyde, ethylene oxide, and beta-sitosterol aerosols that purify indoor atmospheric pathogens within a 100-meter radius.',
    undiscoveredInnovation: 'Bio-aerosol Drug Delivery: Inhaling vaporized botanical nano-droplets bypasses first-pass hepatic metabolism, crossing the blood-brain barrier directly via olfactory neurons.',
    botanicalApplication: 'Herbal Dhoopana (dry leaf aerosolization) using dried Bilva and Peepal leaves.'
  },
  {
    id: 'shabda_brahman',
    source: 'Samaveda (शब्द ब्रह्मन् - Harmonic Resonance)',
    verseDevanagari: 'सामगानां सामवेदोऽस्मि देवानामस्मि वासवः।',
    verseOdia: 'ସାମଗାନାଂ ସାମବେଦୋଽସ୍ମି ଦେବାନାମସ୍ମି ବାସବଃ।',
    transliteration: 'sāmagānāṁ sāmavedo\'smi devānāmasmi vāsavaḥ |',
    englishMeaning: 'Among the Vedas I am the Samaveda (the divine song); among the celestial deities I am Indra.',
    modernScienceParallel: 'Cymatics and DNA vibrational frequency. Sound waves structure water molecules into hexagonal clusters. Since living plants and human cells are over 70% water, acoustic harmonies alter cellular osmotic permeability.',
    undiscoveredInnovation: 'Mantra-infused Solvent Extraction: Water infused with specific Sanskrit phonetics alters its solvent extraction capability, extracting more delicate bioflavonoids without thermal breakdown.',
    botanicalApplication: '432Hz Sound Alchemical infusion of Brahmi Ghrita and Tulsi tea.'
  },
  {
    id: 'krimi_chikitsa',
    source: 'Atharvaveda (कृमि चिकित्सा - Antimicrobial Botany)',
    verseDevanagari: 'उ॒त सूर्य॒ उदे॑तु मा नो॑ मक्षिका॒ हना॑न्। कृ॒मीन्त्सर्वान्त्सं॑ पिंषतु॥',
    verseOdia: 'ଉତ ସୂର୍ୟ ଉଦେତୁ ମା ନୋ ମକ୍ଷିକା ହନାନ। କୃମୀନ୍ତ୍ସର୍ବାନ୍ତ୍ସଂ ପିଂଷତୁ॥',
    transliteration: 'uta sūrya udetu mā no makṣikā hanān | kṛmīntsarvāntsaṁ piṁṣatu ||',
    englishMeaning: 'Let the divine Sun rise, let not pests and disease carriers harm us. May the radiant solar energy and sacred herbs pulverize all microscopic pathogens (Krimi).',
    modernScienceParallel: 'Microbiome stewardship vs. Scorched-Earth antibiotics. Traditional antibiotics kill beneficial gut flora along with pathogens. Atharvavedic botany uses volatile phytocompounds that suppress pathogenic virulence factors while nourishing commensal gut flora.',
    undiscoveredInnovation: 'Selective Pathogen Quorum-Sensing Inhibition: Neem and Bilva compounds stop bacteria from communicating and forming biofilm matrices, rendering them harmless without forcing mutation.',
    botanicalApplication: 'Neem and Bilva leaf extracts for persistent gut dysbiosis and skin microbiome restoration.'
  }
];

export interface KoshaLayer {
  name: string;
  sanskrit: string;
  odia: string;
  translation: string;
  dimension: string;
  pathologyOrigin: string; // Adhi vs Vyadhi
  botanicalHarmonizer: string;
  frequencyHz: number;
}

export const FIVE_KOSHA_DATA: KoshaLayer[] = [
  {
    name: 'Annamaya Kosha',
    sanskrit: 'अन्नमय कोष',
    odia: 'ଅନ୍ନମୟ କୋଷ',
    translation: 'The Physical Sheath of Food & Matter',
    dimension: 'Gross anatomical organs, musculoskeletal tissues, cellular matrix',
    pathologyOrigin: 'Vyadhi (Secondary physical symptoms, tissue degradation, localized pain)',
    botanicalHarmonizer: 'Moringa, Arjuna & Peepal (Mineral density, collagen integrity, arterial tone)',
    frequencyHz: 136.1
  },
  {
    name: 'Pranamaya Kosha',
    sanskrit: 'प्राणमय कोष',
    odia: 'ପ୍ରାଣମୟ କୋଷ',
    translation: 'The Vital Energy & Breath Sheath',
    dimension: '72,000 Nadis, 5 Prana flow vectors, electromagnetic nervous system',
    pathologyOrigin: 'Prana Stagnation (Fatigue, cold extremities, chronic shallow breathing)',
    botanicalHarmonizer: 'Tulsi & Bilva (Apana-Vata balance, respiratory expansion, Agni fire)',
    frequencyHz: 432
  },
  {
    name: 'Manomaya Kosha',
    sanskrit: 'मनोमय कोष',
    odia: 'ମନୋମୟ କୋଷ',
    translation: 'The Mental & Emotional Sheath',
    dimension: 'Subconscious sensory mind, emotional memory, stress hormones',
    pathologyOrigin: 'Adhi (Psychosomatic root: unexpressed grief, chronic anxiety, burnout)',
    botanicalHarmonizer: 'Brahmi & Parijat (Synaptic neuro-plasticity, sleep restoration, vagal calm)',
    frequencyHz: 528
  },
  {
    name: 'Vijnanamaya Kosha',
    sanskrit: 'विज्ञानमय कोष',
    odia: 'ବିଜ୍ଞାନମୟ କୋଷ',
    translation: 'The Wisdom & Intuition Sheath',
    dimension: 'Higher intellect (Buddhi), self-awareness, existential discernment',
    pathologyOrigin: 'Prajnaparadha (Crime against wisdom: knowingly making toxic lifestyle choices)',
    botanicalHarmonizer: 'Ashvattha (Peepal) & Tulsi (Sattvic clarity, neuro-endocrine equilibrium)',
    frequencyHz: 639
  },
  {
    name: 'Anandamaya Kosha',
    sanskrit: 'आनन्दमय कोष',
    odia: 'ଆନନ୍ଦମୟ କୋଷ',
    translation: 'The Bliss & Divine Core Sheath',
    dimension: 'Unconditional peace, inner stillness, unified consciousness',
    pathologyOrigin: 'Disconnection from Source (Existential despair, chronic spiritual void)',
    botanicalHarmonizer: 'Pure Meditative Silence, Vedic Breathing, & Sacred Tanpura Resonance',
    frequencyHz: 963
  }
];

export interface PranaFlowVector {
  name: string;
  sanskrit: string;
  vector: string;
  seat: string;
  physiologicalRole: string;
  blockageSymptoms: string;
  botanicalCure: string;
}

export const FIVE_PRANA_VECTORS: PranaFlowVector[] = [
  {
    name: 'Prana Vayu',
    sanskrit: 'प्राण वायु',
    vector: 'Inward & Upward (Centripetal)',
    seat: 'Heart, Thorax, Head',
    physiologicalRole: 'Inhalation, sensory perception, swallowing, mental focus',
    blockageSymptoms: 'Anxiety, breathlessness, asthma, palpitations, mental restlessness',
    botanicalCure: 'Tulsi Swarasa with raw honey & Brahmi at dawn'
  },
  {
    name: 'Apana Vayu',
    sanskrit: 'अपान वायु',
    vector: 'Downward & Outward (Centrifugal)',
    seat: 'Pelvis, Colon, Reproductive organs, Bladder',
    physiologicalRole: 'Elimination of stool/urine, menstruation, childbirth, grounding',
    blockageSymptoms: 'Chronic constipation, IBS, bloating, menstrual cramps, lower back stiffness',
    botanicalCure: 'Bilva leaf decoction and warm Peepal milk infusion'
  },
  {
    name: 'Samana Vayu',
    sanskrit: 'समान वायु',
    vector: 'Oscillating at the Core (Radial Balancing)',
    seat: 'Navel (Nabhi / Solar Plexus)',
    physiologicalRole: 'Digestion, enzymatic breakdown, nutrient absorption, thermoregulation',
    blockageSymptoms: 'Indigestion, Ama (toxic sludge), cold stomach, sluggish metabolism',
    botanicalCure: 'Curry Leaf (Bhrusanga) chewed with rock salt & Bilva powder'
  },
  {
    name: 'Udana Vayu',
    sanskrit: 'उदान वायु',
    vector: 'Ascending (Upward Elevation)',
    seat: 'Throat, Diaphragm, Vocal cords',
    physiologicalRole: 'Exhalation, speech articulation, willpower, memory recall',
    blockageSymptoms: 'Throat tightness, thyroid dysregulation, hesitation, dry cough',
    botanicalCure: 'Brahmi Ghrita and warm Tulsi-black pepper gargle'
  },
  {
    name: 'Vyana Vayu',
    sanskrit: 'व्यान वायु',
    vector: 'Expansive & Omnidirectional (Peripheral)',
    seat: 'Heart distributing to entire skin and limbs',
    physiologicalRole: 'Blood circulation, sweating, movement of joints, peripheral nerve signals',
    blockageSymptoms: 'Hypertension, cold hands/feet, numbness, joint arthritis, Raynaud syndrome',
    botanicalCure: 'Arjuna Ksheerapaka & Parijat leaf decoction'
  }
];

export interface SeasonRitucharya {
  id: string;
  nameSanskrit: string;
  nameOdia: string;
  nameEnglish: string;
  approxMonths: string;
  dominantDoshaState: string;
  biologicalChallenge: string;
  sacredBotanicalRegime: string[];
  brewingProtocol: string;
}

export const VEDIC_SIX_SEASONS: SeasonRitucharya[] = [
  {
    id: 'vasanta',
    nameSanskrit: 'वसन्त ऋतु (Vasanta)',
    nameOdia: 'ବସନ୍ତ ଋତୁ (Spring)',
    nameEnglish: 'Spring (March - April)',
    approxMonths: 'Chaitra - Vaishakha',
    dominantDoshaState: 'Kapha Liquefaction (Melting winter mucus provoke allergies)',
    biologicalChallenge: 'Sluggish liver, seasonal rhinitis, lethargy, heavy digestion',
    sacredBotanicalRegime: ['Neem leaves (Sarva Roga Nivarini)', 'Tulsi fresh juice', 'Moringa soup'],
    brewingProtocol: 'Simmer 8 Neem leaves + 5 Tulsi leaves in 300ml water down to 75ml. Sip warm at sunrise.'
  },
  {
    id: 'grishma',
    nameSanskrit: 'ग्रीष्म ऋतु (Grishma)',
    nameOdia: 'ଗ୍ରୀଷ୍ମ ଋତୁ (Summer)',
    nameEnglish: 'Summer (May - June)',
    approxMonths: 'Jyeshtha - Ashadha',
    dominantDoshaState: 'Pitta Accumulation & Dehydration of Ojas',
    biologicalChallenge: 'Exhaustion, burning sensation, dehydration, irritability',
    sacredBotanicalRegime: ['Peepal cold infusion (Hima)', 'Brahmi with cow ghee', 'Curry leaf buttermilk'],
    brewingProtocol: 'Soak 4 Peepal leaves in earthen clay pot water overnight with rock crystal sugar.'
  },
  {
    id: 'varsha',
    nameSanskrit: 'वर्षा ऋतु (Varsha)',
    nameOdia: 'ବର୍ଷା ଋତୁ (Monsoon)',
    nameEnglish: 'Monsoon (July - August)',
    approxMonths: 'Shravana - Bhadrapada',
    dominantDoshaState: 'Vata Aggravation & Weakened Agni (Digestive Fire)',
    biologicalChallenge: 'Water-borne gut infections, Grahani (IBS), joint aches, low appetite',
    sacredBotanicalRegime: ['Bilva leaf tea', 'Tulsi with black pepper', 'Parijat warm decoction'],
    brewingProtocol: 'Boil trifoliate Bilva leaves with crushed ginger and clove. Sip 30 min before meals.'
  },
  {
    id: 'sharad',
    nameSanskrit: 'शरद् ऋतु (Sharad)',
    nameOdia: 'ଶରତ ଋତୁ (Autumn)',
    nameEnglish: 'Autumn (September - October)',
    approxMonths: 'Ashwina - Kartika',
    dominantDoshaState: 'Pitta Flare (Peak bile heat under bright autumn sun)',
    biologicalChallenge: 'Acid reflux, skin eruptions, burning eyes, headaches',
    sacredBotanicalRegime: ['Neem blood cleanse', 'Arjuna Ksheerapaka', 'Brahmi fresh juice'],
    brewingProtocol: 'Simmer 1 tsp Arjuna with milk and water at bedtime for vascular calm.'
  },
  {
    id: 'hemanta',
    nameSanskrit: 'हेमन्त ऋतु (Hemanta)',
    nameOdia: 'ହେମନ୍ତ ଋତୁ (Pre-Winter)',
    nameEnglish: 'Pre-Winter (November - December)',
    approxMonths: 'Margashirsha - Pausha',
    dominantDoshaState: 'Robust Agni (High metabolic fire locked in body)',
    biologicalChallenge: 'Dry skin, hunger pangs, stiffness if nourishment is lacking',
    sacredBotanicalRegime: ['Moringa nutrient broth', 'Peepal milk decoction', 'Curry leaf ghee'],
    brewingProtocol: 'Warm steamed Moringa leaf soup with cumin, black pepper, and cow ghee.'
  },
  {
    id: 'shishira',
    nameSanskrit: 'शिशिर ऋतु (Shishira)',
    nameOdia: 'ଶିଶିର ଋତୁ (Late Winter)',
    nameEnglish: 'Late Winter (January - February)',
    approxMonths: 'Magha - Phalguna',
    dominantDoshaState: 'Cold Kapha-Vata consolidation',
    biologicalChallenge: 'Joint stiffness, sciatica flare, sluggish lymphatic channels',
    sacredBotanicalRegime: ['Parijat sciatica decoction', 'Tulsi ginger elixir', 'Brahmi Ghrita'],
    brewingProtocol: 'Boil 7 Parijat leaves in water reduced to half. Drink warm upon waking.'
  }
];
