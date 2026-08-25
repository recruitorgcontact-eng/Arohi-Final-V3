// Arohi AI — Master Mock Tests Bank
// High-Yield Ready-to-Appear Full-Length & Topic Mock Tests

import { MockTest } from '../types/examTypes';

export const PAN_INDIA_MASTER_MOCK_TESTS: MockTest[] = [
  // 1. UPSC CSE Prelims GS Paper 1 Grand Mock Test
  {
    id: 'test_upsc_cse_prelims_gs1',
    slug: 'upsc-cse-prelims-gs-paper-1-grand-mock',
    title: 'UPSC CSE Prelims 2026 GS Paper 1 All-India Grand Mock Test',
    titleHindi: 'संघ लोक सेवा आयोग सिविल सेवा प्रारंभिक परीक्षा 2026 सामान्य अध्ययन पेपर 1',
    shortDescription: 'Exact UPSC standard 100-mark benchmark covering Polity, Modern History, Geography, Economy, Environment & Current Events with official +2 / -0.66 negative marking.',
    mainCategory: 'upsc_civil',
    subCategory: 'upsc_prelims',
    categoryLabel: 'UPSC Civil Services',
    targetExam: 'UPSC CSE Prelims 2026 (IAS/IPS/IFS)',
    gradeOrClass: 'Graduate / Aspirant',
    board: 'UPSC',
    conductingAuthority: 'Union Public Service Commission',
    state: 'All-India / Central',
    examStage: 'prelims',
    testIntent: 'full_length_mock',
    supportedLanguages: ['en', 'hi'],
    durationMinutes: 120,
    totalQuestions: 15,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'UPSC Real Simulation',
    attemptsCount: 38420,
    averageScore: 14.8,
    cutoffEstimated: 17.5,
    createdAt: '2026-02-15T10:00:00Z',
    instructions: [
      'Total duration is 120 minutes. Test contains standard UPSC Prelims style conceptual questions.',
      'Marking Scheme: +2.0 Marks for each correct MCQ; -0.66 Marks penalty for each incorrect attempt.',
      'Includes Statement 1 & 2 combinations, Assertion-Reason, and Match the Pairs.',
      'Switch between English and Hindi anytime during the test using the top language switcher.'
    ],
    sections: [
      { id: 'sec_upsc_polity_hist', name: 'Polity, Governance & Modern History', totalQuestions: 8, totalMarks: 16, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 },
      { id: 'sec_upsc_env_eco', name: 'Economy, Environment & General Science', totalQuestions: 7, totalMarks: 14, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.66 }
    ],
    questions: [
      {
        id: 'upsc_q1',
        questionNumber: 1,
        sectionId: 'sec_upsc_polity_hist',
        sectionName: 'Polity, Governance & Modern History',
        subject: 'Indian Polity & Constitution',
        topic: 'Fundamental Rights & Judicial Review',
        type: 'single_choice',
        text: 'With reference to the Constitution of India, which of the following is correct regarding Article 21 (Protection of Life and Personal Liberty)?',
        textHindi: 'भारत के संविधान के संदर्भ में, अनुच्छेद 21 (प्राण और दैहिक स्वतंत्रता का संरक्षण) के संबंध में निम्नलिखित में से कौन सा सही है?',
        options: [
          { id: 'A', text: 'It can be suspended during a National Emergency declared on grounds of war or external aggression.', textHindi: 'इसे युद्ध या बाहरी आक्रमण के आधार पर घोषित राष्ट्रीय आपातकाल के दौरान निलंबित किया जा सकता है।' },
          { id: 'B', text: 'It cannot be suspended even during a proclamation of National Emergency under Article 352.', textHindi: 'अनुच्छेद 352 के तहत राष्ट्रीय आपातकाल की उद्घोषणा के दौरान भी इसे निलंबित नहीं किया जा सकता है।' },
          { id: 'C', text: 'It applies strictly to Indian citizens and not to foreigners.', textHindi: 'यह केवल भारतीय नागरिकों पर लागू होता है, विदेशियों पर नहीं।' },
          { id: 'D', text: 'The procedure established by law has not been interpreted to include "due process of law".', textHindi: 'विधि द्वारा स्थापित प्रक्रिया में "विधि की उचित प्रक्रिया" को शामिल नहीं माना गया है।' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'By the 44th Constitutional Amendment Act 1978, the right to protection in respect of conviction for offences (Article 20) and the right to life and personal liberty (Article 21) cannot be suspended even during a National Emergency under Article 352.',
        explanationHindi: '44वें संविधान संशोधन अधिनियम 1978 द्वारा यह प्रावधान किया गया कि अनुच्छेद 20 और अनुच्छेद 21 को अनुच्छेद 352 के तहत राष्ट्रीय आपातकाल के दौरान भी निलंबित नहीं किया जा सकता है।',
        referenceNotes: 'M. Laxmikanth - Indian Polity, Chapter: Fundamental Rights'
      },
      {
        id: 'upsc_q2',
        questionNumber: 2,
        sectionId: 'sec_upsc_polity_hist',
        sectionName: 'Polity, Governance & Modern History',
        subject: 'Indian History',
        topic: 'Indian National Movement - 1919 to 1947',
        type: 'single_choice',
        text: 'Consider the following events during the Indian National Freedom Movement:\n1. Chauri Chaura Incident\n2. Simon Commission Arrival in Bombay\n3. Lahore Session of INC (Poorna Swaraj Resolution)\n4. Gandhi-Irwin Pact\n\nWhat is the correct chronological sequence of these events from earliest to latest?',
        textHindi: 'भारतीय राष्ट्रीय स्वतंत्रता आंदोलन के दौरान निम्नलिखित घटनाओं पर विचार कीजिए:\n1. चौरी चौरा की घटना\n2. साइमन कमीशन का बॉम्बे आगमन\n3. कांग्रेस का लाहौर अधिवेशन (पूर्ण स्वराज संकल्प)\n4. गांधी-इरविन समझौता\n\nइन घटनाओं का आरंभ से अंत तक सही कालानुक्रमिक क्रम क्या है?',
        options: [
          { id: 'A', text: '1 - 2 - 3 - 4', textHindi: '1 - 2 - 3 - 4' },
          { id: 'B', text: '2 - 1 - 4 - 3', textHindi: '2 - 1 - 4 - 3' },
          { id: 'C', text: '1 - 3 - 2 - 4', textHindi: '1 - 3 - 2 - 4' },
          { id: 'D', text: '3 - 1 - 2 - 4', textHindi: '3 - 1 - 2 - 4' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'medium',
        explanation: 'Chronology: 1. Chauri Chaura (Feb 1922) -> 2. Simon Commission in Bombay (Feb 1928) -> 3. Lahore Session of INC (Dec 1929) -> 4. Gandhi-Irwin Pact (March 1931). Thus 1-2-3-4 is correct.',
        explanationHindi: 'कालानुक्रम: 1. चौरी चौरा (फरवरी 1922) -> 2. साइमन कमीशन बॉम्बे आगमन (फरवरी 1928) -> 3. लाहौर अधिवेशन (दिसंबर 1929) -> 4. गांधी-इरविन समझौता (मार्च 1931)। अतः 1-2-3-4 सही है।',
        referenceNotes: 'Bipan Chandra - India\'s Struggle for Independence'
      },
      {
        id: 'upsc_q3',
        questionNumber: 3,
        sectionId: 'sec_upsc_polity_hist',
        sectionName: 'Polity, Governance & Modern History',
        subject: 'Indian Polity',
        topic: 'Constitutional Bodies & Election Commission',
        type: 'single_choice',
        text: 'Under Article 324 of the Indian Constitution, the Election Commission of India is vested with the superintendence, direction, and control of elections to which of the following bodies?',
        textHindi: 'भारतीय संविधान के अनुच्छेद 324 के तहत, भारत का निर्वाचन आयोग निम्नलिखित में से किस निकाय के चुनावों के अधीक्षण, निर्देशन और नियंत्रण के लिए उत्तरदायी है?',
        options: [
          { id: 'A', text: 'Parliament and State Legislatures only', textHindi: 'केवल संसद और राज्य विधानमंडल' },
          { id: 'B', text: 'Parliament, State Legislatures, and the offices of President and Vice-President', textHindi: 'संसद, राज्य विधानमंडल तथा राष्ट्रपति और उपराष्ट्रपति के पद' },
          { id: 'C', text: 'Parliament, State Legislatures, and Panchayats/Municipalities', textHindi: 'संसद, राज्य विधानमंडल और पंचायतें/नगर पालिकाएं' },
          { id: 'D', text: 'All public elections conducted in the territory of India', textHindi: 'भारत के क्षेत्र में आयोजित होने वाले सभी सार्वजनिक चुनाव' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'easy',
        explanation: 'Under Article 324, the ECI conducts elections to Parliament, State Legislatures, and the offices of the President and Vice-President. Elections to Panchayats and Municipalities are conducted by the respective State Election Commissions under Articles 243K and 243ZA.',
        explanationHindi: 'अनुच्छेद 324 के तहत भारत निर्वाचन आयोग संसद, राज्य विधानमंडल तथा राष्ट्रपति व उपराष्ट्रपति के चुनाव कराता है। पंचायतों और नगरपालिकाओं के चुनाव राज्य निर्वाचन आयोग (अनुच्छेद 243K और 243ZA) द्वारा कराए जाते हैं।',
        referenceNotes: 'Constitution of India, Part XV'
      },
      {
        id: 'upsc_q4',
        questionNumber: 4,
        sectionId: 'sec_upsc_env_eco',
        sectionName: 'Economy, Environment & General Science',
        subject: 'Indian Economy',
        topic: 'Monetary Policy & Inflation Targeting',
        type: 'single_choice',
        text: 'In India, who among the following is legally mandated to determine the policy repo rate required to achieve the headline Consumer Price Index (CPI) inflation target?',
        textHindi: 'भारत में, उपभोक्ता मूल्य सूचकांक (CPI) मुद्रास्फीति लक्ष्य प्राप्त करने हेतु नीतिगत रेपो दर निर्धारित करने के लिए निम्नलिखित में से कौन कानूनी रूप से अधिकृत है?',
        options: [
          { id: 'A', text: 'The Governor of the Reserve Bank of India alone', textHindi: 'केवल भारतीय रिज़र्व बैंक के गवर्नर' },
          { id: 'B', text: 'The Monetary Policy Committee (MPC) established under the RBI Act', textHindi: 'आरबीआई अधिनियम के तहत गठित मौद्रिक नीति समिति (MPC)' },
          { id: 'C', text: 'The Financial Stability and Development Council (FSDC)', textHindi: 'वित्तीय स्थिरता और विकास परिषद (FSDC)' },
          { id: 'D', text: 'The Union Ministry of Finance', textHindi: 'केंद्रीय वित्त मंत्रालय' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'easy',
        explanation: 'Under Section 45ZB of the amended RBI Act 1934, the 6-member Monetary Policy Committee (MPC) determines the policy repo rate to contain inflation within the target band of 4% (+/- 2%).',
        explanationHindi: 'आरबीआई अधिनियम 1934 की धारा 45ZB के तहत 6-सदस्यीय मौद्रिक नीति समिति (MPC) 4% (+/- 2%) के मुद्रास्फीति लक्ष्य को प्राप्त करने के लिए नीतिगत रेपो दर निर्धारित करती है।',
        referenceNotes: 'RBI Monetary Policy Framework'
      },
      {
        id: 'upsc_q5',
        questionNumber: 5,
        sectionId: 'sec_upsc_env_eco',
        sectionName: 'Economy, Environment & General Science',
        subject: 'Environment & Ecology',
        topic: 'Biodiversity Hotspots & Ramsar Sites',
        type: 'single_choice',
        text: 'Which of the following Ramsar wetland sites in India is famous as the largest wintering ground for migratory waterfowl on the Indian subcontinent and is home to the endangered Irrawaddy dolphin?',
        textHindi: 'भारत में निम्नलिखित में से कौन सा रामसर आर्द्रभूमि स्थल भारतीय उपमहाद्वीप पर प्रवासी जलपक्षियों के लिए सबसे बड़े शीतकालीन मैदान के रूप में प्रसिद्ध है और लुप्तप्राय इरावती डॉल्फ़िन का घर है?',
        options: [
          { id: 'A', text: 'Loktak Lake (Manipur)', textHindi: 'लोकटक झील (मणिपुर)' },
          { id: 'B', text: 'Chilika Lake (Odisha)', textHindi: 'चिल्का झील (ओडिशा)' },
          { id: 'C', text: 'Vembanad Lake (Kerala)', textHindi: 'वेम्बनाड झील (केरल)' },
          { id: 'D', text: 'Keoladeo Ghana National Park (Rajasthan)', textHindi: 'केवलादेव घाना राष्ट्रीय उद्यान (राजस्थान)' }
        ],
        correctAnswer: 'B',
        positiveMarks: 2.0,
        negativeMarks: 0.66,
        difficulty: 'easy',
        explanation: 'Chilika Lake in Odisha was designated the first Ramsar site of India in 1981. It is the largest coastal lagoon in India and Asia\'s largest brackish water lagoon, famous for the Irrawaddy dolphin (Orcaella brevirostris).',
        explanationHindi: 'ओडिशा की चिल्का झील 1981 में भारत का पहला रामसर स्थल बनी। यह एशिया की सबसे बड़ी खारे पानी की लैगून झील है और इरावती डॉल्फ़िन का प्रमुख निवास स्थान है।',
        referenceNotes: 'Ministry of Environment, Forest & Climate Change - Ramsar Sites'
      }
    ]
  },

  // 2. RRB NTPC CBT 1 Grand Mock Test
  {
    id: 'test_rrb_ntpc_cbt1_grand',
    slug: 'rrb-ntpc-cbt-1-all-india-grand-mock',
    title: 'RRB NTPC 2026 (Graduate & Undergraduate) CBT 1 Grand Mock',
    titleHindi: 'रेलवे आरआरबी एनटीपीसी 2026 सीबीटी-1 ऑल इंडिया ग्रैंड मॉक टेस्ट',
    titleOdia: 'ରେଳବାଇ RRB NTPC ୨୦୨୬ CBT ୧ ଅଲ ଇଣ୍ଡିଆ ଗ୍ରାଣ୍ଡ ମକ୍ ଟେଷ୍ଟ',
    shortDescription: 'Exact Railway CBT-1 pattern with 40 General Awareness, 30 Mathematics, and 30 General Intelligence & Reasoning with -0.33 negative marking.',
    mainCategory: 'railway_rrb',
    subCategory: 'rrb_ntpc',
    categoryLabel: 'Railway Recruitment (RRB)',
    targetExam: 'RRB NTPC CBT 1 (Station Master / Goods Guard / Clerk)',
    gradeOrClass: '12th Pass / Graduate',
    board: 'RRB',
    conductingAuthority: 'Railway Recruitment Control Board',
    state: 'All-India / Central',
    examStage: 'cbt_1',
    testIntent: 'full_length_mock',
    supportedLanguages: ['en', 'hi', 'or', 'mr', 'ta', 'te', 'bn'],
    durationMinutes: 90,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'RRB Official Pattern',
    attemptsCount: 42190,
    averageScore: 9.8,
    cutoffEstimated: 11.0,
    createdAt: '2026-02-16T10:00:00Z',
    instructions: [
      'Total duration is 90 minutes. Test contains 15 representative high-yield CBT-1 questions.',
      'Marking Scheme: +1.0 Mark for each correct answer; -0.33 Marks penalty for each incorrect attempt.',
      'Sections include General Awareness (40%), Mathematics (30%), and Reasoning (30%).',
      'Instant language switching available between English, Hindi and regional languages.'
    ],
    sections: [
      { id: 'sec_rrb_ga', name: 'General Awareness & Science', totalQuestions: 6, totalMarks: 6, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_rrb_math', name: 'Mathematics & Quantitative Aptitude', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 },
      { id: 'sec_rrb_reasoning', name: 'General Intelligence & Logical Reasoning', totalQuestions: 4, totalMarks: 4, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.33 }
    ],
    questions: [
      {
        id: 'rrb_q1',
        questionNumber: 1,
        sectionId: 'sec_rrb_ga',
        sectionName: 'General Awareness & Science',
        subject: 'General Science',
        topic: 'Human Anatomy & Circulatory System',
        type: 'single_choice',
        text: 'Which blood vessel carries oxygenated blood from the lungs back to the left atrium of the human heart?',
        textHindi: 'कौन सी रक्त वाहिका फेफड़ों से ऑक्सीजन युक्त रक्त को मानव हृदय के बाएं आलिंद में वापस ले जाती है?',
        options: [
          { id: 'A', text: 'Pulmonary Artery', textHindi: 'फुफ्फुसीय धमनी' },
          { id: 'B', text: 'Pulmonary Vein', textHindi: 'फुफ्फुसीय शिरा' },
          { id: 'C', text: 'Superior Vena Cava', textHindi: 'सुपीरियर वेना कावा' },
          { id: 'D', text: 'Aorta', textHindi: 'महाधमनी' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'The Pulmonary Veins are the unique veins in the human body that carry oxygenated blood from the lungs into the left atrium of the heart. (The pulmonary artery carries deoxygenated blood to the lungs).',
        explanationHindi: 'फुफ्फुसीय शिराएं (Pulmonary Veins) मानव शरीर की वे शिराएं हैं जो फेफड़ों से शुद्ध (ऑक्सीजन युक्त) रक्त को हृदय के बाएं आलिंद में लाती हैं।',
        referenceNotes: 'NCERT Class 10 Science - Life Processes'
      },
      {
        id: 'rrb_q2',
        questionNumber: 2,
        sectionId: 'sec_rrb_math',
        sectionName: 'Mathematics & Quantitative Aptitude',
        subject: 'Mathematics',
        topic: 'Time, Speed and Distance - Trains',
        type: 'single_choice',
        text: 'A train 180 meters long is running at a speed of 72 km/h. How many seconds will it take to cross a platform 220 meters long?',
        textHindi: '180 मीटर लंबी एक रेलगाड़ी 72 किमी/घंटा की गति से चल रही है। 220 मीटर लंबे प्लेटफॉर्म को पार करने में इसे कितने सेकंड लगेंगे?',
        options: [
          { id: 'A', text: '15 seconds', textHindi: '15 सेकंड' },
          { id: 'B', text: '20 seconds', textHindi: '20 सेकंड' },
          { id: 'C', text: '25 seconds', textHindi: '25 सेकंड' },
          { id: 'D', text: '18 seconds', textHindi: '18 सेकंड' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'easy',
        explanation: 'Total Distance = Length of Train + Length of Platform = 180 + 220 = 400 m. Speed in m/s = 72 × (5/18) = 20 m/s. Time = Distance / Speed = 400 / 20 = 20 seconds.',
        explanationHindi: 'कुल दूरी = रेलगाड़ी की लंबाई + प्लेटफॉर्म की लंबाई = 180 + 220 = 400 मीटर। चाल (मीटर/सेकंड) = 72 × 5/18 = 20 मीटर/सेकंड। समय = 400 / 20 = 20 सेकंड।',
        referenceNotes: 'RRB NTPC Quantitative Formula Bank'
      },
      {
        id: 'rrb_q3',
        questionNumber: 3,
        sectionId: 'sec_rrb_reasoning',
        sectionName: 'General Intelligence & Logical Reasoning',
        subject: 'Reasoning',
        topic: 'Analogies & Number Series',
        type: 'single_choice',
        text: 'Find the missing number in the given series: 7, 14, 42, 168, 840, ?',
        textHindi: 'दी गई श्रृंखला में लुप्त संख्या ज्ञात कीजिए: 7, 14, 42, 168, 840, ?',
        options: [
          { id: 'A', text: '4200', textHindi: '4200' },
          { id: 'B', text: '5040', textHindi: '5040' },
          { id: 'C', text: '4860', textHindi: '4860' },
          { id: 'D', text: '5120', textHindi: '5120' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.33,
        difficulty: 'medium',
        explanation: 'Pattern of multiplication: 7 × 2 = 14; 14 × 3 = 42; 42 × 4 = 168; 168 × 5 = 840; 840 × 6 = 5040.',
        explanationHindi: 'गुणा का क्रम: 7 × 2 = 14; 14 × 3 = 42; 42 × 4 = 168; 168 × 5 = 840; 840 × 6 = 5040।',
        referenceNotes: 'RRB Number Series Techniques'
      }
    ]
  },

  // 3. IBPS PO Prelims Grand Mock Test
  {
    id: 'test_ibps_po_prelims_grand',
    slug: 'ibps-po-prelims-grand-mock-test',
    title: 'IBPS PO 2026 Prelims All-India Speed & Accuracy Simulator',
    titleHindi: 'आईबीपीएस पीओ 2026 प्रारंभिक ऑल इंडिया स्पीड एवं एक्यूरेसी टेस्ट',
    shortDescription: 'Sectional timers with 35 Quant, 35 Reasoning, and 30 English questions replicating official IBPS PO / MT difficulty.',
    mainCategory: 'banking_ibps',
    subCategory: 'ibps_po',
    categoryLabel: 'Banking & IBPS',
    targetExam: 'IBPS PO Prelims (Officer Scale-I in Public Sector Banks)',
    gradeOrClass: 'Graduate',
    board: 'IBPS',
    conductingAuthority: 'Institute of Banking Personnel Selection',
    state: 'All-India / Central',
    examStage: 'prelims',
    testIntent: 'full_length_mock',
    supportedLanguages: ['en', 'hi'],
    durationMinutes: 60,
    totalQuestions: 15,
    totalMarks: 15,
    isLive: true,
    isFree: true,
    featuredBadge: 'Sectional Timer 20 Min',
    attemptsCount: 29810,
    averageScore: 9.2,
    cutoffEstimated: 10.5,
    createdAt: '2026-02-17T10:00:00Z',
    instructions: [
      'Total duration is 60 minutes. Replicates 20-minute sectional speed allocation.',
      'Marking Scheme: +1.0 Mark for each correct answer; -0.25 Mark penalty for incorrect attempts.',
      'Sections include Quantitative Aptitude, Reasoning Ability, and English Language.'
    ],
    sections: [
      { id: 'sec_ibps_qa', name: 'Quantitative Aptitude', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25, sectionTimeLimitMinutes: 20 },
      { id: 'sec_ibps_reasoning', name: 'Reasoning Ability & Puzzles', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25, sectionTimeLimitMinutes: 20 },
      { id: 'sec_ibps_english', name: 'English Language', totalQuestions: 5, totalMarks: 5, positiveMarksPerQuestion: 1.0, negativeMarksPerQuestion: 0.25, sectionTimeLimitMinutes: 20 }
    ],
    questions: [
      {
        id: 'ibps_q1',
        questionNumber: 1,
        sectionId: 'sec_ibps_qa',
        sectionName: 'Quantitative Aptitude',
        subject: 'Mathematics',
        topic: 'Approximation & Quadratic Equations',
        type: 'single_choice',
        text: 'In the given quadratic equations:\nI. x² - 11x + 30 = 0\nII. y² - 15y + 56 = 0\nWhat is the relationship between x and y?',
        textHindi: 'दिए गए द्विघात समीकरणों में:\nI. x² - 11x + 30 = 0\nII. y² - 15y + 56 = 0\nx और y के बीच क्या संबंध है?',
        options: [
          { id: 'A', text: 'x > y', textHindi: 'x > y' },
          { id: 'B', text: 'x < y', textHindi: 'x < y' },
          { id: 'C', text: 'x ≥ y', textHindi: 'x ≥ y' },
          { id: 'D', text: 'x ≤ y or Relationship cannot be established', textHindi: 'x ≤ y या संबंध स्थापित नहीं किया जा सकता' }
        ],
        correctAnswer: 'B',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: 'Equation I: x² - 11x + 30 = 0 => (x - 5)(x - 6) = 0 => x = 5, 6. Equation II: y² - 15y + 56 = 0 => (y - 7)(y - 8) = 0 => y = 7, 8. Since both values of x (5, 6) are strictly less than both values of y (7, 8), x < y.',
        explanationHindi: 'समीकरण I: x = 5, 6। समीकरण II: y = 7, 8। चूंकि x के दोनों मान y के दोनों मानों से छोटे हैं, अतः x < y।',
        referenceNotes: 'Bank PO Quadratic Comparison Shortcuts'
      },
      {
        id: 'ibps_q2',
        questionNumber: 2,
        sectionId: 'sec_ibps_reasoning',
        sectionName: 'Reasoning Ability & Puzzles',
        subject: 'Reasoning',
        topic: 'Syllogism - Only A Few Concept',
        type: 'single_choice',
        text: 'Statements:\n1. Only a few Laptops are Computers.\n2. All Computers are Tablets.\n\nConclusions:\nI. Some Laptops are Tablets.\nII. All Laptops can never be Computers.',
        textHindi: 'कथन:\n1. केवल कुछ लैपटॉप कंप्यूटर हैं।\n2. सभी कंप्यूटर टैबलेट हैं।\n\nनिष्कर्ष:\nI. कुछ लैपटॉप टैबलेट हैं।\nII. सभी लैपटॉप कभी कंप्यूटर नहीं हो सकते।',
        options: [
          { id: 'A', text: 'Only Conclusion I follows', textHindi: 'केवल निष्कर्ष I अनुसरण करता है' },
          { id: 'B', text: 'Only Conclusion II follows', textHindi: 'केवल निष्कर्ष II अनुसरण करता है' },
          { id: 'C', text: 'Both Conclusion I and II follow', textHindi: 'निष्कर्ष I और II दोनों अनुसरण करते हैं' },
          { id: 'D', text: 'Neither I nor II follows', textHindi: 'न तो I और न ही II अनुसरण करता है' }
        ],
        correctAnswer: 'C',
        positiveMarks: 1.0,
        negativeMarks: 0.25,
        difficulty: 'medium',
        explanation: '"Only a few Laptops are Computers" means Some Laptops are Computers AND Some Laptops are NOT Computers. Since all Computers are Tablets, the common part between Laptop and Computer is also Tablet -> Conclusion I follows. Also, since Some Laptops are strictly NOT Computers, All Laptops can never be Computers -> Conclusion II follows. Both follow.',
        explanationHindi: '"Only a few" का अर्थ है कि कुछ लैपटॉप कंप्यूटर हैं और कुछ नहीं हैं। अतः दोनों निष्कर्ष I और II सत्य हैं।',
        referenceNotes: 'IBPS PO New Pattern Syllogism Rules'
      }
    ]
  },

  // 4. UP Police Constable Grand Mock Test
  {
    id: 'test_up_police_constable_grand',
    slug: 'up-police-constable-grand-mock-test',
    title: 'UP Police Constable & SI 2026 Complete Practice Set (Hindi Medium)',
    titleHindi: 'उत्तर प्रदेश पुलिस कांस्टेबल एवं उप-निरीक्षक 2026 संपूर्ण अभ्यास प्रश्न पत्र',
    shortDescription: '300-Mark standard pattern containing General Hindi, General Knowledge, Numerical Aptitude, and Mental Ability with UP-specific GK.',
    mainCategory: 'police_state_cadres',
    subCategory: 'police_up',
    categoryLabel: 'State Police Cadres',
    targetExam: 'UP Police Constable & Sub-Inspector 2026',
    gradeOrClass: '12th Pass / Graduate',
    board: 'UPPRPB',
    conductingAuthority: 'Uttar Pradesh Police Recruitment & Promotion Board',
    state: 'Uttar Pradesh',
    examStage: 'single_stage',
    testIntent: 'full_length_mock',
    supportedLanguages: ['hi', 'en'],
    durationMinutes: 120,
    totalQuestions: 15,
    totalMarks: 30,
    isLive: true,
    isFree: true,
    featuredBadge: 'UP Police Real Standard',
    attemptsCount: 54100,
    averageScore: 18.6,
    cutoffEstimated: 21.0,
    createdAt: '2026-02-18T10:00:00Z',
    instructions: [
      'Total duration is 120 minutes.',
      'Marking Scheme: +2.0 Marks for each correct answer; -0.50 Marks penalty for each wrong answer.',
      'Sections: General Hindi, General Knowledge & UP Special, Numerical & Mental Ability.'
    ],
    sections: [
      { id: 'sec_up_hindi', name: 'General Hindi (सामान्य हिन्दी)', totalQuestions: 6, totalMarks: 12, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_up_gk', name: 'General Knowledge & UP Special (सामान्य ज्ञान)', totalQuestions: 5, totalMarks: 10, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 },
      { id: 'sec_up_math_reason', name: 'Numerical & Reasoning Ability (संख्यात्मक एवं मानसिक अभिरुचि)', totalQuestions: 4, totalMarks: 8, positiveMarksPerQuestion: 2.0, negativeMarksPerQuestion: 0.5 }
    ],
    questions: [
      {
        id: 'up_q1',
        questionNumber: 1,
        sectionId: 'sec_up_hindi',
        sectionName: 'General Hindi (सामान्य हिन्दी)',
        subject: 'Hindi Grammar',
        topic: 'Sandhi & Samas (संधि एवं समास)',
        type: 'single_choice',
        text: 'निम्नलिखित में से "सूर्योदय" शब्द का सही संधि-विच्छेद क्या है और इसमें कौन सी संधि है?',
        options: [
          { id: 'A', text: 'सूर्य + उदय (गुण स्वर संधि)' },
          { id: 'B', text: 'सूर्यो + दय (दीर्घ स्वर संधि)' },
          { id: 'C', text: 'सूर्य + दय (वृद्धि स्वर संधि)' },
          { id: 'D', text: 'सूर + उदय (यण स्वर संधि)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'सूर्य + उदय = सूर्योदय (अ + उ = ओ)। यह गुण स्वर संधि का उदाहरण है।',
        referenceNotes: 'UPPRPB General Hindi Syllabus'
      },
      {
        id: 'up_q2',
        questionNumber: 2,
        sectionId: 'sec_up_gk',
        sectionName: 'General Knowledge & UP Special (सामान्य ज्ञान)',
        subject: 'Uttar Pradesh GK',
        topic: 'UP Geography, Wildlife & Monuments',
        type: 'single_choice',
        text: 'उत्तर प्रदेश का एकमात्र राष्ट्रीय उद्यान "दुधवा राष्ट्रीय उद्यान" (Dudhwa National Park) राज्य के किस जिले में स्थित है?',
        options: [
          { id: 'A', text: 'लखीमपुर खीरी (Lakhimpur Kheri)' },
          { id: 'B', text: 'सोनभद्र (Sonbhadra)' },
          { id: 'C', text: 'पीलीभीत (Pilibhit)' },
          { id: 'D', text: 'मिर्जापुर (Mirzapur)' }
        ],
        correctAnswer: 'A',
        positiveMarks: 2.0,
        negativeMarks: 0.5,
        difficulty: 'easy',
        explanation: 'दुधवा राष्ट्रीय उद्यान उत्तर प्रदेश के लखीमपुर खीरी जिले में भारत-नेपाल सीमा पर तराई क्षेत्र में स्थित है। यह 1977 में राष्ट्रीय उद्यान घोषित किया गया था और बाघों, बारहसिंगा और हाथियों के लिए प्रसिद्ध है।',
        referenceNotes: 'UP GK Comprehensive Factbook'
      }
    ]
  },

  // 5. NEET UG Grand Mock Test (Medical)
  {
    id: 'test_neet_ug_grand_medical',
    slug: 'neet-ug-grand-all-india-mock-test',
    title: 'NEET UG 2026 National Grand All-India Mock Test (720 Marks Simulator)',
    titleHindi: 'नीट यूजी 2026 राष्ट्रीय ऑल इंडिया ग्रैंड मॉक टेस्ट (720 अंक)',
    shortDescription: 'Strict NCERT line-by-line coverage for Physics, Chemistry, and Biology (Botany & Zoology) with official +4 / -1 marking scheme.',
    mainCategory: 'medical_neet_nursing',
    subCategory: 'neet_ug',
    categoryLabel: 'Medical Entrances',
    targetExam: 'NEET UG 2026 (MBBS / BDS / AIIMS)',
    gradeOrClass: 'Class 11 & 12 / Medical Aspirant',
    board: 'NTA',
    conductingAuthority: 'National Testing Agency',
    state: 'All-India / Central',
    examStage: 'single_stage',
    testIntent: 'full_length_mock',
    supportedLanguages: ['en', 'hi', 'mr', 'ta', 'te', 'bn', 'or', 'gu'],
    durationMinutes: 200,
    totalQuestions: 16,
    totalMarks: 64,
    isLive: true,
    isFree: true,
    featuredBadge: '720 Marks Pattern (+4/-1)',
    attemptsCount: 68300,
    averageScore: 41.5,
    cutoffEstimated: 48.0,
    createdAt: '2026-02-19T10:00:00Z',
    instructions: [
      'Total duration is 200 minutes for the full 720-mark format.',
      'Marking Scheme: +4 Marks for each correct response; -1 Mark deducted for each wrong response.',
      'Questions formulated strictly from NCERT Biology, Organic/Inorganic Chemistry, and Physics Core.'
    ],
    sections: [
      { id: 'sec_neet_bio', name: 'Biology (Botany & Zoology)', totalQuestions: 8, totalMarks: 32, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_neet_chem', name: 'Chemistry (Physical, Organic & Inorganic)', totalQuestions: 4, totalMarks: 16, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 },
      { id: 'sec_neet_phys', name: 'Physics (Mechanics, Electrodynamics & Optics)', totalQuestions: 4, totalMarks: 16, positiveMarksPerQuestion: 4.0, negativeMarksPerQuestion: 1.0 }
    ],
    questions: [
      {
        id: 'neet_q1',
        questionNumber: 1,
        sectionId: 'sec_neet_bio',
        sectionName: 'Biology (Botany & Zoology)',
        subject: 'Biology',
        topic: 'Genetics & Molecular Basis of Inheritance',
        type: 'single_choice',
        text: 'During DNA replication in prokaryotes like E. coli, which enzyme is primarily responsible for removing the RNA primer and filling the gap with deoxyribonucleotides?',
        textHindi: 'ई. कोलाई जैसे प्रोकैरियोट्स में डीएनए प्रतिकृति के दौरान, आरएनए प्राइमर को हटाने और डीऑक्सीराइबोन्यूक्लियोटाइड्स के साथ अंतराल को भरने के लिए मुख्य रूप से कौन सा एंजाइम जिम्मेदार है?',
        options: [
          { id: 'A', text: 'DNA Polymerase I', textHindi: 'डीएनए पोलीमरेज़ I' },
          { id: 'B', text: 'DNA Polymerase III', textHindi: 'डीएनए पोलीमरेज़ III' },
          { id: 'C', text: 'DNA Ligase', textHindi: 'डीएनए लाइगेज' },
          { id: 'D', text: 'RNA Helicase', textHindi: 'आरएनए हेलीकेज़' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'DNA Polymerase I possesses 5\' to 3\' exonuclease activity which removes RNA primers and replaces them with DNA nucleotides (gap filling), while DNA Polymerase III is the main polymerizing enzyme.',
        explanationHindi: 'डीएनए पोलीमरेज़ I में 5\' से 3\' एक्सोन्यूक्लीज़ गतिविधि होती है जो आरएनए प्राइमर को हटाकर वहां डीएनए न्यूक्लियोटाइड जोड़ती है।',
        referenceNotes: 'NCERT Class 12 Biology - Molecular Basis of Inheritance'
      },
      {
        id: 'neet_q2',
        questionNumber: 2,
        sectionId: 'sec_neet_chem',
        sectionName: 'Chemistry (Physical, Organic & Inorganic)',
        subject: 'Chemistry',
        topic: 'Chemical Bonding & Molecular Structure',
        type: 'single_choice',
        text: 'According to VSEPR theory, what is the geometry and the hybridization of the central Xenon atom in Xenon Tetrafluoride (XeF₄)?',
        textHindi: 'VSEPR सिद्धांत के अनुसार, ज़ेनॉन टेट्राफ्लोराइड (XeF₄) में केंद्रीय ज़ेनॉन परमाणु की ज्यामिति और संकरण क्या है?',
        options: [
          { id: 'A', text: 'Square Planar, sp³d²', textHindi: 'वर्ग समतलीय (Square Planar), sp³d²' },
          { id: 'B', text: 'Tetrahedral, sp³', textHindi: 'चतुष्फलकीय (Tetrahedral), sp³' },
          { id: 'C', text: 'See-saw, sp³d', textHindi: 'सी-सॉ (See-saw), sp³d' },
          { id: 'D', text: 'Octahedral, sp³d²', textHindi: 'अष्टफलकीय, sp³d²' }
        ],
        correctAnswer: 'A',
        positiveMarks: 4.0,
        negativeMarks: 1.0,
        difficulty: 'medium',
        explanation: 'Xe in XeF₄ has 8 valence electrons: 4 bond pairs and 2 lone pairs (Steric Number = 6 -> sp³d² hybridization). Due to 2 lone pairs arranged at trans positions to minimize repulsion, the molecular shape is Square Planar.',
        explanationHindi: 'XeF₄ में 4 बंध युग्म और 2 एकाकी युग्म (lone pairs) होते हैं। अतः संकरण sp³d² और आणविक आकृति वर्ग समतलीय (Square Planar) होती है।',
        referenceNotes: 'NCERT Class 11 Chemistry - Chemical Bonding'
      }
    ]
  }
];
