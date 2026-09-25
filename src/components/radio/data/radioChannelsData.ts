// Arohi Radio - Exact 7 Launch Channels Data
// Strictly 7 Channels as per specification:
// 1. AROHI NEWS 24×7
// 2. AROHI BUSINESS
// 3. AROHI SPORTS
// 4. AROHI ODISHA
// 5. AROHI YOUTH
// 6. AROHI MUSIC
// 7. AROHI WORLD

import { Channel, Programme, NewsStory } from '../types';

export const CHANNELS_DATA: Channel[] = [
  // 1. AROHI NEWS 24×7
  {
    id: 'arohi-news',
    channelNumber: 1,
    name: 'AROHI NEWS 24×7',
    shortName: 'NEWS 24×7',
    frequency: '91.2 FM',
    tagline: 'AI-curated news briefings + verified live sources',
    description: 'Round-the-clock Indian and global developments, breaking headlines, technology and scientific breakthroughs, and non-partisan public interest explainers.',
    category: 'News',
    primaryLanguage: 'en',
    accentColor: '#EF4444',
    glowGradient: 'from-rose-500/20 via-red-950/30 to-transparent',
    live: true,
    listenerCount: 14280,
    curator: 'Arohi AI Editorial Desk & Real-time Live Wire',
    badges: ['VERIFIED SOURCES', 'HOURLY UPDATES', 'AI EXPLAINER'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'news-prog-morning-prime',
      timeSlot: '08:00',
      title: 'India Today & Global Briefing',
      host: 'RJ Arohi (AI Host)',
      tagline: 'The morning pulse of the nation and the world',
      description: 'Key political developments, infrastructure milestones, space research updates, and global diplomatic summaries.',
      type: 'LIVE',
      durationMinutes: 45,
      sourceAttribution: 'PTI Wire, PIB India, Reuters & The Hindu RSS',
      topics: ['National Policy', 'ISRO & Deep Tech', 'Global Diplomacy', 'Climate & Monsoon'],
      ambientTrackId: 'news_bulletin',
      stories: [
        {
          id: 'story-isro-gaganyaan-milestone',
          headline: 'ISRO Completes Key Propulsion Ground Tests for Gaganyaan Module',
          summary: 'The Indian Space Research Organisation has successfully validated the cryogenic high-thrust stage at Mahendragiri, marking a crucial readiness step for the crewed orbital mission.',
          timestamp: '18 minutes ago',
          source: 'ISRO Press Release / PIB New Delhi',
          sourceUrl: 'https://pib.gov.in',
          type: 'LIVE',
          category: 'Science & Aerospace',
          audioDurationSeconds: 110,
          keyBulletPoints: [
            'High-thrust cryogenic stage validated for 720 seconds continuous burn.',
            'Uncrewed orbital test flight scheduled ahead of astronaut mission.',
            'Human-rated safety telemetry sensors showed nominal performance.'
          ],
          translations: {
            or: {
              headline: 'ଗଗନଯାନ ମିଶନ ପାଇଁ ଇସ୍ରୋର ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପ୍ରପଲସନ ପରୀକ୍ଷଣ ସଫଳ',
              summary: 'ଭାରତୀୟ ମହାକାଶ ଗବେଷଣା ସଂସ୍ଥା (ଇସ୍ରୋ) ମହେନ୍ଦ୍ରଗିରିରେ କ୍ରାୟୋଜେନିକ୍ ଇଞ୍ଜିନର ସଫଳ ପରୀକ୍ଷା ସମ୍ପନ୍ନ କରିଛି।'
            },
            hi: {
              headline: 'गगनयान मिशन के लिए इसरो ने पूरा किया सफल क्रायोजेनिक परीक्षण',
              summary: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने महेंद्रगिरि में गगनयान के उच्च-प्रणोदन चरण का सफल परीक्षण किया।'
            }
          }
        },
        {
          id: 'story-green-hydrogen-india',
          headline: 'National Green Hydrogen Mission Allocates ₹4,200 Crore for Electrolyser Manufacturing',
          summary: 'Ministry of New & Renewable Energy awards commercial incentives under the SIGHT scheme to scale domestic manufacturing of advanced green hydrogen cells.',
          timestamp: '42 minutes ago',
          source: 'Ministry of New & Renewable Energy / PIB',
          sourceUrl: 'https://pib.gov.in',
          type: 'RECENT',
          category: 'Energy & Policy',
          audioDurationSeconds: 95
        },
        {
          id: 'story-digital-public-infrastructure',
          headline: 'UPI Crosses 15 Billion Monthly Transactions with Zero Downtime',
          summary: 'NPCI reports record digital payment processing volumes driven by merchant adoption in Tier-2 and Tier-3 towns, alongside expansion into Singapore, UAE, and France.',
          timestamp: '1 hour ago',
          source: 'NPCI Official Bulletin / RBI Updates',
          type: 'RECENT',
          category: 'Economy & Tech',
          audioDurationSeconds: 85
        }
      ]
    },
    programmes: [
      {
        id: 'news-prog-dawn',
        timeSlot: '06:00',
        title: 'Morning Awakening & Headlines',
        host: 'RJ Arohi',
        tagline: 'First light facts across all 28 states',
        description: 'Rapid 15-minute sweep of national newspapers, morning weather across metros, and essential civil notices.',
        type: 'RECENT',
        durationMinutes: 30,
        sourceAttribution: 'PTI & Weather India Network',
        topics: ['Headlines', 'Weather', 'Civil Alerts'],
        stories: []
      },
      {
        id: 'news-prog-morning-prime',
        timeSlot: '08:00',
        title: 'India Today & Global Briefing',
        host: 'RJ Arohi (AI Host)',
        tagline: 'The morning pulse of the nation and the world',
        description: 'Key political developments, infrastructure milestones, space research updates, and global diplomatic summaries.',
        type: 'LIVE',
        durationMinutes: 45,
        sourceAttribution: 'PTI Wire, PIB India, Reuters & The Hindu RSS',
        topics: ['National Policy', 'ISRO & Deep Tech', 'Global Diplomacy', 'Climate & Monsoon'],
        ambientTrackId: 'news_bulletin',
        stories: []
      },
      {
        id: 'news-prog-tech-radar',
        timeSlot: '11:00',
        title: 'Tech & Frontier Sciences Radar',
        host: 'Arohi AI Tech Desk',
        tagline: 'From quantum computing to semiconductor fabs',
        description: 'India Semiconductor Mission updates, AI regulation developments, and consumer tech reviews.',
        type: 'AI-GENERATED',
        durationMinutes: 40,
        sourceAttribution: 'TechCrunch, IEEE Spectrum & MeitY',
        topics: ['Semiconductors', 'AI Ethics', 'Electric Vehicles'],
        stories: []
      },
      {
        id: 'news-prog-midday',
        timeSlot: '13:00',
        title: 'Midday 360 Wrap',
        host: 'RJ Arohi',
        tagline: 'Midday updates & Parliament report',
        description: 'Ongoing session updates, Supreme Court rulings, and national security briefings.',
        type: 'LIVE',
        durationMinutes: 30,
        sourceAttribution: 'Sansad TV & LiveLaw Updates',
        topics: ['Courts', 'Parliament', 'Civil Administration'],
        stories: []
      },
      {
        id: 'news-prog-evening-prime',
        timeSlot: '18:00',
        title: 'Evening Primetime Roundup',
        host: 'RJ Arohi & Global Wire',
        tagline: 'The complete story of the day analyzed',
        description: 'Structured recap of the biggest 10 stories of the day with non-partisan analytical breakdown.',
        type: 'AI-GENERATED',
        durationMinutes: 60,
        sourceAttribution: 'Aggregated Global RSS & Official Portals',
        topics: ['Primetime', 'Global Affairs', 'Top 10'],
        stories: []
      },
      {
        id: 'news-prog-deep-explainer',
        timeSlot: '21:00',
        title: 'Today Explained: The Deep Dive',
        host: 'RJ Arohi (Explainer Edition)',
        tagline: 'Unpacking the complex forces shaping our century',
        description: 'A 30-minute narrative audio documentary exploring one critical issue with historical context.',
        type: 'AI-GENERATED',
        durationMinutes: 35,
        sourceAttribution: 'Arohi Research Labs & Public Archives',
        topics: ['Deep Dive', 'Historical Context', 'Economic Analysis'],
        stories: []
      }
    ]
  },

  // 2. AROHI BUSINESS
  {
    id: 'arohi-business',
    channelNumber: 2,
    name: 'AROHI BUSINESS',
    shortName: 'BUSINESS',
    frequency: '94.5 FM',
    tagline: 'Markets, startups, and entrepreneurs',
    description: 'Real-time Dalal Street market movements, startup funding radar, founder stories, sovereign earning ladders, and macroeconomic policy.',
    category: 'Business',
    primaryLanguage: 'en',
    accentColor: '#10B981',
    glowGradient: 'from-emerald-500/20 via-teal-950/30 to-transparent',
    live: true,
    listenerCount: 18450,
    curator: 'Arohi Market Intelligence & Mission 87 Desk',
    badges: ['SENSEX & NIFTY', 'STARTUPS & VC', 'MISSION 87'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'biz-prog-market-pulse',
      timeSlot: '09:30',
      title: 'Opening Bell & Venture Capital Radar',
      host: 'RJ Arohi (Business Desk)',
      tagline: 'From Dalal Street indices to seed-stage breakthroughs',
      description: 'Nifty 50 sector breakdown, banking stocks rally, MSME credit schemes, and high-growth Indian hardware startups.',
      type: 'LIVE',
      durationMinutes: 50,
      sourceAttribution: 'BSE, NSE, Economic Times & YourStory Wire',
      topics: ['Nifty & Sensex', 'MSME Lending', 'Venture Capital', 'Manufacturing'],
      ambientTrackId: 'market_pulse',
      stories: [
        {
          id: 'story-nifty-it-rally',
          headline: 'Nifty 50 Holds Firm Above 25,000 as Auto and Banking Drive Institutional Buying',
          summary: 'Domestic Institutional Investors (DIIs) inject ₹3,400 crore in early morning sessions as commercial vehicle sales and rural demand show robust double-digit growth.',
          timestamp: '12 minutes ago',
          source: 'BSE/NSE Market Feed / LiveMint',
          type: 'LIVE',
          category: 'Equities & Markets',
          audioDurationSeconds: 100
        },
        {
          id: 'story-mission-87-manufacturing',
          headline: 'Odisha Industrial Corridor Attracts ₹12,000 Cr in EV Battery & Solar Cell Proposals',
          summary: 'IPICOL clears four mega-projects in Gopalpur and Paradeep under the Make in Odisha framework, creating estimated 8,500 direct engineering jobs.',
          timestamp: '35 minutes ago',
          source: 'IPICOL & Industries Dept, Govt of Odisha',
          type: 'RECENT',
          category: 'Industrial Investment',
          audioDurationSeconds: 90
        },
        {
          id: 'story-startup-ai-hardware',
          headline: 'Bengaluru Semiconductor Startup Raises $24M Series A for Edge AI Chips',
          summary: 'InnoSilicon designs ultra-low-power RISC-V processors for smart surveillance and tractor telematics, backed by deep-tech sovereign venture funds.',
          timestamp: '1 hour ago',
          source: 'Inc42 / Economic Times Tech',
          type: 'RECENT',
          category: 'Startups & Venture Capital',
          audioDurationSeconds: 85
        }
      ]
    },
    programmes: [
      {
        id: 'biz-prog-morning-bell',
        timeSlot: '09:15',
        title: 'Opening Bell & Venture Capital Radar',
        host: 'RJ Arohi (Business Desk)',
        tagline: 'Opening trades and early market drivers',
        description: 'Real-time index updates, currency exchange rates, crude oil impact, and pre-market earnings briefs.',
        type: 'LIVE',
        durationMinutes: 45,
        sourceAttribution: 'NSE/BSE Feeds',
        topics: ['Markets', 'Equities', 'Commodities'],
        stories: []
      },
      {
        id: 'biz-prog-founder-ladders',
        timeSlot: '12:00',
        title: 'Sovereign Earning & Founder Ladders',
        host: 'Commander Junoon (Vision) & Arohi Host',
        tagline: 'Empowering India’s 87 Million into sovereign economic creators',
        description: 'Actionable micro-enterprise blueprints: from ₹5,000 WhatsApp catalogs to ₹1,00,000 monthly decentralized agencies.',
        type: 'AI-GENERATED',
        durationMinutes: 40,
        sourceAttribution: 'Arohi Business OS & Mission 87 Archives',
        topics: ['Mission 87', 'Micro-Enterprise', 'Self-Reliance'],
        stories: []
      },
      {
        id: 'biz-prog-closing-bell',
        timeSlot: '15:30',
        title: 'Closing Bell & Portfolio Ledger',
        host: 'RJ Arohi',
        tagline: 'Daily market scorecard and derivative expiry trends',
        description: 'Closing figures for Sensex, Nifty, Midcap 100, and institutional flows.',
        type: 'LIVE',
        durationMinutes: 40,
        sourceAttribution: 'Moneycontrol & Financial Express',
        topics: ['Closing Bell', 'Mutual Funds', 'Institutional Flows'],
        stories: []
      },
      {
        id: 'biz-prog-global-trade',
        timeSlot: '20:00',
        title: 'Global Trade & Currency Pulse',
        host: 'Arohi International Desk',
        tagline: 'Wall Street opening, European markets, and supply chains',
        description: 'US Fed rate expectations, supply chain rerouting, and global container freight indices.',
        type: 'AI-GENERATED',
        durationMinutes: 30,
        sourceAttribution: 'Bloomberg & Reuters Market Wire',
        topics: ['Fed Rates', 'Global Supply Chains', 'Currencies'],
        stories: []
      }
    ]
  },

  // 3. AROHI SPORTS
  {
    id: 'arohi-sports',
    channelNumber: 3,
    name: 'AROHI SPORTS',
    shortName: 'SPORTS',
    frequency: '96.8 FM',
    tagline: 'Sports updates + verified live commentary feeds',
    description: 'Cricket ball-by-ball analysis, Indian Super League football, Hockey India League dispatches from Rourkela, Grand Slam tennis, and Olympic preparations.',
    category: 'Sports',
    primaryLanguage: 'en',
    accentColor: '#F59E0B',
    glowGradient: 'from-amber-500/20 via-orange-950/30 to-transparent',
    live: true,
    listenerCount: 22100,
    curator: 'Arohi Stadium Live Desk',
    badges: ['LIVE CRICKET', 'HOCKEY ODISHA', 'OLYMPIC RADAR'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'sports-prog-matchday-live',
      timeSlot: '14:30',
      title: 'Matchday Central: Live Score & Pitch Report',
      host: 'RJ Arohi (Sports Commentator)',
      tagline: 'Ball-by-ball momentum, tactics, and post-match breakdowns',
      description: 'Live coverage of international cricket fixtures, Ranji Trophy scores, and tactical analysis of the Indian national hockey camp.',
      type: 'LIVE',
      durationMinutes: 60,
      sourceAttribution: 'BCCI Official / Hockey India / Press Trust of India',
      topics: ['Cricket Test / T20', 'Birsa Munda Hockey Stadium', 'ISL Football', 'Badminton BWF'],
      ambientTrackId: 'stadium_roar',
      stories: [
        {
          id: 'story-cricket-india-pace',
          headline: 'Indian Fast Bowling Unit Registers 145+ km/h Average in Warmup Sessions',
          summary: 'BCCI medical and training staff confirm full fitness across all key pacers ahead of the premier home test series, citing biomechanical workload management.',
          timestamp: '25 minutes ago',
          source: 'BCCI Media Release / ESPNcricinfo Feed',
          type: 'LIVE',
          category: 'Cricket',
          audioDurationSeconds: 90
        },
        {
          id: 'story-odisha-hockey-league',
          headline: 'Hockey India League 2025: Birsa Munda Stadium in Rourkela to Host Grand Finale',
          summary: 'The world’s largest seated hockey stadium prepares for 8 franchise teams, featuring 48 international Olympians and grassroots talent from Sundargarh.',
          timestamp: '50 minutes ago',
          source: 'Sports & Youth Services Dept, Govt of Odisha',
          type: 'RECENT',
          category: 'Hockey',
          audioDurationSeconds: 95
        },
        {
          id: 'story-badminton-bwf-tour',
          headline: 'Satwik-Chirag Enter Semifinals at All England Open with Dominant Straight-Set Win',
          summary: 'The Indian top seeds defeated world number 4 Indonesian pair 21-17, 21-14 in 43 minutes of aggressive attacking badminton.',
          timestamp: '1 hour ago',
          source: 'Badminton Association of India / BWF World Tour',
          type: 'RECENT',
          category: 'Badminton',
          audioDurationSeconds: 75
        }
      ]
    },
    programmes: [
      {
        id: 'sports-prog-morning-glory',
        timeSlot: '07:30',
        title: 'Morning Match Scorecard & Global Highlights',
        host: 'RJ Arohi',
        tagline: 'Overnight football scores from Europe and NBA results',
        description: 'Champions League wrap, Premier League table, and tennis match results.',
        type: 'RECENT',
        durationMinutes: 30,
        sourceAttribution: 'Global Sports Feeds',
        topics: ['Football', 'Tennis', 'Overnight Scores'],
        stories: []
      },
      {
        id: 'sports-prog-matchday-live',
        timeSlot: '14:30',
        title: 'Matchday Central: Live Score & Pitch Report',
        host: 'RJ Arohi (Sports Commentator)',
        tagline: 'Ball-by-ball momentum, tactics, and post-match breakdowns',
        description: 'Live coverage of international cricket fixtures, Ranji Trophy scores, and tactical analysis.',
        type: 'LIVE',
        durationMinutes: 60,
        sourceAttribution: 'BCCI Official / Hockey India / Press Trust of India',
        topics: ['Cricket Test / T20', 'Birsa Munda Hockey Stadium', 'ISL Football', 'Badminton BWF'],
        stories: []
      },
      {
        id: 'sports-prog-tactics-board',
        timeSlot: '19:30',
        title: 'The Tactics Board: AI Analysis & Data Insights',
        host: 'Arohi Sports Analytics AI',
        tagline: 'Beyond the scoreboard: deep metrics and player stats',
        description: 'Hawk-Eye trajectory analytics, heat maps, and fitness metrics broken down for sports enthusiasts.',
        type: 'AI-GENERATED',
        durationMinutes: 35,
        sourceAttribution: 'Arohi Sports Data Engine',
        topics: ['Data Analytics', 'Biomechanics', 'Player Stats'],
        stories: []
      }
    ]
  },

  // 4. AROHI ODISHA
  {
    id: 'arohi-odisha',
    channelNumber: 4,
    name: 'AROHI ODISHA',
    shortName: 'ODISHA',
    frequency: '98.8 FM',
    tagline: 'Odia news, culture, music and local stories',
    description: 'A dedicated sovereign station in Odia (ଓଡ଼ିଆ) and English celebrating Odisha’s glorious heritage, Jagannath culture, Sambalpuri folk traditions, coastal agri updates, and rural youth opportunities.',
    category: 'Regional',
    primaryLanguage: 'or',
    accentColor: '#D97706',
    glowGradient: 'from-amber-600/20 via-orange-950/30 to-transparent',
    live: true,
    listenerCount: 26400,
    curator: 'Arohi Odisha Sanskruti Desk (Bhubaneswar & Sambalpur)',
    badges: ['ଓଡ଼ିଆ ଭାଷା', 'ଜଗନ୍ନାଥ ସଂସ୍କୃତି', 'ସମ୍ବଲପୁରୀ ସଙ୍ଗୀତ', 'କୃଷି ବାର୍ତ୍ତା'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'odisha-prog-sanskriti',
      timeSlot: '07:00',
      title: 'ସୁପ୍ରଭାତ ଓଡ଼ିଶା: ଐତିହ୍ୟ, ସଙ୍ଗୀତ ଓ ସମ୍ବାଦ (Suprabhat Odisha)',
      host: 'RJ Arohi (ଓଡ଼ିଆ ବକ୍ତା)',
      tagline: 'ଜୟ ଜଗନ୍ନାଥ! ଓଡ଼ିଶାର କୋଣ ଅନୁକୋଣରୁ ସମ୍ବାଦ ଓ ସୁମଧୁର ସଙ୍ଗୀତ',
      description: 'Morning Jagannath temple updates from Puri, Sambalpuri folk rhythm, coastal weather for farmers & fishermen, and Subhadra Yojana payment disbursement status.',
      type: 'LIVE',
      durationMinutes: 60,
      sourceAttribution: 'Information & Public Relations Dept, Govt of Odisha & All India Radio Cuttack',
      topics: ['Puri Dham', 'Subhadra Yojana', 'Mandi Rates', 'Sambalpuri Folk Heritage'],
      ambientTrackId: 'odisha_flute',
      stories: [
        {
          id: 'story-puri-shrimandir-parikrama',
          headline: 'ଶ୍ରୀମନ୍ଦିର ପରିକ୍ରମା ପ୍ରକଳ୍ପ: ଭକ୍ତମାନଙ୍କ ପାଇଁ ଶୀତଳ ଜଳ ଓ ସ୍ୱତନ୍ତ୍ର ସହାୟତା କେନ୍ଦ୍ର ସ୍ଥାପନ',
          summary: 'ପୁରୀ ଶ୍ରୀମନ୍ଦିର ପ୍ରଶାସନ ପକ୍ଷରୁ ଭକ୍ତଙ୍କ ସୁବିଧା ନିମନ୍ତେ ଚାରି ଦ୍ୱାର ନିକଟରେ ଅତ୍ୟାଧୁନିକ ପ୍ରତୀକ୍ଷା କକ୍ଷ ଓ ସୂଚନା କେନ୍ଦ୍ର କାର୍ଯ୍ୟକ୍ଷମ ହୋଇଛି।',
          timestamp: '15 ମିନିଟ୍ ପୂର୍ବେ',
          source: 'ଶ୍ରୀମନ୍ଦିର ପ୍ରଶାସନ (SJTA) ସୂଚନା',
          type: 'LIVE',
          category: 'Heritage & Culture',
          audioDurationSeconds: 110,
          translations: {
            en: {
              headline: 'Puri Shrimandir: Upgraded Pilgrim Amenities and Information Desks Operational',
              summary: 'Puri temple administration activates high-capacity covered waiting lounges and hydration booths for pilgrims across all four gates.'
            }
          }
        },
        {
          id: 'story-subhadra-yojana-third-phase',
          headline: 'ସୁଭଦ୍ରା ଯୋଜନାର ପରବର୍ତ୍ତୀ କିସ୍ତି ଅନୁମୋଦନ: ୨୫ ଲକ୍ଷରୁ ଊର୍ଦ୍ଧ୍ୱ ମହିଳା ଉପକୃତ',
          summary: 'ଓଡ଼ିଶା ସରକାରଙ୍କ ମହିଳା ଓ ଶିଶୁ ବିକାଶ ବିଭାଗ ପକ୍ଷରୁ ପ୍ରତ୍ୟକ୍ଷ ବ୍ୟାଙ୍କ ଜମା (DBT) ମାଧ୍ୟମରେ ସହାୟତା ରାଶି ପ୍ରଦାନ ପ୍ରକ୍ରିୟା ତ୍ୱରାନ୍ୱିତ ହୋଇଛି।',
          timestamp: '40 ମିନିଟ୍ ପୂର୍ବେ',
          source: 'ସୂଚନା ଓ ଲୋକସମ୍ପର୍କ ବିଭାଗ, ଓଡ଼ିଶା ସରକାର',
          type: 'RECENT',
          category: 'Social Welfare & Empowerment',
          audioDurationSeconds: 100
        },
        {
          id: 'story-odisha-agri-mandi-bhubaneswar',
          headline: 'ଭୁବନେଶ୍ୱର ଓ ସମ୍ବଲପୁର ମଣ୍ଡିରେ ଧାନ ଓ ପନିପରିବା ଦର ନିର୍ଦ୍ଧାରଣ',
          summary: 'ରାଜ୍ୟ କୃଷି ବିପଣନ ବୋର୍ଡ ପକ୍ଷରୁ ସର୍ବନିମ୍ନ ସହାୟକ ମୂଲ୍ୟ (MSP) ସୁରକ୍ଷା ଓ ଇ-ନାମ୍ (e-NAM) ପଞ୍ଜୀକରଣ କ୍ୟାମ୍ପ୍ ସମ୍ପର୍କରେ ଘୋଷଣା।',
          timestamp: '୧ ଘଣ୍ଟା ପୂର୍ବେ',
          source: 'ଓଡ଼ିଶା ରାଜ୍ୟ କୃଷି ବିପଣନ ପରିଷଦ',
          type: 'RECENT',
          category: 'Agriculture & Mandi',
          audioDurationSeconds: 85
        }
      ]
    },
    programmes: [
      {
        id: 'odisha-prog-suprabhat',
        timeSlot: '06:00',
        title: 'ପ୍ରଭାତୀ ଭଜନ ଓ ସ୍ତୁତି',
        host: 'Arohi Odia Bhakti Stream',
        tagline: 'ଜୟ ଜଗନ୍ନାଥ ଭାବଧାରା',
        description: 'Traditional morning bhajans, Odissi vocal classical ragas, and spiritual reflections.',
        type: 'ARCHIVED',
        durationMinutes: 45,
        sourceAttribution: 'Odisha Sangeet Natak Akademi Archives',
        topics: ['Bhajan', 'Odissi Classical', 'Spiritual'],
        stories: []
      },
      {
        id: 'odisha-prog-sanskriti',
        timeSlot: '07:00',
        title: 'ସୁପ୍ରଭାତ ଓଡ଼ିଶା: ଐତିହ୍ୟ, ସଙ୍ଗୀତ ଓ ସମ୍ବାଦ',
        host: 'RJ Arohi (ଓଡ଼ିଆ ବକ୍ତା)',
        tagline: 'ଜୟ ଜଗନ୍ନାଥ! ଓଡ଼ିଶାର କୋଣ ଅନୁକୋଣରୁ ସମ୍ବାଦ ଓ ସୁମଧୁର ସଙ୍ଗୀତ',
        description: 'Puri Dham updates, Subhadra yojana status, mandi prices, and Sambalpuri music.',
        type: 'LIVE',
        durationMinutes: 60,
        sourceAttribution: 'Information & Public Relations Dept, Govt of Odisha',
        topics: ['Culture', 'News', 'Music'],
        stories: []
      },
      {
        id: 'odisha-prog-krishi-samadhan',
        timeSlot: '12:30',
        title: 'କୃଷି ଓ ପ୍ରାଣୀପାଳନ ମିତ୍ର (Kisan & Vet Broadcast)',
        host: 'Arohi VetMitra AI Host',
        tagline: 'ଡାଏରୀ ଚାଷ, କୁକୁଡ଼ା ପାଳନ ଓ ଫସଲ ସୁରକ୍ଷା ପରାମର୍ଶ',
        description: 'Expert seasonal advice on dairy TMR feed, mastitis prevention, azolla cultivation, and poultry subsidies.',
        type: 'AI-GENERATED',
        durationMinutes: 45,
        sourceAttribution: 'Odisha F&ARD & OUAT Extension Experts',
        topics: ['Dairy', 'Poultry', 'Crops'],
        stories: []
      },
      {
        id: 'odisha-prog-sahitya-gatha',
        timeSlot: '20:30',
        title: 'ଓଡ଼ିଆ ସାହିତ୍ୟ ଓ ଐତିହ୍ୟ ଗାଥା (Odia Literature & Folklore)',
        host: 'RJ Arohi',
        tagline: 'ଫକୀର ମୋହନ, ରାଧାନାଥ ଓ ଉତ୍କଳ ଗୌରବଙ୍କ ଅମର ସୃଷ୍ଟି',
        description: 'Narrative storytelling of classic Odia short stories and historical chronicles of the Kalinga maritime empire.',
        type: 'AI-GENERATED',
        durationMinutes: 40,
        sourceAttribution: 'Odisha State Archives & Literary Heritage',
        topics: ['Literature', 'Folk Tales', 'Maritime Kalinga'],
        stories: []
      }
    ]
  },

  // 5. AROHI YOUTH
  {
    id: 'arohi-youth',
    channelNumber: 5,
    name: 'AROHI YOUTH',
    shortName: 'YOUTH',
    frequency: '101.6 FM',
    tagline: 'Jobs, education, opportunities and trends',
    description: 'High-energy sovereign career station. Government & private job notifications, competitive exam audio flashcards, foreign scholarships, tech trends, and Mission 87 youth earning blueprints.',
    category: 'Youth',
    primaryLanguage: 'en',
    accentColor: '#8B5CF6',
    glowGradient: 'from-violet-500/20 via-indigo-950/30 to-transparent',
    live: true,
    listenerCount: 31200,
    curator: 'Arohi Youth Career & Mission 87 Council',
    badges: ['GOVT JOBS 2025', 'SCHOLARSHIPS', 'MOCK INTERVIEWS', 'SKILL LADDERS'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'youth-prog-career-launch',
      timeSlot: '10:00',
      title: 'Career Radar & Sovereign Earning Ladders',
      host: 'RJ Arohi (Youth Anchor)',
      tagline: 'Every opportunity decoded for India’s ambitious generation',
      description: 'SSC CGL, UPSC Prelims current affairs mnemonics, AICTE tech internships, remote developer roles, and how cadets can earn ₹20k-₹50k/mo with zero capital.',
      type: 'LIVE',
      durationMinutes: 50,
      sourceAttribution: 'NCS Portal (ncs.gov.in), UPSC/SSC Gazette, Mission 87 Framework',
      topics: ['Government Job Vacancies', 'AI Career Shifts', 'Freelance Blueprints', 'Interview Hacks'],
      ambientTrackId: 'youth_synth',
      stories: [
        {
          id: 'story-ssc-railway-notification',
          headline: 'Indian Railways & SSC Announce Combined 28,000 Technical Vacancies',
          summary: 'Online application window opens across RRB portals with standardized computer-based test formats, fee exemptions for PwD/Divyang applicants, and regional exam centers.',
          timestamp: '20 minutes ago',
          source: 'Ministry of Railways / Staff Selection Commission',
          sourceUrl: 'https://rrbcdg.gov.in',
          type: 'LIVE',
          category: 'Government Jobs',
          audioDurationSeconds: 105
        },
        {
          id: 'story-mission-87-earning-ladder-2',
          headline: 'Mission 87 Spotlight: How Cadets in Bolangir Built a ₹45,000/mo Local SEO Agency',
          summary: 'Using Arohi AI Business OS, three college graduates digitized 24 local hardware and pharmacy stores, creating recurring retainer contracts with zero initial machinery cost.',
          timestamp: '45 minutes ago',
          source: 'Arohi Mission 87 Field Dispatch',
          sourceUrl: 'https://arohiai.com/mission87',
          type: 'AI-GENERATED',
          category: 'Sovereign Earning',
          audioDurationSeconds: 120
        },
        {
          id: 'story-national-scholarship-portal',
          headline: 'National Overseas Scholarship & Post-Matric Portals Open for 2025-26 Academic Year',
          summary: 'Ministry of Social Justice updates income threshold criteria and simplifies digital verification through DigiLocker integration.',
          timestamp: '1 hour ago',
          source: 'National Scholarship Portal (scholarships.gov.in)',
          type: 'RECENT',
          category: 'Education & Scholarships',
          audioDurationSeconds: 85
        }
      ]
    },
    programmes: [
      {
        id: 'youth-prog-morning-hustle',
        timeSlot: '08:30',
        title: 'The Daily Mindset & Opportunity Wire',
        host: 'RJ Arohi',
        tagline: 'Start your morning with tactical clarity',
        description: 'Time management, habits of top performers, and newly published corporate hiring listings.',
        type: 'RECENT',
        durationMinutes: 30,
        sourceAttribution: 'Arohi Career Engine',
        topics: ['Mindset', 'Productivity', 'Hiring Trends'],
        stories: []
      },
      {
        id: 'youth-prog-career-launch',
        timeSlot: '10:00',
        title: 'Career Radar & Sovereign Earning Ladders',
        host: 'RJ Arohi (Youth Anchor)',
        tagline: 'Every opportunity decoded for India’s ambitious generation',
        description: 'SSC CGL, UPSC Prelims, remote developer roles, and how cadets can earn ₹20k-₹50k/mo.',
        type: 'LIVE',
        durationMinutes: 50,
        sourceAttribution: 'NCS Portal & Mission 87',
        topics: ['Jobs', 'Earning Ladders', 'Interview Prep'],
        stories: []
      },
      {
        id: 'youth-prog-mock-cbt-drill',
        timeSlot: '16:00',
        title: 'On-Air Mock CBT & Audio Flashcards',
        host: 'Arohi AI Exam Coach',
        tagline: '50 rapid-fire questions: Polity, Geography, General Science',
        description: 'Interactive audio quiz where listeners test their recall speed with instant explanations.',
        type: 'AI-GENERATED',
        durationMinutes: 45,
        sourceAttribution: 'Arohi Grand CBT Question Engine',
        topics: ['Mock Test', 'Flashcards', 'General Studies'],
        stories: []
      },
      {
        id: 'youth-prog-tech-careers',
        timeSlot: '21:30',
        title: 'Frontier Skills: AI, Web3 & Sovereign Code',
        host: 'RJ Arohi & Guest Engineers',
        tagline: 'Building the software products India needs',
        description: 'Full-stack development, agentic AI frameworks, and open source opportunities.',
        type: 'AI-GENERATED',
        durationMinutes: 35,
        sourceAttribution: 'Arohi Engineering Labs',
        topics: ['AI Engineering', 'Full Stack', 'Open Source'],
        stories: []
      }
    ]
  },

  // 6. AROHI MUSIC
  {
    id: 'arohi-music',
    channelNumber: 6,
    name: 'AROHI MUSIC',
    shortName: 'MUSIC',
    frequency: '104.2 FM',
    tagline: 'Personalized music and immersive acoustic discovery',
    description: 'Cinematic mood-based audio sanctuary. Curated Indian classical ragas, Lo-fi coding beats, binaural deep focus, acoustic sunset sessions, and hidden folk gems across India.',
    category: 'Music',
    primaryLanguage: 'multilingual',
    accentColor: '#EC4899',
    glowGradient: 'from-pink-500/20 via-purple-950/30 to-transparent',
    live: true,
    listenerCount: 28900,
    curator: 'Arohi Sound Architecture & Acoustic Labs',
    badges: ['MOOD ADAPTIVE', 'INDIAN CLASSICAL', 'BINAURAL FOCUS', 'LO-FI CODING'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'music-prog-deep-flow',
      timeSlot: '11:00',
      title: 'Deep Flow: Ambient Coding & Binaural Focus',
      host: 'RJ Arohi (Acoustic Host)',
      tagline: 'Minimalist synthetic warmth and 432Hz focus frequencies',
      description: 'Zero vocal distractions. Engineered for deep software engineering, intense study, reading, and creative architecture.',
      type: 'LIVE',
      durationMinutes: 90,
      sourceAttribution: 'Arohi Acoustic Synthesis Engine / Public Domain Masterworks',
      topics: ['Binaural Beats', 'Ambient Synth', 'Deep Focus', 'Gamma Waves'],
      ambientTrackId: 'ambient_meditation',
      stories: [
        {
          id: 'story-acoustic-raga-bhimpalasi',
          headline: 'Afternoon Raga Bhimpalasi: The Transition from Diligence to Serenity',
          summary: 'Curated sitar and bamboo flute renditions designed to restore equilibrium during intense workday afternoons.',
          timestamp: 'Now Streaming',
          source: 'Arohi Classical Archive',
          type: 'LIVE',
          category: 'Indian Classical',
          audioDurationSeconds: 180
        },
        {
          id: 'story-lofi-sambalpur-beats',
          headline: 'Odisha Folk Meets Chillhop: Sambalpuri Flute & Dhol Lo-Fi Experiment',
          summary: 'A contemporary acoustic crossover weaving traditional tribal folk cadence with warm analog vinyl crackle.',
          timestamp: 'Next in Queue',
          source: 'Arohi Fusion Sound Lab',
          type: 'AI-GENERATED',
          category: 'Folk Fusion',
          audioDurationSeconds: 150
        }
      ]
    },
    programmes: [
      {
        id: 'music-prog-dawn-ragas',
        timeSlot: '05:30',
        title: 'Dawn Ragas: Bhairav & Todi (Morning Awakening)',
        host: 'Arohi Classical Curator',
        tagline: 'Vedic acoustic resonance to begin the sunrise in harmony',
        description: 'Pure acoustic tanpura, bansuri, and sitar improvisations set to morning ragas.',
        type: 'ARCHIVED',
        durationMinutes: 90,
        sourceAttribution: 'Classical Archives',
        topics: ['Morning Ragas', 'Meditation', 'Spiritual Resonance'],
        stories: []
      },
      {
        id: 'music-prog-deep-flow',
        timeSlot: '11:00',
        title: 'Deep Flow: Ambient Coding & Binaural Focus',
        host: 'RJ Arohi (Acoustic Host)',
        tagline: 'Minimalist synthetic warmth and 432Hz focus frequencies',
        description: 'Engineered for deep software engineering and intense study.',
        type: 'LIVE',
        durationMinutes: 90,
        sourceAttribution: 'Arohi Acoustic Synthesis Engine',
        topics: ['Binaural Beats', 'Ambient Synth', 'Focus'],
        stories: []
      },
      {
        id: 'music-prog-sunset-acoustic',
        timeSlot: '17:30',
        title: 'Golden Hour: Acoustic Guitars & Indie Folk',
        host: 'RJ Arohi',
        tagline: 'Warm unplugged melodies for the evening unwind',
        description: 'Indie acoustic ballads, fingerstyle guitars, and gentle percussion.',
        type: 'RECENT',
        durationMinutes: 60,
        sourceAttribution: 'Curated Indie Artists',
        topics: ['Acoustic', 'Indie Folk', 'Golden Hour'],
        stories: []
      },
      {
        id: 'music-prog-night-ambient',
        timeSlot: '22:00',
        title: 'Sleep & Starlight: Delta Wave Soundscape',
        host: 'Arohi Sleep Conductor',
        tagline: 'Soothing rain, distant temple chimes, and calming white noise',
        description: 'Designed for restorative sleep and evening stress relief.',
        type: 'ARCHIVED',
        durationMinutes: 120,
        sourceAttribution: 'Arohi Bio-Acoustic Labs',
        topics: ['Sleep', 'Delta Waves', 'Sound Therapy'],
        stories: []
      }
    ]
  },

  // 7. AROHI WORLD
  {
    id: 'arohi-world',
    channelNumber: 7,
    name: 'AROHI WORLD',
    shortName: 'WORLD',
    frequency: '107.5 FM',
    tagline: 'International stories and global cultural dispatches',
    description: 'Global perspectives connecting India to the world. International technology, multilateral diplomacy, space telescope discoveries, and stories from 195 nations.',
    category: 'World',
    primaryLanguage: 'multilingual',
    accentColor: '#3B82F6',
    glowGradient: 'from-blue-500/20 via-sky-950/30 to-transparent',
    live: true,
    listenerCount: 19800,
    curator: 'Arohi Global Intelligence Desk',
    badges: ['GLOBAL WIRE', 'MULTILINGUAL', 'GEOPOLITICS', 'PLANETARY SCIENCE'],
    isOriginalArohiChannel: true,
    currentProgramme: {
      id: 'world-prog-global-dispatch',
      timeSlot: '15:00',
      title: 'Global Horizons: World Diplomatic & Science Digest',
      host: 'RJ Arohi (International Bureau)',
      tagline: 'Connecting geopolitical currents across 5 continents',
      description: 'G20 climate finance summits, James Webb Space Telescope discoveries, European semiconductor accords, and Global South economic solidarity.',
      type: 'LIVE',
      durationMinutes: 55,
      sourceAttribution: 'UN News Wire, Reuters World, BBC International & Nature Journal',
      topics: ['United Nations', 'Planetary Science', 'Global South', 'Semiconductor Trade'],
      ambientTrackId: 'global_frequencies',
      stories: [
        {
          id: 'story-james-webb-atmosphere',
          headline: 'James Webb Telescope Detects Water Vapor and Carbon Compounds on Exoplanet K2-18b',
          summary: 'Astrophysicists announce new spectroscopic signatures in the habitable zone of an M-dwarf star 120 light-years away, expanding search for biosignatures.',
          timestamp: '30 minutes ago',
          source: 'NASA / ESA / Nature Astronomy Journal',
          type: 'LIVE',
          category: 'Space Exploration',
          audioDurationSeconds: 115
        },
        {
          id: 'story-global-south-trade-corridor',
          headline: 'India-Middle East-Europe Economic Corridor (IMEC) Announces First Phase Rail Specs',
          summary: 'Multilateral technical committee finalizes standardized gauge and digital customs clearance protocols linking Mumbai and Mundra ports to UAE and Haifa.',
          timestamp: '1 hour ago',
          source: 'International Maritime Organization / MEA New Delhi',
          type: 'RECENT',
          category: 'Geopolitics & Infrastructure',
          audioDurationSeconds: 95
        },
        {
          id: 'story-global-fusion-milestone',
          headline: 'ITER Fusion Reactor in France Completes Vacuum Vessel Sector Assembly',
          summary: 'International consortium including Indian nuclear scientists successfully aligns the 440-tonne superconducting magnetic torus chamber.',
          timestamp: '2 hours ago',
          source: 'ITER Organization Press Dispatch',
          type: 'RECENT',
          category: 'Clean Energy & Physics',
          audioDurationSeconds: 90
        }
      ]
    },
    programmes: [
      {
        id: 'world-prog-asia-pacific',
        timeSlot: '09:00',
        title: 'Asia-Pacific Morning Ledger',
        host: 'Arohi Asia Bureau',
        tagline: 'From Tokyo and Seoul to Singapore and Jakarta',
        description: 'Tech supply chains, ASEAN trade integration, and regional environmental pacts.',
        type: 'RECENT',
        durationMinutes: 40,
        sourceAttribution: 'Kyodo News & Nikkei Asia',
        topics: ['Asia-Pacific', 'Electronics', 'ASEAN'],
        stories: []
      },
      {
        id: 'world-prog-global-dispatch',
        timeSlot: '15:00',
        title: 'Global Horizons: World Diplomatic & Science Digest',
        host: 'RJ Arohi (International Bureau)',
        tagline: 'Connecting geopolitical currents across 5 continents',
        description: 'G20 climate finance, James Webb discoveries, and Global South economic solidarity.',
        type: 'LIVE',
        durationMinutes: 55,
        sourceAttribution: 'UN News & Nature',
        topics: ['United Nations', 'Science', 'Diplomacy'],
        stories: []
      },
      {
        id: 'world-prog-african-renaissance',
        timeSlot: '19:00',
        title: 'The African Frontier: Innovation & Growth',
        host: 'RJ Arohi',
        tagline: 'Lagos, Nairobi, Addis Ababa, and the African Continental Free Trade Area',
        description: 'Fintech innovation in mobile payments, solar grids, and India-Africa cooperative partnerships.',
        type: 'AI-GENERATED',
        durationMinutes: 35,
        sourceAttribution: 'African Development Bank & TechCabal',
        topics: ['Africa Tech', 'Solar Grids', 'South-South Cooperation'],
        stories: []
      }
    ]
  }
];

export function getChannelById(id: string): Channel | undefined {
  return CHANNELS_DATA.find(c => c.id === id);
}

export function getDefaultChannel(): Channel {
  return CHANNELS_DATA[0]; // AROHI NEWS 24×7
}
