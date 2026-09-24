// Central and State Government Schemes, Legal Protections, and Welfare Frameworks for Divyangjan (Persons with Disabilities / PwD)
// Maintained under the Arohi Saksham Divyangjan Empowerment Initiative

export interface DivyangjanScheme {
  id: string;
  title: string;
  hindiTitle: string;
  odiaTitle: string;
  category: 'financial-aid' | 'employment' | 'education' | 'concessions' | 'assistive-devices' | 'health-insurance';
  ministry: string;
  shortSummary: string;
  eligibility: string[];
  keyBenefits: string[];
  documentsRequired: string[];
  applicationPortal: string;
  portalUrl: string;
  officialHelpline?: string;
  tags: string[];
}

export const DIVYANGJAN_SCHEMES_DIRECTORY: DivyangjanScheme[] = [
  {
    id: 'adip-scheme',
    title: 'ADIP Scheme (Assistance to Disabled Persons for Aids & Appliances)',
    hindiTitle: 'एडिप योजना (दिव्यांगजनों को सहायक उपकरण वितरण)',
    odiaTitle: 'ଏଡିପ ଯୋଜନା (ସହାୟକ ଉପକରଣ ଓ ଯନ୍ତ୍ରପାତି ଯୋଗାଣ)',
    category: 'assistive-devices',
    ministry: 'Ministry of Social Justice and Empowerment (DEPwD), Govt of India',
    shortSummary: 'Provides high-quality, scientifically manufactured modern assistive aids and appliances (smart sonar canes, motorized tricycles, braille devices, hearing aids, wheelchairs) free of cost or at high government subsidies.',
    eligibility: [
      'Indian citizen with 40% or more benchmark disability (certified with UDID / Disability Certificate).',
      'Monthly family income up to ₹20,000: 100% Free aid/appliance.',
      'Monthly family income ₹20,001 to ₹30,000: 50% cost subsidy.',
      'Cochlear Implant surgery subsidy up to ₹6,00,000 for children under 5 years.',
      'Aids can be availed again after 3 years for adults, 1 year for children.'
    ],
    keyBenefits: [
      '100% Free modern motorized tricycles, wheelchair, hearing aids, and artificial limbs.',
      'Subsidized smart sonar assistive IoT canes (like Arohi Care DLI010).',
      'Free distribution camps organized across all 700+ districts by ALIMCO.',
      'Special computerized and electronic braille equipment for students.'
    ],
    documentsRequired: [
      'UDID Card or Disability Certificate (40%+ benchmark)',
      'Income Certificate (from Tahsildar / SDM / BDO / Gazetted Officer)',
      'Aadhaar Card copy',
      'Passport size photograph showing disability',
      'Residence Certificate / Ration Card / Voter ID'
    ],
    applicationPortal: 'Department of Empowerment of Persons with Disabilities / ALIMCO',
    portalUrl: 'https://disabilityaffairs.gov.in',
    officialHelpline: '1800-180-5129',
    tags: ['ADIP', 'Free Wheelchair', 'Tricycle', 'Sonar Cane', 'Cochlear Implant', 'ALIMCO']
  },
  {
    id: 'udid-card',
    title: 'UDID (Unique Disability Identity Card) National Registration',
    hindiTitle: 'स्वावलंबन यूडीआईडी कार्ड राष्ट्रीय पंजीकरण',
    odiaTitle: 'ସ୍ୱାବଲମ୍ବନ UDID କାର୍ଡ଼ ରାଷ୍ଟ୍ରୀୟ ପଞ୍ଜୀକରଣ',
    category: 'financial-aid',
    ministry: 'DEPwD, Ministry of Social Justice & Empowerment, Govt of India',
    shortSummary: 'A single, digitally verified national identity card recognized across all Indian states and union territories, eliminating the need to carry physical hospital certificates.',
    eligibility: [
      'Any Indian citizen having any of the 21 specified disabilities under the RPwD Act 2016.',
      'Valid for both permanent disabilities (lifetime card) and temporary disabilities (renewal basis).'
    ],
    keyBenefits: [
      'Universal acceptance across Indian Railways, bus transport, universities, banks, and hospitals.',
      'Seamless digital verification via QR code and Swavlamban database.',
      'Automatic eligibility verification for state pension and scholarship disbursement.',
      'Digitally signed e-Disability Certificate instantly downloadable as PDF.'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Recent color passport photograph',
      'Address proof',
      'Existing hospital disability certificate (if previously issued)'
    ],
    applicationPortal: 'Swavlamban Card Portal (Official)',
    portalUrl: 'https://www.swavlambancard.gov.in',
    officialHelpline: '011-24365019',
    tags: ['UDID', 'Swavlamban', 'Disability Certificate', 'Universal Card', 'DEPwD']
  },
  {
    id: 'rpwd-4-percent-reservation',
    title: 'RPwD Act 2016: 4% Mandatory Government Job Reservation',
    hindiTitle: 'दिव्यांगजन अधिकार अधिनियम 2016: 4% सरकारी नौकरी आरक्षण',
    odiaTitle: 'RPwD ଅଧିନିୟମ ୨୦୧୬: ୪% ସରକାରୀ ଚାକିରି ସଂରକ୍ଷଣ',
    category: 'employment',
    ministry: 'DoPT & Ministry of Social Justice and Empowerment, Govt of India',
    shortSummary: 'Section 34 of the Rights of Persons with Disabilities Act 2016 guarantees 4% horizontal reservation in all Government appointments (Central, State, PSUs, Autonomous Bodies) across Groups A, B, C, and D.',
    eligibility: [
      'Indian citizens with not less than 40% benchmark disability in specified categories.',
      'Applicable in direct recruitment and promotions as per DoPT guidelines.'
    ],
    keyBenefits: [
      '1% reservation for Blindness & Low Vision (Category A).',
      '1% reservation for Deaf & Hard of Hearing (Category B).',
      '1% reservation for Locomotor disability, cerebral palsy, dwarfism, acid attack victims (Category C).',
      '1% reservation for Autism, Intellectual Disability, Specific Learning Disability & Mental Illness / Multiple Disabilities (Category D & E).',
      '10 Years Upper Age Relaxation across General/OBC/SC/ST PwD candidates (UPSC, SSC, IBPS, Railways).',
      '100% Application Fee Exemption in virtually all public recruitment tests.'
    ],
    documentsRequired: [
      'UDID Card / Valid Benchmark Disability Certificate',
      'Educational Certificates',
      'Category Certificate (SC/ST/OBC/EWS if applicable alongside PwD)'
    ],
    applicationPortal: 'National Career Service for PwD / UPSC / SSC Portals',
    portalUrl: 'https://www.ncs.gov.in',
    officialHelpline: '1800-425-1514',
    tags: ['4% Reservation', 'RPwD Act 2016', 'Govt Jobs', 'Age Relaxation', 'Fee Exemption']
  },
  {
    id: 'scribe-compensatory-time',
    title: 'MoSJE Comprehensive Scribe & 20 Min/Hr Compensatory Time Guidelines',
    hindiTitle: 'परीक्षाओं में स्क्राइब और प्रति घंटा 20 मिनट अतिरिक्त समय नियम',
    odiaTitle: 'ପରୀକ୍ଷାରେ ସ୍କ୍ରାଇବ୍ ଓ ପ୍ରତି ଘଣ୍ଟାରେ ୨୦ ମିନିଟ୍ ଅତିରିକ୍ତ ସମୟ ନିୟମ',
    category: 'education',
    ministry: 'Ministry of Social Justice and Empowerment & DoPT',
    shortSummary: 'Official uniform guidelines governing written examinations across India (UPSC, SSC, NTA, NEET, JEE, CUET, Banking, State PSCs) safeguarding scribe rights.',
    eligibility: [
      'Candidates with benchmark disability who have physical limitation to write (blindness, locomotor disability in hands, cerebral palsy, dyslexia).',
      'Certificate of physical limitation to write from CMO / Civil Surgeon / Medical Superintendent.'
    ],
    keyBenefits: [
      'Compensatory time of not less than 20 minutes per hour of examination.',
      'Mandatory compensatory time granted even if the candidate does NOT use a scribe.',
      'Candidate has the statutory freedom to bring their own scribe or request the exam authority to provide one.',
      'Exam bodies CANNOT restrict scribe eligibility arbitrarily (Hon\'ble Supreme Court judgment in Vikash Kumar v. UPSC).',
      'Special accessible ground floor seating and screen-reader / magnifying software compatibility.'
    ],
    documentsRequired: [
      'UDID Card',
      'Certificate of Physical Limitation to Write (Annexure-I as per exam notification)',
      'Scribe Declaration Form & ID proof of Scribe (if bringing own scribe)'
    ],
    applicationPortal: 'Respective Examination Conducting Agency (UPSC / NTA / SSC / IBPS)',
    portalUrl: 'https://disabilityaffairs.gov.in',
    officialHelpline: '011-24365019',
    tags: ['Scribe', 'Compensatory Time', '20 Min Extra', 'Supreme Court Ruling', 'Exam Concession']
  },
  {
    id: 'nhfdc-concessional-loans',
    title: 'NHFDC Divyangjan Swavalamban Concessional Business Loans (4% to 6%)',
    hindiTitle: 'एनएचएफडीसी दिव्यांगजन स्वावलंबन रियायती व्यवसाय ऋण (4% से 6%)',
    odiaTitle: 'NHFDC ଦିବ୍ୟାଙ୍ଗଜନ ସ୍ୱାବଲମ୍ବନ ରିହାତି ବ୍ୟବସାୟ ଋଣ (୪% ରୁ ୬%)',
    category: 'financial-aid',
    ministry: 'National Handicapped Finance and Development Corporation (NHFDC)',
    shortSummary: 'Provides highly subsidized micro-credit and venture loans up to ₹50 Lakhs at 4% to 6% annual interest rates to empower PwD entrepreneurs, shops, service centers, and self-help groups.',
    eligibility: [
      'Any Indian citizen with 40% or more disability.',
      'Age between 18 and 60 years.',
      'Viable self-employment or small business proposal.'
    ],
    keyBenefits: [
      'Loans up to ₹50,000 at only 4% interest per annum with zero collateral.',
      'Loans up to ₹5,00,000 at 5% interest per annum for micro-enterprises, poultry, dairy, grocery, repair shops.',
      'Loans up to ₹50,00,000 at 6% interest for manufacturing, transport, IT, and higher education.',
      'Special 0.5% to 1% additional interest rebate for women with disabilities.',
      'Skill training with monthly stipend during vocational incubation.'
    ],
    documentsRequired: [
      'UDID Card / Disability Certificate',
      'Business Project Proposal / Quotation',
      'Aadhaar and PAN Card',
      'Bank Account passbook copy'
    ],
    applicationPortal: 'NHFDC State Channelizing Agencies (SCAs) & PSU Banks',
    portalUrl: 'http://www.nhfdc.nic.in',
    officialHelpline: '0129-2226910',
    tags: ['NHFDC', 'Low Interest Loan', 'Business Subsidy', 'Self Employment', 'Women Rebate']
  },
  {
    id: 'railway-travel-concession',
    title: 'Indian Railways & Airlines Fare Concession (50% to 75% Discount)',
    hindiTitle: 'भारतीय रेल एवं विमान यात्रा किराया रियायत (50% से 75% छूट)',
    odiaTitle: 'ଭାରତୀୟ ରେଳବାଇ ଓ ବିମାନ ଯାତ୍ରା ରିହାତି (୫୦% ରୁ ୭୫% ଛାଡ଼)',
    category: 'concessions',
    ministry: 'Ministry of Railways & Ministry of Civil Aviation, Govt of India',
    shortSummary: 'Comprehensive transport concession tickets across express trains and domestic air travel for Divyangjan citizens along with their accompanying escort.',
    eligibility: [
      'Persons with visual impairment (total absence of sight), hearing and speech impairment (both together), locomotor disability / orthopedically handicapped, or mental retardation with valid Railway Divyangjan Concession Certificate or Photo ID Card issued by DRM.'
    ],
    keyBenefits: [
      '75% concession in 2nd Class, Sleeper, 3AC, AC Chair Car.',
      '50% concession in 1st AC and 2AC on selected trains.',
      'Concession of same percentage extended to ONE accompanying escort.',
      'Air India offers 50% concession on basic fare in economy class for visually impaired and locomotor disabled passengers on domestic routes.'
    ],
    documentsRequired: [
      'Railway Divyang Concession Certificate signed by Government Doctor / DMO',
      'UDID Card copy',
      'Passport photo of passenger and escort'
    ],
    applicationPortal: 'Divisional Railway Manager (DRM) Commercial Branch / IRCTC Online',
    portalUrl: 'https://www.irctc.co.in',
    officialHelpline: '139 (Railways)',
    tags: ['Railway Concession', '75% Discount', 'IRCTC Divyang', 'Airlines Concession', 'Escort Free']
  },
  {
    id: 'nfpd-fellowships',
    title: 'National Fellowship for Students with Disabilities (NFPD) & Scholarships',
    hindiTitle: 'दिव्यांग छात्रों के लिए राष्ट्रीय फेलोशिप (एनएफपीडी) एवं छात्रवृत्ति',
    odiaTitle: 'ଦିବ୍ୟାଙ୍ଗ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ଜାତୀୟ ଫେଲୋସିପ୍ (NFPD) ଓ ବୃତ୍ତି',
    category: 'education',
    ministry: 'DEPwD & University Grants Commission (UGC)',
    shortSummary: 'Pre-Matric, Post-Matric, Top Class Education, and National Fellowships (M.Phil/Ph.D.) providing monthly stipends, book allowances, and assistive device grants.',
    eligibility: [
      'Indian students with 40%+ benchmark disability studying in recognized schools, colleges, or universities.',
      'Family income limits vary by scholarship type (up to ₹2.5 Lakhs/year for Post-Matric, no income ceiling for certain competitive fellowships).'
    ],
    keyBenefits: [
      'Pre-Matric: ₹4,000/year plus disability allowance.',
      'Post-Matric: Full tuition fee reimbursement + ₹1,600/month maintenance allowance.',
      'NFPD (M.Phil / Ph.D.): JRF stipend of ₹37,000/month + HRA + ₹31,000/year contingency + Escort/Reader allowance of ₹2,000/month.',
      'Free laptop/assistive tech grant up to ₹30,000 during top-tier university study.'
    ],
    documentsRequired: [
      'UDID Card',
      'Admission proof / University bonafide certificate',
      'Previous marksheets',
      'Income Certificate',
      'Bank details linked to Aadhaar'
    ],
    applicationPortal: 'National Scholarship Portal (NSP) & UGC e-Scholarship Portal',
    portalUrl: 'https://scholarships.gov.in',
    officialHelpline: '0120-6619540',
    tags: ['NFPD', 'MPhil PhD Fellowship', 'UGC', 'Post Matric', 'Free Laptop', 'Reader Allowance']
  },
  {
    id: 'income-tax-80u-80dd',
    title: 'Income Tax Deduction under Section 80U & Section 80DD',
    hindiTitle: 'आयकर अधिनियम धारा 80U एवं 80DD के तहत भारी कर छूट',
    odiaTitle: 'ଆୟକର ଅଧିନିୟମ ଧାରା 80U ଓ 80DD ଅଧୀନରେ ଟିକସ ଛାଡ଼',
    category: 'concessions',
    ministry: 'Income Tax Department, Ministry of Finance, Govt of India',
    shortSummary: 'Direct deduction from taxable gross total income for individuals with disability (Section 80U) or parents/guardians supporting a family member with disability (Section 80DD).',
    eligibility: [
      'Section 80U: Resident individual certified with disability.',
      'Section 80DD: Resident individual / HUF incurring medical treatment, nursing, or insurance for dependent with disability.'
    ],
    keyBenefits: [
      'Benchmark disability (40% to 79%): Flat deduction of ₹75,000 from taxable income.',
      'Severe disability (80% and above): Flat deduction of ₹1,25,000 from taxable income.',
      'Does not require submitting bills of medical expenses; simple Form 10-IA or UDID suffices.'
    ],
    documentsRequired: [
      'UDID Card or Form 10-IA signed by Medical Authority',
      'ITR Filing submission'
    ],
    applicationPortal: 'Income Tax e-Filing Portal',
    portalUrl: 'https://www.incometax.gov.in',
    officialHelpline: '1800-103-0025',
    tags: ['Income Tax', '80U', '80DD', '₹1.25 Lakh Deduction', 'Tax Benefit']
  },
  {
    id: 'niramaya-health-insurance',
    title: 'Niramaya Health Insurance Scheme (₹1,00,000 Cashless Cover)',
    hindiTitle: 'निरामय स्वास्थ्य बीमा योजना (1 लाख रुपये तक कैशलेस कवरेज)',
    odiaTitle: 'ନିରାମୟ ସ୍ୱାସ୍ଥ୍ୟ ବୀମା ଯୋଜନା (୧ ଲକ୍ଷ ଟଙ୍କା ପର୍ଯ୍ୟନ୍ତ କ୍ୟାସଲେସ ସୁବିଧା)',
    category: 'health-insurance',
    ministry: 'The National Trust for Autism, Cerebral Palsy, Mental Retardation & Multiple Disabilities',
    shortSummary: 'Affordable, comprehensive health insurance providing up to ₹1.0 Lakh cover per annum for OPD consultations, regular medical checkups, dental, surgeries, and corrective therapies.',
    eligibility: [
      'Persons diagnosed with Autism Spectrum Disorder, Cerebral Palsy, Mental Retardation, or Multiple Disabilities.',
      'Available irrespective of age and irrespective of family income.'
    ],
    keyBenefits: [
      'Overall coverage up to ₹1,00,000 per financial year.',
      'Hospitalization cover up to ₹55,000.',
      'OPD treatment and corrective surgery up to ₹19,000.',
      'Alternative medicine (Ayurveda, Yoga) and recurring therapy (speech therapy, physiotherapy) covered.',
      'Zero premium or nominal enrollment fee for BPL card holders.'
    ],
    documentsRequired: [
      'Disability Certificate / UDID Card',
      'Aadhaar Card',
      'Income certificate / BPL Card (for premium exemption)',
      'Bank Account details'
    ],
    applicationPortal: 'The National Trust Portal',
    portalUrl: 'https://www.thenationaltrust.gov.in',
    officialHelpline: '011-43187878',
    tags: ['Niramaya', 'Health Insurance', 'Autism', 'Cerebral Palsy', 'Physiotherapy', 'The National Trust']
  }
];
