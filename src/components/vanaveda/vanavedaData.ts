// VanaVeda by Arohi - Sacred Botanical Herbarium Dataset
// 10 Classical Medicinal Trees & Leaves with Rigvedic/Sushruta/Charaka References

export interface MedicinalLeaf {
  id: string;
  nameEnglish: string;
  nameSanskrit: string;
  nameDevanagari: string;
  nameOdia: string;
  botanicalName: string;
  family: string;
  iconName: string;
  vedicOrigin: string;
  primaryAffinity: string;
  tridoshaBalance: {
    vata: 'Pacifies' | 'Neutral' | 'Aggravates';
    pitta: 'Pacifies' | 'Neutral' | 'Aggravates';
    kapha: 'Pacifies' | 'Neutral' | 'Aggravates';
  };
  rasa: string[]; // 6 Tastes
  guna: string[]; // Qualities
  virya: 'Sheeta (Cooling)' | 'Ushna (Heating)';
  vipaka: 'Madhura (Sweet)' | 'Amla (Sour)' | 'Katu (Pungent)';
  prabhava: string; // Unique Divine Potency
  activePhytochemicals: string[];
  sushrutaPreparations: {
    form: string;
    sanskritName: string;
    indication: string;
    brewingMethod: string;
  }[];
  anupana: string[]; // Ideal carrier vehicle
  contraindications: string;
  modernMechanism: string;
  shlokaDevanagari: string;
  shlokaTransliteration: string;
  shlokaMeaning: string;
  idealTimeOfDay: string;
  accentColor: string;
}

export const SACRED_BOTANICAL_HERBARIUM: MedicinalLeaf[] = [
  {
    id: 'tulsi',
    nameEnglish: 'Tulsi (Holy Basil)',
    nameSanskrit: 'Surasa / Vishnupriya',
    nameDevanagari: 'तुलसी (सुरसा)',
    nameOdia: 'ତୁଳସୀ (Tulsi)',
    botanicalName: 'Ocimum sanctum (Linn.)',
    family: 'Lamiaceae',
    iconName: 'tulsi',
    vedicOrigin: 'Padma Purana & Rigveda Oshadhi Sukta (10.97)',
    primaryAffinity: 'Pranavaha Srotas (Respiratory) & Ojas Shield',
    tridoshaBalance: {
      vata: 'Pacifies',
      pitta: 'Neutral',
      kapha: 'Pacifies'
    },
    rasa: ['Katu (Pungent)', 'Tikta (Bitter)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Tikshna (Penetrating)'],
    virya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Bhuta-raksha (Antimicrobial Bio-shield & Spiritual Grounding)',
    activePhytochemicals: ['Eugenol (82%)', 'Caryophyllene', 'Rosmarinic Acid', 'Ursolic Acid', 'Apigenin'],
    sushrutaPreparations: [
      {
        form: 'Swarasa (Fresh Juice)',
        sanskritName: 'स्वरस (Fresh Leaf Extract)',
        indication: 'Acute productive cough, allergic rhinitis, mental fog',
        brewingMethod: 'Crush 10 fresh sacred leaves in a stone mortar. Extract 5-10 ml fresh juice. Take with 1 tsp raw wild honey.'
      },
      {
        form: 'Kashayam (Decoction)',
        sanskritName: 'कषायम् (Vedic Simmered Tea)',
        indication: 'Intermittent fevers, viral convalescence, sluggish Agni',
        brewingMethod: 'Boil 15 whole leaves with 2 crushed black peppercorns in 200ml spring water down to 50ml.'
      },
      {
        form: 'Hima (Cold Infusion)',
        sanskritName: 'हिम (Cooling Night Infusion)',
        indication: 'Mild Pitta heat, stress fatigue, dehydration',
        brewingMethod: 'Steep 7 crushed leaves in earthen pot water overnight. Strain and sip at sunrise.'
      }
    ],
    anupana: ['Raw wild honey (for Kapha)', 'Warm spring water', 'Cow ghee (for high Vata)'],
    contraindications: 'Do not boil excessively in heavy metal vessels; avoid combining directly with whole cow milk.',
    modernMechanism: 'Modulates HPA-axis (reduces circulating cortisol), stimulates macrophage phagocytosis, suppresses COX-2 inflammatory enzymes.',
    shlokaDevanagari: 'तुलसी कटुका तिक्ता हृद्योष्णा दाहपित्तकृत्। दीपनी कुष्ठकृच्छ्रास्रपार्श्वरुक् कफवातजित्॥',
    shlokaTransliteration: 'tulasī kaṭukā tiktā hṛdyoṣṇā dāhapittakṛt | dīpanī kuṣṭhakṛcchrāsrapārśvaruk kaphavātajit ||',
    shlokaMeaning: 'Tulsi is pungent and bitter, cardioprotective and warming. It stimulates the digestive fire, cleanses blood pathologies, relieves flank pain, and triumphs over aggravated Kapha and Vata.',
    idealTimeOfDay: 'Brahma Muhurta (Dawn: 04:30 AM - 06:00 AM)',
    accentColor: '#15803D'
  },
  {
    id: 'neem',
    nameEnglish: 'Neem (Indian Lilac)',
    nameSanskrit: 'Nimba / Sarva Roga Nivarini',
    nameDevanagari: 'निम्ब (सर्व रोग निवारिणी)',
    nameOdia: 'ନିମ୍ବ (Nimba)',
    botanicalName: 'Azadirachta indica (A. Juss.)',
    family: 'Meliaceae',
    iconName: 'neem',
    vedicOrigin: 'Atharvaveda Krimi Chikitsa (Antimicrobial Hymns)',
    primaryAffinity: 'Raktavaha Srotas (Blood Purifier) & Skin Barrier',
    tridoshaBalance: {
      vata: 'Aggravates',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Sheeta (Cool)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Vranaropana (Supreme Cellular Tissue Healing & Quorum-Sensing Disruption)',
    activePhytochemicals: ['Azadirachtin', 'Nimbin', 'Nimbidol', 'Gedunin', 'Quercetin'],
    sushrutaPreparations: [
      {
        form: 'Kashayam (Decoction)',
        sanskritName: 'निम्ब कषायम्',
        indication: 'Eczema, chronic acne, elevated liver enzymes, metabolic Ama',
        brewingMethod: 'Simmer 8 fresh green leaves in 250ml water for 12 minutes down to 60ml. Strain and drink at room temperature.'
      },
      {
        form: 'Lepa (Poultice)',
        sanskritName: 'निम्ब प्रलेप',
        indication: 'Fungal ringworm, inflamed skin lesions, insect bites',
        brewingMethod: 'Grind tender leaves with a pinch of pure turmeric into a fine moist paste; apply directly for 25 minutes.'
      },
      {
        form: 'Taila (Infused Oil)',
        sanskritName: 'निम्ब तैलम्',
        indication: 'Dandruff, scalp psoriasis, ear infections',
        brewingMethod: 'Slow cold-pressed sesame oil infusion infused with whole leaf extract and manjishtha.'
      }
    ],
    anupana: ['Warm water', 'Triphala decoction', 'Raw cane sugar (Sarkara) to balance astringency'],
    contraindications: 'Do not use during early pregnancy or active reproductive conception cycles; avoid long-term use in high Vata emaciation.',
    modernMechanism: 'Disrupts bacterial biofilm formation, downregulates TNF-alpha and interleukin-6, induces selective apoptosis in abnormal dermal cells.',
    shlokaDevanagari: 'निम्बो ग्राह्यो लघुः शीतो वातलोऽग्निप्रदीपनः। व्रणपित्तकफच्छर्दिहल्लासारुचिनाशनः॥',
    shlokaTransliteration: 'nimbo grāhyo laghuḥ śīto vātalo\'gnipradīpanaḥ | vraṇapittakaphacchardihṛllāsārucināśanaḥ ||',
    shlokaMeaning: 'Neem is astringent, light, cooling; it pacifies Pitta and Kapha, kindles digestive fire, heals ulcers, and arrests nausea, vomiting, and loss of appetite.',
    idealTimeOfDay: 'Usha Kala (Morning on empty stomach)',
    accentColor: '#166534'
  },
  {
    id: 'peepal',
    nameEnglish: 'Peepal (Sacred Fig)',
    nameSanskrit: 'Ashvattha / Vriksha Raja',
    nameDevanagari: 'अश्वत्थ (वृक्षराज)',
    nameOdia: 'ଅଶ୍ୱତ୍ଥ (Ashvattha / Osta)',
    botanicalName: 'Ficus religiosa (Linn.)',
    family: 'Moraceae',
    iconName: 'peepal',
    vedicOrigin: 'Rigveda (1.164.20 - Dvā suparṇā) & Bhagavad Gita (15.1)',
    primaryAffinity: 'Artavavaha & Majjavaha Srotas (Endocrine & Neuro-longevity)',
    tridoshaBalance: {
      vata: 'Neutral',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Kashaya (Astringent)', 'Madhura (Sweet)'],
    guna: ['Guru (Heavy)', 'Ruksha (Dry)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Vayasthapana (Supreme Anti-Senescence & Cellular Autophagy)',
    activePhytochemicals: ['Beta-sitosterol', 'Stigmasterol', 'Lupen-3-one', 'Campesterol', 'Flavonoid Glycosides'],
    sushrutaPreparations: [
      {
        form: 'Ksheerapaka (Milk Decoction)',
        sanskritName: 'अश्वत्थ क्षीरपाक',
        indication: 'Uterine bleeding, arterial stiffness, neuro-calm, insomnia',
        brewingMethod: 'Simmer 4 tender heart-shaped leaves in 100ml raw A2 cow milk and 100ml water until only milk remains.'
      },
      {
        form: 'Hima (Cold Infusion)',
        sanskritName: 'अश्वत्थ पर्ण हिम',
        indication: 'Bleeding piles, mouth ulcers, acute Pitta burn',
        brewingMethod: 'Soak crushed dry leaves in clay pot water overnight with rock crystal sugar.'
      }
    ],
    anupana: ['A2 Cow milk', 'Mishri (rock sugar)', 'Cold earthen water'],
    contraindications: 'Avoid in severe cold cough with deep Kapha congestion due to heavy cooling properties.',
    modernMechanism: 'Potent phytoestrogen balancing action, suppresses vascular endothelial cell inflammation, exhibits high free-radical scavenging capacity.',
    shlokaDevanagari: 'अश्वत्थो दुर्जरः शीतो गुरु रक्तपित्तकफापहः। कषायः स्वादुर्मधुरः भग्नसंधानकृत्परः॥',
    shlokaTransliteration: 'aśvattho durjaraḥ śīto guru raktapittakaphāpahaḥ | kaṣāyaḥ svādurmadhuraḥ bhagnasaṁdhānakṛtparaḥ ||',
    shlokaMeaning: 'The Sacred Ashvattha is cooling, heavy, astringent, and sweet. It cures bleeding disorders, pacifies Pitta and Kapha, and excels in knitting fractured tissues and endothelial membranes.',
    idealTimeOfDay: 'Sandhya Bela (Twilight sunset meditation)',
    accentColor: '#B45309'
  },
  {
    id: 'bilva',
    nameEnglish: 'Bilva (Bael / Golden Apple)',
    nameSanskrit: 'Bilva / Shivadruma',
    nameDevanagari: 'बिल्व (शिवद्रुम)',
    nameOdia: 'ବେଲ (Bela)',
    botanicalName: 'Aegle marmelos (Corr.)',
    family: 'Rutaceae',
    iconName: 'bilva',
    vedicOrigin: 'Shri Sukta (Rigveda Khila) & Shiva Purana Bilvashtakam',
    primaryAffinity: 'Annavaha Srotas (Grahani / Gut Microbiome Restorative)',
    tridoshaBalance: {
      vata: 'Pacifies',
      pitta: 'Neutral',
      kapha: 'Pacifies'
    },
    rasa: ['Kashaya (Astringent)', 'Tikta (Bitter)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Tikshna'],
    virya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Deepana-Pachana (Kindles Agni without Pitta aggravation)',
    activePhytochemicals: ['Marmelosin', 'Aegeline', 'Umbelliferone', 'Scopoletin', 'Beta-caryophyllene'],
    sushrutaPreparations: [
      {
        form: 'Kashayam (Decoction)',
        sanskritName: 'बिल्वपत्र कषायम्',
        indication: 'Irritable Bowel Syndrome (IBS), chronic mucosal colitis, dysentery',
        brewingMethod: 'Crush the sacred trifoliate leaf (3 leaflets) with 1 clove in 200ml water; simmer to 50ml.'
      },
      {
        form: 'Churna (Dry Leaf Powder)',
        sanskritName: 'बिल्वपत्र चूर्ण',
        indication: 'Glycemic imbalance, sluggish peristalsis, pancreatic fatigue',
        brewingMethod: 'Shade-dry leaves and powder. Take 2 grams with warm water 20 minutes before lunch.'
      }
    ],
    anupana: ['Warm water', 'Takra (buttermilk infused with roasted cumin)', 'Warm A2 ghee'],
    contraindications: 'Do not consume dry leaf powder in excessive quantities during acute constipation without fat carrier.',
    modernMechanism: 'Restores intestinal tight junctions, inhibits pathogen adherence in enterocytes, stimulates insulin release from beta-islets.',
    shlokaDevanagari: 'बिल्वं तु मधुरं तिक्तं कषायं पाचनं लघु। दीपनं कफवातघ्नं संग्राहि च परं स्मृतम्॥',
    shlokaTransliteration: 'bilvaṁ tu madhuraṁ tiktaṁ kaṣāyaṁ pācanaṁ laghu | dīpanaṁ kaphavātaghnaṁ saṁgrāhi ca paraṁ smṛtam ||',
    shlokaMeaning: 'Bilva is sweet, bitter, and astringent; light, digestive fire igniter, Kapha-Vata destroyer, and the sovereign bowel binder and mucosal healer.',
    idealTimeOfDay: 'Madhyahna (Midday 30 min before lunch)',
    accentColor: '#D97706'
  },
  {
    id: 'parijat',
    nameEnglish: 'Parijat (Night Jasmine)',
    nameSanskrit: 'Parijata / Harsingar / Shefali',
    nameDevanagari: 'पारिजात (हरसिंगार)',
    nameOdia: 'ଗଙ୍ଗଶିଉଳି (Gangasiuli)',
    botanicalName: 'Nyctanthes arbor-tristis (Linn.)',
    family: 'Oleaceae',
    iconName: 'parijat',
    vedicOrigin: 'Samudra Manthan (Churning of Ocean) - Harivamsa',
    primaryAffinity: 'Asthivaha & Majjavaha Srotas (Sciatica, Arthritic Synovial Joints)',
    tridoshaBalance: {
      vata: 'Pacifies',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Tikta (Intensely Bitter)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)'],
    virya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Gridhrasi-Nashaka (Specific antidote to Sciatica Nerve compression)',
    activePhytochemicals: ['Nyctanthin', 'Arbortristoside A & B', 'Iridoid Glucosides', 'Astragalin'],
    sushrutaPreparations: [
      {
        form: 'Kashayam (Decoction)',
        sanskritName: 'पारिजात पत्र क्वाथ',
        indication: 'Chronic sciatica (Gridhrasi), knee osteoarthritis, lingering viral fevers',
        brewingMethod: 'Crush 5-7 fresh rough leaves in 200ml spring water. Boil on low flame down to 50ml. Drink warm.'
      }
    ],
    anupana: ['Warm spring water', 'Warm sesame oil drop', 'Cow ghee'],
    contraindications: 'Do not exceed 7 leaves per daily dose due to potent iridoid potency.',
    modernMechanism: 'Inhibits inflammatory prostaglandins (PGE2), provides peripheral analgesia without gastric ulceration, calms neurogenic spinal pain.',
    shlokaDevanagari: 'पारिजातः कटुस्तिक्तः कफवातहरः परः। गृध्रसी सन्धिवातघ्नः ज्वरघ्नश्चापि कीर्तितः॥',
    shlokaTransliteration: 'pārijātaḥ kaṭustiktaḥ kaphavātaharaḥ paraḥ | gṛdhrasī sandhivātaghnaḥ jvaraghnaścāpi kīrtitaḥ ||',
    shlokaMeaning: 'Parijata is pungent and bitter; supreme destroyer of Kapha and Vata. Renowned for annihilating sciatica, joint rheumatism, and deep-seated fevers.',
    idealTimeOfDay: 'Usha Kala (Morning at sunrise)',
    accentColor: '#78350F'
  },
  {
    id: 'moringa',
    nameEnglish: 'Moringa (Drumstick Tree)',
    nameSanskrit: 'Shigru / Shobhanjana',
    nameDevanagari: 'शिग्रु (शोभाञ्जन)',
    nameOdia: 'ସଜନା (Sajana)',
    botanicalName: 'Moringa oleifera (Lam.)',
    family: 'Moringaceae',
    iconName: 'moringa',
    vedicOrigin: 'Charaka Samhita Sutrasthana (Krimighna & Svedopaga groups)',
    primaryAffinity: 'Medovaha & Rasavaha Srotas (Nutritional Vitality & Deep Detox)',
    tridoshaBalance: {
      vata: 'Pacifies',
      pitta: 'Neutral',
      kapha: 'Pacifies'
    },
    rasa: ['Katu (Pungent)', 'Tikta (Bitter)', 'Madhura (Sweet)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)', 'Tikshna (Sharp)'],
    virya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Shothahara (Deep cellular lymphatic decongestant & mineral replenisher)',
    activePhytochemicals: ['Moringine', 'Isothiocyanates', 'Quercetin', 'Chlorogenic Acid', 'Zeatin'],
    sushrutaPreparations: [
      {
        form: 'Swarasa (Fresh Leaf Soup)',
        sanskritName: 'शिग्रुपत्र यूप',
        indication: 'Anemia, bone mineral density loss, sluggish thyroid, visceral adiposity',
        brewingMethod: 'Lightly steam 1 cup tender leaves with cumin, rock salt, and black pepper. Consume as warm broth.'
      }
    ],
    anupana: ['Warm water', 'Ginger water', 'Lemon water'],
    contraindications: 'Avoid in bleeding disorders or acute severe acid peptic flares due to heating potency.',
    modernMechanism: 'Rich in bioavailable calcium, zinc, iron; activates Nrf2 cellular antioxidant pathway, reduces lipid peroxidation.',
    shlokaDevanagari: 'शिग्रुः कटुः सरो दीपनस्तिक्तो मधुरः कटुपाकतः। वातकफशोथघ्नः मेदसां विनिहन्ति च॥',
    shlokaTransliteration: 'śigruḥ kaṭuḥ saro dīpanastikto madhuraḥ kaṭupākataḥ | vātakaphaśothaghnaḥ medasāṁ vinihanti ca ||',
    shlokaMeaning: 'Shigru is pungent, laxative, appetite stimulant, bitter and sweet post-digestive. It cures Vata, Kapha, and edematous swellings while burning accumulated Meda (fat).',
    idealTimeOfDay: 'Madhyahna (Midday meal companion)',
    accentColor: '#15803D'
  },
  {
    id: 'arjuna',
    nameEnglish: 'Arjuna (Terminalia)',
    nameSanskrit: 'Arjuna / Partha / Hridya',
    nameDevanagari: 'अर्जुन (पार्थ / हृद्य)',
    nameOdia: 'ଅର୍ଜୁନ (Arjuna)',
    botanicalName: 'Terminalia arjuna (Roxb. ex DC.)',
    family: 'Combretaceae',
    iconName: 'arjuna',
    vedicOrigin: 'Rigveda (Hymns to Agni) & Sushruta Samhita (Salasaradi Gana)',
    primaryAffinity: 'Hridaya (Myocardium) & Raktavaha Srotas (Endothelium)',
    tridoshaBalance: {
      vata: 'Neutral',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Kashaya (Astringent)', 'Tikta (Bitter)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Hridya (Incomparable Myocardial Protector & Cardiac Renewer)',
    activePhytochemicals: ['Arjunolic Acid', 'Arjunic Acid', 'Terminic Acid', 'Coenzyme Q10 analogs', 'Oligomeric Proanthocyanidins'],
    sushrutaPreparations: [
      {
        form: 'Ksheerapaka (Milk Decoction)',
        sanskritName: 'अर्जुन क्षीरपाक',
        indication: 'Hypertension, coronary atherosclerosis, post-infarct recovery, palpitations',
        brewingMethod: 'Simmer 1 tsp powdered leaves and inner bark with 100ml water and 100ml organic A2 milk until water evaporates.'
      }
    ],
    anupana: ['Warm A2 cow milk', 'Honey (when cool)', 'Ghee'],
    contraindications: 'None under recommended dosages; monitor when co-administering with prescription beta-blockers.',
    modernMechanism: 'Inotropic effect on cardiac myocytes, inhibits LDL cholesterol oxidation, enhances endothelial nitric oxide production.',
    shlokaDevanagari: 'अर्जुनः शीतलः ग्राही कषायो हन्ति मारुतम्। कफपित्तं क्षतं क्षीरं हृद्रोगं च विशेषतः॥',
    shlokaTransliteration: 'arjunaḥ śītalaḥ grāhī kaṣāyo hanti mārutam | kaphapittaṁ kṣataṁ kṣīraṁ hṛdrogaṁ ca viśeṣataḥ ||',
    shlokaMeaning: 'Arjuna is cooling, astringent, and absorbent. It pacifies Kapha and Pitta, heals chest injuries, and is the supreme elixir for heart disorders.',
    idealTimeOfDay: 'Pratah Kala (Early morning after light stroll)',
    accentColor: '#991B1B'
  },
  {
    id: 'curry_leaf',
    nameEnglish: 'Curry Leaf (Sweet Neem)',
    nameSanskrit: 'Girinimba / Surabhinimba',
    nameDevanagari: 'गिरिनिम्ब (सुरभिनिम्ब)',
    nameOdia: 'ଭୃସଙ୍ଗ (Bhrusanga)',
    botanicalName: 'Murraya koenigii (Linn.)',
    family: 'Rutaceae',
    iconName: 'curry_leaf',
    vedicOrigin: 'Nighantu Ratnakara & Classical South Asian Culinary Pharmacopeia',
    primaryAffinity: 'Pachakavaha Srotas (Pancreas, Liver & Melanin Follicles)',
    tridoshaBalance: {
      vata: 'Pacifies',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Tikta (Bitter)', 'Katu (Pungent)', 'Kashaya (Astringent)'],
    guna: ['Laghu (Light)', 'Snigdha (Unctuous)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Keshya & Dipana (Hair Pigmentation Preservation & Jatharagni Catalyst)',
    activePhytochemicals: ['Mahanimbine', 'Girinimbine', 'Koenimbine', 'Mahanine', 'Beta-carotene'],
    sushrutaPreparations: [
      {
        form: 'Swarasa (Raw Chew)',
        sanskritName: 'स्वरस / चर्वण',
        indication: 'Premature hair greying, post-prandial glucose spike, fatty liver',
        brewingMethod: 'Chew 8-10 freshly harvested leaves thoroughly on an empty stomach every dawn.'
      }
    ],
    anupana: ['Warm water', 'Takra (buttermilk)'],
    contraindications: 'Safe for daily dietary consumption across all ages.',
    modernMechanism: 'Inhibits alpha-glucosidase enzyme, protects pancreatic beta-cells from oxidative apoptosis, activates melanogenesis.',
    shlokaDevanagari: 'सुरभिनिम्बः कटुस्तिक्तः चक्षुष्यः केशवर्धनः। अग्निदीप्तिकरो हृद्यः विषघ्नः परिकीर्तितः॥',
    shlokaTransliteration: 'surabhinimbaḥ kaṭustiktaḥ cakṣuṣyaḥ keśavardhanaḥ | agnidīptikaro hṛdyaḥ viṣaghnaḥ parikīrtitaḥ ||',
    shlokaMeaning: 'Surabhinimba is pungent and bitter; enhances eyesight and strengthens hair roots. Kindles digestive fire, supports the heart, and purges toxins.',
    idealTimeOfDay: 'Pratah Kala (At dawn on empty stomach)',
    accentColor: '#166534'
  },
  {
    id: 'jamun',
    nameEnglish: 'Jamun (Black Plum)',
    nameSanskrit: 'Jambu / Mahaphala',
    nameDevanagari: 'जम्बु (महाफल)',
    nameOdia: 'ଜାମୁ (Jamu)',
    botanicalName: 'Syzygium cumini (Linn.)',
    family: 'Myrtaceae',
    iconName: 'jamun',
    vedicOrigin: 'Ramayana (Sage Bharadwaja hermitage) & Charaka Samhita',
    primaryAffinity: 'Mutravaha Srotas (Pancreatic Glycemic Control & Urinary Tract)',
    tridoshaBalance: {
      vata: 'Aggravates',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Kashaya (Astringent)', 'Amla (Sour)', 'Madhura (Sweet)'],
    guna: ['Laghu (Light)', 'Ruksha (Dry)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Katu (Pungent)',
    prabhava: 'Mehahara (Incomparable Prameha / Diabetes Reversal Potency)',
    activePhytochemicals: ['Jamboline', 'Ellagic Acid', 'Myricetin', 'Anthocyanins', 'Gallotannins'],
    sushrutaPreparations: [
      {
        form: 'Kashayam (Leaf Decoction)',
        sanskritName: 'जम्बुपत्र क्वाथ',
        indication: 'Type 2 Diabetes, frequent urination, gingivitis, loose mucosal stools',
        brewingMethod: 'Simmer 6 washed tender leaves in 200ml water down to 50ml. Drink warm.'
      }
    ],
    anupana: ['Warm water', 'Triphala kwath', 'Raw honey (scanty)'],
    contraindications: 'Do not consume on an empty stomach in high Vata emaciated patients with severe constipation.',
    modernMechanism: 'Converts excess starch into energy, lowers fasting blood glucose, protects renal podocytes against diabetic nephropathy.',
    shlokaDevanagari: 'जम्बूः कषाया मधुरा रोचनी कफपित्तजित्। संग्राहिणी हिमस्तम्भा प्रमेहेषु च शस्यते॥',
    shlokaTransliteration: 'jambūḥ kaṣāyā madhurā rocanī kaphapittajit | saṁgrāhiṇī himastambhā prameheṣu ca śasyate ||',
    shlokaMeaning: 'Jambu is astringent and sweet, digestive taste enhancer, pacifier of Kapha and Pitta. It is cooling, absorbent, and celebrated in all urinary and diabetic disorders.',
    idealTimeOfDay: 'Aparahna (Late afternoon: 04:00 PM)',
    accentColor: '#581C87'
  },
  {
    id: 'brahmi',
    nameEnglish: 'Brahmi (Water Hyssop)',
    nameSanskrit: 'Brahmi / Medhya Rasayana',
    nameDevanagari: 'ब्राह्मी (मेध्य रसायन)',
    nameOdia: 'ବ୍ରାହ୍ମୀ (Brahmi)',
    botanicalName: 'Bacopa monnieri (Linn.)',
    family: 'Plantaginaceae',
    iconName: 'brahmi',
    vedicOrigin: 'Atharvaveda Ayushya Suktas & Sushruta Samhita Uttaratantra',
    primaryAffinity: 'Sahasrara Chakra & Majjavaha Srotas (Cognitive Memory & Synapses)',
    tridoshaBalance: {
      vata: 'Pacifies',
      pitta: 'Pacifies',
      kapha: 'Pacifies'
    },
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
    guna: ['Laghu (Light)', 'Sara (Flowing)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Madhura (Sweet)',
    prabhava: 'Medhya (Cognitive Neuro-Genesis & Memory Encoding)',
    activePhytochemicals: ['Bacoside A & B', 'Bacopasides I-V', 'Luteolin', 'Apigenin', 'Hersaponin'],
    sushrutaPreparations: [
      {
        form: 'Ghrita (Medicated Cow Ghee)',
        sanskritName: 'ब्राह्मी घृतम्',
        indication: 'ADHD, cognitive decline, chronic anxiety, speech stuttering, dementia',
        brewingMethod: 'Fresh leaf juice slow simmered in pure A2 cow ghee with shankhpushpi until moisture vanishes.'
      },
      {
        form: 'Swarasa (Fresh Juice)',
        sanskritName: 'स्वरस',
        indication: 'Exam stress, memory enhancement, neuro-calm',
        brewingMethod: 'Take 5ml fresh pressed juice with 1/2 tsp pure cow ghee at dawn.'
      }
    ],
    anupana: ['Warm A2 cow milk', 'Pure cow ghee', 'Wild raw honey'],
    contraindications: 'Do not take without fat vehicle (ghee/milk) in dry Vata conditions.',
    modernMechanism: 'Enhances synaptic neurotransmission, repairs damaged dendrites in hippocampus, modulates acetylcholinesterase.',
    shlokaDevanagari: 'ब्राह्मी हिमा सरा तिक्ता मेध्या स्वादु परा लघुः। आयुष्ये रसायनी स्वर्या स्मृतिप्रज्ञाप्रदा शुभा॥',
    shlokaTransliteration: 'brāhmī himā sarā tiktā medhyā svādu parā laghuḥ | āyuṣye rasāyanī svaryā smṛtiprajñāpradā śubhā ||',
    shlokaMeaning: 'Brahmi is cooling, bitter, sweet, and light. It is an incomparable Medhya (brain enhancer), lifespan prolonger, voice tuner, and granter of sublime intellect and memory.',
    idealTimeOfDay: 'Brahma Muhurta (05:00 AM)',
    accentColor: '#047857'
  }
];
