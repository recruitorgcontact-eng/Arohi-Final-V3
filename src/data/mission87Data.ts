import { Mission87TrackType, FutureMapResult } from '../types/mission87';

export const MISSION_87_MANIFESTO = {
  title: "MISSION 87",
  subheading: "A National Youth Economic Activation Movement",
  demographicContext: "Official data highlighted by NITI Aayog reveals that 87 Million (8.7 Crore) youth in India fall under the NEET category (Not in Education, Employment, or Training). Mission 87 is the sovereign pathway to activate these 87 Million young minds into self-reliant value creators and micro-entrepreneurs.",
  coreQuote: "87 MILLION ARE NOT WAITING FOR INDIA. INDIA IS WAITING FOR WHAT 87 MILLION CAN BUILD.",
  tagline: "ONE AI. INFINITE OPPORTUNITIES.",
  hotlines: [
    { number: "+91-90904 55555", label: "National Desk" },
    { number: "+91-93379 52401", label: "Cadet Support Desk" }
  ],
  website: "arohiai.com",
  philosophySteps: [
    { step: "01", title: "LEARN", desc: "Learn something useful and directly applicable." },
    { step: "02", title: "BUILD", desc: "Create something real that solves an actual problem." },
    { step: "03", title: "FIND", desc: "Find an employer, customer, apprenticeship, or buyer." },
    { step: "04", title: "DELIVER", desc: "Create genuine value with measurable quality." },
    { step: "05", title: "EARN", desc: "Get paid for that value — unlocking your first ₹5,000." },
    { step: "06", title: "GROW", desc: "Turn the first achievement into an enterprise or industry." }
  ],
  ladderSteps: [
    { milestone: "₹5K", label: "Proof of Capability", desc: "I learned, built, delivered, and earned from real value." },
    { milestone: "₹20K", label: "Consistent Delivery", desc: "Repeatable micro-projects or verified client engagements." },
    { milestone: "₹50K", label: "Specialized Value", desc: "Advanced AI-powered workflows or dedicated regional production." },
    { milestone: "₹1 Lakh+", label: "Micro-Enterprise", desc: "Hiring your first team members and serving multiple districts." },
    { milestone: "Industry", label: "National & Global Scale", desc: "Self-reliant Indian production competing on the global stage." }
  ]
};

export interface TrackData {
  id: Mission87TrackType;
  title: string;
  badge: string;
  tagline: string;
  iconName: string;
  accentColor: string;
  gradient: string;
  description: string;
  starterProjects: string[];
  first5kBlueprint: {
    skillToLearn: string;
    productToBuild: string;
    targetBuyers: string;
    timeRequired: string;
    actionPlan: string[];
  };
  sampleFutureMap: Partial<FutureMapResult>;
}

export const MISSION_87_TRACKS: TrackData[] = [
  {
    id: 'digital_business',
    title: 'AI-Enabled Digital Business & Services',
    badge: 'High Velocity',
    tagline: 'Empower local MSMEs, shops, and professionals with AI workflows.',
    iconName: 'Zap',
    accentColor: '#8b5cf6',
    gradient: 'from-violet-600/20 via-purple-600/20 to-indigo-600/20',
    description: 'Transform small town businesses by building digital catalogs, AI marketing flyers, automated invoice templates, and customer response bots.',
    starterProjects: [
      'Digital Catalog & WhatsApp Ordering for Local Kirana/Retailers',
      'AI-Powered Multilingual Social Media Promotion for Local Doctors/Coaching',
      'GST-Ready Invoice & Inventory Tracking System on Google Sheets',
      'Voice-Powered Customer Support Setup for Regional Service Providers'
    ],
    first5kBlueprint: {
      skillToLearn: 'AI Image Prompting + WhatsApp Business API + Google Workspace Automation',
      productToBuild: 'A complete 15-product digital catalog + 10 festive social media banners for a local merchant',
      targetBuyers: 'Local clothing stores, sweet shops, hardware merchants, coaching institutes',
      timeRequired: '7 to 10 days',
      actionPlan: [
        'Visit 3 local shopkeepers in your neighborhood; photograph their top 10 products.',
        'Use Arohi AI to generate high-resolution commercial backgrounds and descriptive Hindi/Odia/English copy.',
        'Package into an interactive WhatsApp Catalog & Google Drive folder.',
        'Deliver and charge ₹2,500 per shop for the entire setup (2 clients = ₹5,000 unlocked!).'
      ]
    },
    sampleFutureMap: {
      cadetTitle: 'Digital Solutions Specialist',
      summaryVision: 'Transforming district retail with AI-assisted marketing, inventory, and commerce enablement.'
    }
  },
  {
    id: 'manufacturing',
    title: 'Regional Manufacturing & Product Creation',
    badge: 'Make In India',
    tagline: 'Identify local raw materials and district demand to manufacture physical goods.',
    iconName: 'Factory',
    accentColor: '#f59e0b',
    gradient: 'from-amber-600/20 via-orange-600/20 to-yellow-600/20',
    description: 'Move from consumer to producer. Utilize district-specific raw materials (ODOP), low-cost machinery, and PMEGP/MUDRA subsidies to build physical products.',
    starterProjects: [
      'Eco-Friendly Areca Nut Leaf / Sal Leaf Plate Manufacturing',
      'Bio-degradable Paper Packaging & Corrugated Box Production',
      'Herbal Incense & Essential Oil Extraction from Local Flora',
      'Precision Hardware & Agriculture Hand-Tool Assembly'
    ],
    first5kBlueprint: {
      skillToLearn: 'Basic manual press operation + raw material sourcing + standard packaging norms',
      productToBuild: 'First batch of 1,000 customized leaf plates or packaging boxes with retailer branding',
      targetBuyers: 'Local caterers, wedding organizers, temple trusts, street-food vendors',
      timeRequired: '14 days',
      actionPlan: [
        'Identify local agro-waste or raw material suppliers in your block/district.',
        'Partner with or rent idle local press machinery or procure a mini manual machine (₹12,000–₹18,000 with PMEGP/MUDRA support).',
        'Produce a pilot batch of 500 units with clean shrink packaging.',
        'Supply to 2 local event caterers at wholesale rate — securing ₹5,000 in gross revenue.'
      ]
    },
    sampleFutureMap: {
      cadetTitle: 'Regional Production Pioneer',
      summaryVision: 'Establishing decentralized manufacturing units utilizing local raw materials and MSME credit.'
    }
  },
  {
    id: 'agritech_food',
    title: 'Agri-Tech, Food Processing & Value Addition',
    badge: 'Bharat Agro',
    tagline: 'Turn raw crops into packaged, branded, and high-margin food products.',
    iconName: 'Sprout',
    accentColor: '#10b981',
    gradient: 'from-emerald-600/20 via-teal-600/20 to-green-600/20',
    description: 'Transform raw farm produce into high-value processed foods, organic flours, cold-pressed oils, spices, and dehydrated snacks.',
    starterProjects: [
      'Millet-Based Healthy Snack Packaging & FSSAI Registration',
      'Single-Origin Spice Grinding & Direct-to-Consumer Packets',
      'Honey Processing, Filtration & Regional Labeling',
      'Solar-Dehydrated Fruit & Vegetable Crisps'
    ],
    first5kBlueprint: {
      skillToLearn: 'FSSAI basic hygiene compliance + vacuum sealing packaging + nutrition labeling',
      productToBuild: '50 packets (250g each) of organic stone-ground spice mix or roasted millet cookies',
      targetBuyers: 'Apartment complexes, gym enthusiasts, organic groceries, weekly farmer markets',
      timeRequired: '10 days',
      actionPlan: [
        'Source unadulterated raw spices/millets directly from local farmers at fair price.',
        'Clean, grind, and package with airtight sealing and moisture absorbers.',
        'Use Arohi AI to create compliant nutrition labels and branding stickers.',
        'Sell 50 units @ ₹100 each across local residential societies = ₹5,000 earned.'
      ]
    },
    sampleFutureMap: {
      cadetTitle: 'Agri-Value Entrepreneur',
      summaryVision: 'Elevating farm income through decentralized food processing and certified regional food brands.'
    }
  },
  {
    id: 'skilled_green',
    title: 'Green Economy, Solar & EV Mobility',
    badge: 'Future Tech',
    tagline: 'Master renewable installations, electric vehicle maintenance, and energy tech.',
    iconName: 'Sun',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/20 via-sky-600/20 to-blue-600/20',
    description: 'Serve the massive surge in PM Surya Ghar solar rooftop installations and 2-wheeler/3-wheeler EV repair in semi-urban India.',
    starterProjects: [
      'PM Surya Ghar 3kW Rooftop Solar Survey & Subsidy Application Assistant',
      'E-Rickshaw & Electric 2-Wheeler Battery Diagnostic & Cell Balancing',
      'Solar Water Pump & Inverter Maintenance Service for Rural Farms',
      'Micro-Grid & Home Energy Audit Specialist'
    ],
    first5kBlueprint: {
      skillToLearn: 'Solar load calculation + government portal documentation + multimeter battery testing',
      productToBuild: 'Complete rooftop solar assessment & subsidy filing for 2 residential homes',
      targetBuyers: 'Independent house owners with electric bills > ₹2,500/month',
      timeRequired: '7 days',
      actionPlan: [
        'Identify 5 households in your locality paying high summer electricity bills.',
        'Conduct shadow analysis & rooftop area calculation using satellite mapping.',
        'Help them prepare documentation and apply on the national solar portal (pmsuryaghar.gov.in).',
        'Liaise with the registered local installer vendor for a ₹2,500 facilitation fee per installation.'
      ]
    },
    sampleFutureMap: {
      cadetTitle: 'Clean Energy & EV Technician',
      summaryVision: 'Powering Bharat’s solar transition and EV mobility infrastructure at the district level.'
    }
  },
  {
    id: 'creative_commerce',
    title: 'Creative Handicrafts, Apparel & Global Exports',
    badge: 'Artisan & Trade',
    tagline: 'Take traditional artisan craft and apparel to national e-commerce and global buyers.',
    iconName: 'Palette',
    accentColor: '#ec4899',
    gradient: 'from-pink-600/20 via-rose-600/20 to-purple-600/20',
    description: 'Bridge authentic Indian weavers, sculptors, and artisans with global buyers via Etsy, Amazon Karigar, and ONDC.',
    starterProjects: [
      'Sambalpuri / Handloom Fabric Curation & Boutique E-Commerce Store',
      'Terracotta & Dokra Metal Craft Packaging for Corporate Gifting',
      'Custom Embroidered Merchandise for Regional College Events & Fests',
      'ONDC-Enabled Regional Handicraft Collective'
    ],
    first5kBlueprint: {
      skillToLearn: 'Product photography with smartphone + Etsy/Amazon Karigar listing + export packaging',
      productToBuild: 'Curated box of 5 traditional handcrafted desk ornaments for corporate gifts',
      targetBuyers: 'Local IT offices, bank branches, schools for annual day gifts, NRI diaspora',
      timeRequired: '12 days',
      actionPlan: [
        'Connect with 2 rural artisan families; purchase 10 authentic craft pieces.',
        'Design elegant kraft paper gift packaging with an artisan story card generated via Arohi AI.',
        'Pitch corporate gift packages to 3 local bank managers or private clinics.',
        'Deliver 10 gift sets at ₹600 each = ₹6,000 revenue with fair artisan compensation.'
      ]
    },
    sampleFutureMap: {
      cadetTitle: 'Heritage Commerce Ambassador',
      summaryVision: 'Exporting district artisan masterpieces to national and global high-value consumers.'
    }
  },
  {
    id: 'services_trade',
    title: 'Hyper-Local Skilled Trades & Essential Services',
    badge: 'Essential Bharat',
    tagline: 'Modernize trade services with prompt dispatch, transparent billing, and AI booking.',
    iconName: 'Wrench',
    accentColor: '#3b82f6',
    gradient: 'from-blue-600/20 via-indigo-600/20 to-teal-600/20',
    description: 'Transform unorganized trade services (HVAC, plumbing, electrical, CCTV, home automation) into professional district service hubs.',
    starterProjects: [
      'Smart CCTV & WiFi Security Installation for Commercial Establishments',
      'Water Purifier (RO) & Deep Home Sanitization Hub',
      'Professional Plumbing & Electrical Rapid-Response Dispatch',
      'Digital Pest Control & Agro-Storage Protection'
    ],
    first5kBlueprint: {
      skillToLearn: 'Basic CCTV IP configuration + Google My Business profile verification',
      productToBuild: 'Turnkey 4-camera HD security system setup for a retail warehouse or residence',
      targetBuyers: 'Apartment societies, jewelry shops, grocery warehouses, private residences',
      timeRequired: '5 days',
      actionPlan: [
        'Source wholesale 4-channel CCTV kit from district distributor.',
        'Distribute professional flyers with verified pricing and 1-year service warranty.',
        'Install and configure remote mobile view on owner’s smartphone.',
        'Earn ₹2,500 installation & maintenance labor fee per site (2 jobs = ₹5,000!).'
      ]
    },
    sampleFutureMap: {
      cadetTitle: 'Certified Service Operations Lead',
      summaryVision: 'Building trusted, verified, and transparent local service networks across Tier 2/3 districts.'
    }
  }
];

export interface ManufacturingProfile {
  productName: string;
  category: string;
  investmentRange: string;
  subsidySchemes: string[];
  rawMaterials: string[];
  machineryRequired: string[];
  targetMarket: string;
  keyCompliance: string[];
  projectedMonthlyMargin: string;
}

export const SAMPLE_MANUFACTURING_PROFILES: ManufacturingProfile[] = [
  {
    productName: 'Eco-Friendly Areca / Sal Leaf Plates & Bowls',
    category: 'Biodegradable Products',
    investmentRange: '₹35,000 – ₹1,20,000',
    subsidySchemes: ['PMEGP (up to 35% subsidy)', 'MUDRA Shishu Loan (up to ₹50,000)', 'PM Vishwakarma'],
    rawMaterials: ['Dried naturally fallen Areca palm / Sal leaves', 'Food-grade shrink wrap', 'Biodegradable corrugated cartons'],
    machineryRequired: ['Semi-automatic hydraulic heat press (single or double die)', 'Die cutting molds (6", 8", 10", 12")', 'Compressor'],
    targetMarket: 'Caterers, wedding banquets, temples, railway canteens, street-food kiosks, export to Europe/US',
    keyCompliance: ['Udyam Registration', 'GST (optional below 40L)', 'FSSAI packaging certification'],
    projectedMonthlyMargin: '30% – 45% (Net ₹25,000 – ₹60,000/mo on 1 machine)'
  },
  {
    productName: 'Corrugated Paper Box & Packaging Cartons',
    category: 'Industrial Packaging',
    investmentRange: '₹1,50,000 – ₹5,00,000',
    subsidySchemes: ['PMEGP (up to 35% capital subsidy)', 'MUDRA Kishor (up to ₹5 Lakhs)', 'Credit Guarantee Fund (CGTMSE)'],
    rawMaterials: ['Kraft paper rolls (120–180 GSM)', 'Fluting paper', 'Cornstarch glue', 'Stitching wire'],
    machineryRequired: ['Single face paper corrugation machine', 'Rotary slotting and creasing machine', 'Eccentric slotter & box stitching machine'],
    targetMarket: 'E-commerce sellers, local garment factories, electronics distributors, food processors',
    keyCompliance: ['Pollution Control Board Green Category NOC', 'Udyam Registration', 'GST Registration'],
    projectedMonthlyMargin: '20% – 30% (Net ₹45,000 – ₹1,20,000/mo)'
  },
  {
    productName: 'Cold-Pressed Mustard / Sesame / Peanut Edible Oils',
    category: 'Food Processing',
    investmentRange: '₹1,00,000 – ₹3,50,000',
    subsidySchemes: ['PM Formalisation of Micro Food Processing Enterprises (PMFME - 35% subsidy)', 'MUDRA Loan'],
    rawMaterials: ['Raw mustard seeds, black sesame, groundnuts sourced directly from APMC mandis', 'Glass & PET bottles', 'Tamper-proof caps'],
    machineryRequired: ['Mini wooden/steel rotary cold-press (Kacchi Ghani / Marachekku)', 'Filter press / settling tank', 'Manual bottling & capping machine'],
    targetMarket: 'Health-conscious urban households, organic retail stores, local supermarkets, direct home delivery',
    keyCompliance: ['FSSAI State License / Registration', 'Nutritional Lab Testing', 'GST Registration'],
    projectedMonthlyMargin: '35% – 50% (Net ₹40,000 – ₹90,000/mo)'
  },
  {
    productName: 'Millet Cookies, Roasted Flakes & Ready-to-Cook Packs',
    category: 'Nutri-Cereals & Health Food',
    investmentRange: '₹50,000 – ₹2,00,000',
    subsidySchemes: ['National Millet Mission Subsidies', 'PMFME Scheme', 'MUDRA Shishu/Kishor'],
    rawMaterials: ['Ragi (Finger millet), Bajra, Jowar, Foxtail millet flours', 'Jaggery powder', 'Cold-pressed butter/oil', 'Nutrient-preserving barrier pouches'],
    machineryRequired: ['Planetary mixer (15-20L)', 'Rotary baking oven (12-16 trays)', 'Band sealer machine with nitrogen flushing'],
    targetMarket: 'Schools, hospital cafeterias, gyms, diabetic food stores, regional supermarkets',
    keyCompliance: ['FSSAI Food Business Registration', 'Standard Nutritional Analysis Certificate', 'Barcoding (GS1 India)'],
    projectedMonthlyMargin: '40% – 55% (Net ₹35,000 – ₹80,000/mo)'
  },
  {
    productName: 'Solar Inverter Assembly & Lithium Battery Pack Refurbishing',
    category: 'Clean Tech & Green Energy',
    investmentRange: '₹75,000 – ₹2,50,000',
    subsidySchemes: ['PM Surya Ghar Rooftop Solar Vendor Incentives', 'MUDRA Kishor Loan', 'Skill India Micro-Grant'],
    rawMaterials: ['Lithium Iron Phosphate (LiFePO4) cylindrical cells', 'BMS (Battery Management System) boards', 'Nickel strips', 'Heat-shrink PVC'],
    machineryRequired: ['Spot welding machine for battery packs', 'Battery internal resistance tester (YR1035+)', 'Cell balancer & discharge capacity tester'],
    targetMarket: 'E-rickshaw drivers, solar rooftop home setups, rural backup power, electric scooters',
    keyCompliance: ['BIS certification guidance', 'Udyam Registration', 'GST Registration'],
    projectedMonthlyMargin: '35% – 50% (Net ₹50,000 – ₹1,30,000/mo)'
  }
];

export const STATES_AND_UT_LIST = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Andaman & Nicobar', 'Chandigarh', 'Delhi NCR', 
  'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export const SAMPLE_CADET_METRICS = {
  nationalEnrolledCadets: 87412,
  districtsActive: 684,
  projectsBuilt: 29840,
  first5kAchieved: 14210,
  enterprisesLaunched: 1845
};
