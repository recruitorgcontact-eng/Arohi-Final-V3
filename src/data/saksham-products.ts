export interface SakshamProduct {
  id: string;
  modelCode: string;
  name: string;
  hindiName?: string;
  odiaName?: string;
  series: 'Arohi Care IoT' | 'Classic Canes' | 'Premium Series' | 'All-in-One' | 'Institutional Kit';
  category: 'smart-iot' | 'classic-cane' | 'premium-cane' | 'all-in-one' | 'bulk-kit';
  tagline: string;
  mrp: number;
  subsidizedPrice: number;
  badge?: string;
  inStock: boolean;
  specifications: {
    label: string;
    value: string;
  }[];
  keyFeatures: string[];
  batteryBackup?: string;
  dimensions?: string;
  weight?: string;
  material?: string;
  warranty?: string;
  adipEligible: boolean;
  targetUsers: string[];
  description: string;
  variants?: {
    code: string;
    name: string;
    size: string;
    folds: string;
    price: number;
    mrp: number;
  }[];
}

export const SAKSHAM_PRODUCTS: SakshamProduct[] = [
  {
    id: 'arohi-care-sonar-iot',
    modelCode: 'DLI010',
    name: 'Arohi Care Portable Sonar-Based IoT Device',
    hindiName: 'आरोही केयर पोर्टेबल सोनार आधारित आईओटी नेविगेटर',
    odiaName: 'ଆରୋହୀ କେୟାର ପୋର୍ଟେବଲ ସୋନାର IoT ଡିଭାଇସ',
    series: 'Arohi Care IoT',
    category: 'smart-iot',
    tagline: 'Portable Sonar-Based IoT Device for Safe Navigation — See More. Live Freer.',
    mrp: 4999,
    subsidizedPrice: 2499,
    badge: 'Flagship Assistive IoT',
    inStock: true,
    specifications: [
      { label: 'Model Code', value: 'DLI010' },
      { label: 'Detection Tech', value: 'High-Precision Dual Ultrasonic Sonar' },
      { label: 'Battery Backup', value: '100-Hour Continuous Operation' },
      { label: 'Charging Interface', value: 'Universal USB Type-C Fast Charging' },
      { label: 'Alert Feedback', value: 'Multi-Pattern Tactile Vibration Modes' },
      { label: 'Environment Modes', value: '3 Adaptable Presets (Indoor, Outdoor, Crowded)' },
      { label: 'Form Factor', value: 'Pocket-Friendly Clip-on & Lanyard Mount' },
      { label: 'Weight', value: 'Under 75g Ultra-Lightweight' },
      { label: 'Weather Resistance', value: 'Splash & Dust Resistant Enclosure' }
    ],
    keyFeatures: [
      'Sonar-Based Obstacle Recognition: Accurately senses obstacles, low-hanging tree branches, stairs, and approaching objects with high precision.',
      '100-Hour Battery Backup: Massive battery life offering uninterrupted safety and travel confidence for weeks on a single charge.',
      'Multiple Vibration Modes: Instant tactile haptic alerts inform the user about obstacle proximity without disturbing ambient hearing.',
      'Lightweight & Pocket-Friendly: Compact ergonomic build; can be clipped to a shirt pocket, belt, or worn with the neck lanyard.',
      '3 Adaptive Environment Modes: Switch seamlessly between Quiet Room, Street Navigation, and Crowded Public Transport.',
      'Universal Accessibility: Designed especially for the visually impaired and individuals with mobility challenges.'
    ],
    batteryBackup: '100 Hours with Type-C USB Rechargeable Cell',
    dimensions: '6.8 cm × 4.2 cm × 2.4 cm',
    weight: '72 grams',
    material: 'High-impact shockproof ABS-polycarbonate composite',
    warranty: '1 Year Full Replacement Warranty by ODITREE SERVICES',
    adipEligible: true,
    targetUsers: ['Visually Impaired Individuals', 'Low-Vision Seniors', 'Special Blind Schools', 'Independent Commuters', 'NGO Beneficiaries'],
    description: 'Designed for a safer, smarter, and more independent journey. Arohi Care DLI010 uses sonar ultrasonic waves to calculate distances from obstacles up to 3 meters ahead and generates distinct vibration feedback directly to your fingers or chest.'
  },
  {
    id: 'classic-white-cane',
    modelCode: 'DLC010',
    name: 'Classic Foldable White Cane (120 cm)',
    hindiName: 'क्लासिक फोल्डेबल व्हाइट केन (120 सेमी)',
    odiaName: 'କ୍ଲାସିକ ଫୋଲ୍ଡେବଲ ହ୍ବାଇଟ କେନ (120 ସେମି)',
    series: 'Classic Canes',
    category: 'classic-cane',
    tagline: 'Simple Tools. Greater Independence. Classic. Reliable. Essential.',
    mrp: 899,
    subsidizedPrice: 499,
    badge: 'Essential Mobility',
    inStock: true,
    specifications: [
      { label: 'Model Code', value: 'DLC010' },
      { label: 'Total Length', value: '120 cm' },
      { label: 'Shaft Diameter', value: '12.7 mm' },
      { label: 'Segments / Folds', value: '4 Segments Foldable' },
      { label: 'Weight', value: '170g Ultra-Light' },
      { label: 'Cord System', value: 'Double Elastic, 3mm High-Tension Strength' },
      { label: 'Finish', value: 'Durable Protective Powder Coating' },
      { label: 'Grip', value: 'Non-Slip Ergonomic Golf Grip Handle with Wrist Loop' }
    ],
    keyFeatures: [
      'Industrial Grade Aluminium: High tensile strength alloy ensures no bending while keeping total weight to a mere 170 grams.',
      'Double Elastic 3mm Shock Cord: Heavy-duty internal tension elastic keeps segments securely locked when deployed.',
      '4-Fold Compact Design: Instantly snaps into place and folds effortlessly to fit into any backpack or carry tote.',
      'Powder Coating Finish: Pure white reflective powder coating with black top-bottom accents for superior outdoor durability.',
      'Ergonomic Non-Slip Grip: Comfortable textured handle minimizes hand fatigue during long tactile walks.'
    ],
    dimensions: '120 cm unfolded (approx 33 cm folded)',
    weight: '170 grams',
    material: 'Aircraft-grade lightweight aluminium alloy',
    warranty: '6 Months Manufacturer Guarantee',
    adipEligible: true,
    targetUsers: ['Students & Office Commuters', 'First-Time White Cane Users', 'Schools for the Blind', 'Divyangjan Mobility Training'],
    description: 'The classic, battle-tested assistive white cane relied on by millions of visually impaired travelers. Sturdy 4-segment construction with 3mm double elastic inner cord.'
  },
  {
    id: 'premium-white-cane-series',
    modelCode: 'DLC02 Series',
    name: 'Premium Ionized White Cane Series',
    hindiName: 'प्रीमियम आयनाइज्ड व्हाइट केन सीरीज (बुश जॉइंट्स)',
    odiaName: 'ପ୍ରିମିୟମ ଆୟନାଇଜ୍ଡ ହ୍ବାଇଟ କେନ ସିରିଜ',
    series: 'Premium Series',
    category: 'premium-cane',
    tagline: 'Enhanced Design. More Control. Precision Bush Joint Engineering.',
    mrp: 1499,
    subsidizedPrice: 799,
    badge: 'Ionized Aluminium',
    inStock: true,
    specifications: [
      { label: 'Model Series', value: 'DLC02A / DLC02B / DLC02C / DLC02D' },
      { label: 'Joint Technology', value: 'Precision Engineered Bushes for zero wobble & smooth glide' },
      { label: 'Surface Finish', value: 'Ionized Metallic Coating, Ultra-Fine Texture' },
      { label: 'Night Visibility', value: 'High-Grade Red Reflective Guide Safety Tape' },
      { label: 'Handle', value: 'Ergonomic Thermal-Insulated Non-Slip Grip' },
      { label: 'Standard Sizes', value: 'Child (90cm), Adult (115cm), Long (140cm), Ultra 7-Fold (120cm)' }
    ],
    keyFeatures: [
      'Precision Bush Joints: Engineered with low-friction bushes that deliver smooth snapping, zero joint rattle, and enhanced tactile sensitivity.',
      'Ionized Protective Coating: Resists corrosion, chipping, and scratches from pavement impacts and rainy climates.',
      'Red Reflective Safety Tape: Conspicuously alerts drivers and motorists at nighttime road crossings and pedestrian intersections.',
      'Multiple Size Variants: Perfectly proportioned lengths tailored specifically for children, adults, tall users, and travel enthusiasts.',
      'Ultra Premium Edition (DLC02D): Includes an exclusive weather-resistant zippered travel pouch.'
    ],
    variants: [
      { code: 'DLC02A', name: 'Child Edition (90cm)', size: '90 cm', folds: '4 Fold', price: 699, mrp: 1199 },
      { code: 'DLC02B', name: 'Adult Standard (115cm)', size: '115 cm', folds: '5 Fold', price: 799, mrp: 1399 },
      { code: 'DLC02C', name: 'Long Reach (140cm)', size: '140 cm', folds: '6 Fold', price: 899, mrp: 1599 },
      { code: 'DLC02D', name: 'Ultra Premium + Pouch (120cm)', size: '120 cm', folds: '7 Fold Ultra-Compact', price: 1199, mrp: 1999 }
    ],
    dimensions: 'Available in 90cm, 115cm, 120cm, and 140cm lengths',
    weight: '160g – 210g depending on variant',
    material: 'Ionized aerospace aluminium with brass bushing sleeves',
    warranty: '1 Year Manufacturer Guarantee',
    adipEligible: true,
    targetUsers: ['Children in Special Education', 'Daily Urban Commuters', 'Seniors needing lightweight orientation', 'Blind Welfare Associations'],
    description: 'Engineered for individuals who demand higher tactile precision and unmatched durability. The precision bush joints eliminate the loose rattle of generic canes.'
  },
  {
    id: 'premium-all-in-one-cane',
    modelCode: 'KIT010',
    name: 'Premium All-in-One Cane (LED Light + Multi-Terrain Roller)',
    hindiName: 'प्रीमियम ऑल-इन-वन केन (एलईडी लाइट + मल्टी-टेरेन रोलर)',
    odiaName: 'ପ୍ରିମିୟମ ଅଲ-ଇନ-ୱାନ କେନ (LED ଲାଇଟ + ରୋଲର ଟିପ)',
    series: 'All-in-One',
    category: 'all-in-one',
    tagline: 'The Complete Mobility Companion — More Support. More Freedom.',
    mrp: 2799,
    subsidizedPrice: 1699,
    badge: '4-in-1 Complete Solution',
    inStock: true,
    specifications: [
      { label: 'Model Code', value: 'KIT010' },
      { label: 'Configuration', value: '4 Types of Assistive Functionality in 1 Unified Cane' },
      { label: 'Active Night Illumination', value: 'Built-in High-Intensity Forward LED Flashlight' },
      { label: 'Tip Mechanism', value: '360° Multi-Terrain Rolling Ball Base' },
      { label: 'Structure', value: 'Reinforced Foldable & Lightweight Aluminium Body' },
      { label: 'Power Source', value: 'Replaceable Long-Life Batteries for LED Light' },
      { label: 'Handle', value: 'Cushioned Ergonomic Contour Handle with Power Switch' }
    ],
    keyFeatures: [
      '4-in-1 Versatility: Functions as a traditional guide cane, rolling pavement sensor, night illumination guide, and stability cane.',
      'Multi-Terrain Roller Base: Smooth rolling tip eliminates getting stuck in sidewalk cracks, cobbles, and tactile pavers, ensuring seamless continuous sweeps.',
      'Forward LED Night Light: High-lumen forward beam illuminates road obstacles at dusk and dawn while increasing visual detectability by motorists.',
      'Foldable & Lightweight: Sturdy yet easy to fold and stow in seconds when boarding trains, buses, or auto-rickshaws.',
      'Enhanced Grip & Balance: Ergonomic contour handle provides firm wrist support, reducing hand fatigue on longer walks.'
    ],
    batteryBackup: 'Up to 50 Hours continuous LED illumination',
    dimensions: '124 cm deployed (approx 34 cm folded)',
    weight: '240 grams',
    material: 'Reinforced industrial grade alloy with heavy-duty polymer roller tip',
    warranty: '1 Year Replacement Warranty',
    adipEligible: true,
    targetUsers: ['Visually Impaired Commuters', 'Seniors with Night Vision Impairment', 'Rural & Urban Navigators', 'Divyangjan Travelers'],
    description: 'The ultimate mobility companion. Combines an innovative continuous-glide roller tip with an integrated bright LED flashlight to ensure smooth obstacle-free navigation even on uneven Indian roads and unlit streets.'
  },
  {
    id: 'institutional-adip-bulk-pack',
    modelCode: 'ODITREE-KIT-100',
    name: 'Institutional Divyangjan Empowerment Pack (NGO & Govt)',
    hindiName: 'संस्थागत दिव्यांगजन सशक्तिकरण किट (एनजीओ एवं सरकारी आपूर्ति)',
    odiaName: 'ସାଂସ୍ଥାଗତ ଦିବ୍ୟାଙ୍ଗଜନ ସଶକ୍ତିକରଣ କିଟ (NGO ଓ ସରକାରୀ ଯୋଜନା)',
    series: 'Institutional Kit',
    category: 'bulk-kit',
    tagline: 'Pan-India Supply for Blind Schools, NGOs, ADIP Scheme & CSR Foundations',
    mrp: 9999,
    subsidizedPrice: 4999,
    badge: 'CSR & Institutional',
    inStock: true,
    specifications: [
      { label: 'Package Model', value: 'ODITREE-KIT-100' },
      { label: 'Contents', value: '1x Sonar IoT Device (DLI010) + 1x All-in-One Cane (KIT010) + 1x Foldable White Cane (DLC010)' },
      { label: 'Compliance', value: 'RPwD Act 2016 & ADIP Scheme Standards Compliant' },
      { label: 'Documentation', value: 'GST Tax Invoice, ALIMCO/ADIP Reimbursement Vouchers, Warranty Cards' },
      { label: 'Bulk Discount', value: 'Special subsidized institutional pricing for 10+ kits' },
      { label: 'Partner Service', value: 'ODITREE SERVICES Pan-India Distribution & User Training Sessions' }
    ],
    keyFeatures: [
      'Comprehensive Tri-Care Suite: Arms each beneficiary with both digital IoT ultrasonic sonar awareness and tactile pavement canes.',
      '100% ADIP & UDID Claim Ready: Official paperwork provided to facilitate full government scheme reimbursement.',
      'Training Materials Included: Quick audio and braille user guides in Hindi, Odia, and English.',
      'Pan-India Doorstep Delivery: Direct insured dispatch to schools, institutions, and community camps.',
      'Dedicated Institutional Support: Direct hotline with ODITREE SERVICES assistive engineers.'
    ],
    dimensions: 'Master Presentation Box (38 cm × 20 cm × 8 cm)',
    weight: '620 grams combined',
    material: 'Complete certified assistive hardware suite',
    warranty: '1 Year Full Institutional Support & Free Component Service',
    adipEligible: true,
    targetUsers: ['Special Education Schools', 'District Social Welfare Offices', 'Corporate CSR Programs', 'Rotary / Lions Assistive Camps', 'Disability Rights NGOs'],
    description: 'Curated specifically for government departments, CSR foundations, and disability welfare organizations distributing aids under the ADIP scheme or social inclusion drives.'
  }
];

export const ODITREE_PARTNER_INFO = {
  partnerName: 'ODITREE SERVICES',
  brandName: 'Arohi Care',
  tagline: 'The Bridge Of Services',
  motto: 'Innovative Assistive Solutions for a Safer, Smarter & More Independent Tomorrow — Together We Empower',
  helplinePhone: '+91 9090455555',
  helplinePhoneDisplay: '9090455555',
  email: 'oditree.contact@gmail.com',
  website: 'www.arohiai.com/saksham',
  officialAddress: 'Odisha & Pan-India Assistive Supply Network',
  whatsappNumber: '919090455555',
  serviceHighlights: [
    'Cutting-edge Sonar & Assistive Hardware',
    'User-Centric Design Tested with Divyangjan Cadets',
    'Reliable, Rugged & Durable Build Quality',
    'Affordable & Heavily Subsidized Pricing',
    'Pan-India Support & ADIP Scheme Guidance'
  ]
};
