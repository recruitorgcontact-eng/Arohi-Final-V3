/**
 * Intelligent Image Prompt Expander & Semantic Disambiguator for Arohi AI
 * Handles:
 * 1. Countries, States, Cities, & Geographic Landscapes (e.g., "India", "Odisha", "Paris", "Japan")
 * 2. Homonyms & Polysemous terms (e.g., "Cricket", "Apple", "Jaguar", "Crane", "Mercury")
 * 3. Abstract Concepts & Emotions (e.g., "Success", "Freedom", "Peace", "Artificial Intelligence")
 * 4. Logos, Vector Icons & Graphic Branding (e.g., "Logo for Arohi AI", "Coffee shop icon")
 * 5. Indian Festivals, Traditions & Cultural Grandeur (e.g., "Diwali", "Rath Yatra", "Durga Puja", "Indian Farmer")
 * 6. Historical & Legendary Figures (e.g., "Chhatrapati Shivaji Maharaj", "Lord Rama", "Buddha")
 */

export interface ExpandedPromptResult {
  expandedPrompt: string;
  detectedCategory: string;
  recommendedStyle: string;
  recommendedAspectRatio?: string;
  isLogoOrVector?: boolean;
}

// Known Countries & Significant States/Regions
const COUNTRY_REGION_MAP: Record<string, string> = {
  'india': 'Breathtaking panoramic landmark landscape of India, featuring iconic architectural heritage including India Gate, Red Fort, Taj Mahal, and Varanasi ghats, glowing in golden hour light, festive warmth, vibrant cultural grandeur, 8k photographic masterpiece, wide-angle cinematic vista',
  'bharat': 'Majestic panoramic landscape of Bharat (India), showcasing glorious ancient temples, iconic national monuments, sacred rivers, vibrant cultural heritage, golden sunrise lighting, cinematic 8k ultra-detailed vista',
  'odisha': 'Grand cultural and architectural landscape of Odisha, featuring the magnificent Konark Sun Temple chariot wheels, Puri Jagannath temple sanctum, vibrant Pattachitra art motifs, Chilika lake serene waters, and Odissi classical dance grandeur in glorious golden lighting',
  'rajasthan': 'Majestic desert kingdom landscape of Rajasthan, featuring magnificent amber forts, royal palaces, ornate jharokhas, camels on golden dunes, vibrant royal textiles, and sunset splendor',
  'kerala': 'Lush emerald landscape of Kerala God\'s Own Country, featuring serene backwaters, traditional wooden houseboats, swaying coconut palms, misty Munnar tea plantations, Kathakali motifs, and tranquil tropical morning glow',
  'kashmir': 'Breathtaking paradise valley of Kashmir, featuring snow-capped Himalayan peaks, serene Dal Lake with ornate wooden Shikaras, vibrant floating lotus gardens, Chinar trees, and crisp morning mountain light',
  'japan': 'Scenic panoramic vista of Japan, featuring Mount Fuji with cherry blossom sakura trees in full spring bloom, traditional wooden pagoda temple, vibrant lantern-lit Kyoto street, serene koi pond, morning mist',
  'paris': 'Enchanting panoramic view of Paris, featuring the iconic Eiffel Tower illuminated against a romantic pastel sunset sky, the Seine river with classic bridges, charming Haussmannian architecture, and Parisian cafe ambiance',
  'london': 'Cinematic panoramic view of London, featuring Big Ben, the Houses of Parliament, Westminster Bridge, classic red double-decker bus, the Thames river at twilight with golden city illumination',
  'new york': 'Iconic cinematic skyline of New York City, featuring the Empire State Building, Chrysler Building, Manhattan skyscrapers reflected in the East River at magical blue hour, vibrant city energy',
  'egypt': 'Epic panoramic desert landscape of Egypt, featuring the Great Pyramids of Giza, the Great Sphinx, golden desert sand dunes at sunset, and the majestic Nile river',
  'italy': 'Picturesque sun-drenched Italian vista, featuring the historic Roman Colosseum, rolling Tuscan vineyards, coastal Amalfi cliffs with pastel villas, and warm Mediterranean afternoon glow',
  'china': 'Majestic scenic landscape of China, featuring the Great Wall winding across misty mountain ridges at sunrise, traditional dragon pagodas, and ethereal karst peaks',
  'switzerland': 'Majestic alpine landscape of Switzerland, featuring snow-capped Matterhorn mountain peaks, crystal-clear turquoise alpine lake, lush green meadows with wildflowers, and charming wooden chalets',
  'dubai': 'Futuristic luxury skyline of Dubai, featuring the Burj Khalifa piercing the clouds, ultra-modern architecture, glowing marina yachts, and golden desert sunset hues'
};

// Known Homonyms & Multi-meaning words
const HOMONYM_MAP: Record<string, string> = {
  'cricket': 'Thrilling international cricket stadium scene during a match, featuring a professional batsman in pristine whites playing a classic cover drive under brilliant floodlights, packed roaring crowd, lush green outfield, 8k sports photography',
  'apple': 'Crisp, fresh organic red Honeycrisp apple on a rustic wooden table with morning water droplets, dappled sunlight filtering through orchard leaves, high-end commercial food photography',
  'jaguar': 'Majestic wild jaguar with vibrant rosette spots prowling gracefully across a mossy Amazonian rainforest branch, intense amber eyes, misty jungle foliage, National Geographic wildlife photography',
  'crane': 'Majestic red-crowned crane bird dancing gracefully in misty wetland waters at sunrise, wings spread, reflection in tranquil water, wildlife photography',
  'mercury': 'Mysterious rocky planet Mercury glowing in deep cosmos, detailed cratered surface illuminated by a massive brilliant Sun in the background, starry space nebula, NASA-grade space render',
  'mouse': 'Cute tiny field mouse resting on an autumn mushroom in an enchanted woodland, soft morning dew, macro nature photography',
  'bow': 'Mastercrafted ancient archery composite recurve bow and ornate feather-fletched arrows resting on aged leather, dramatic lighting'
};

// Abstract Concepts & Emotions
const ABSTRACT_MAP: Record<string, string> = {
  'success': 'Inspiring cinematic scene of triumphant achievement: a visionary leader standing at the summit of a high mountain peak overlooking a glowing modern city below at dawn, golden horizon rays, sense of victory and boundless potential',
  'freedom': 'Breathtaking visual metaphor of pure freedom: majestic golden eagle soaring high above majestic mountain ranges, vast open sky with radiant sunset clouds, boundless uplifting atmosphere',
  'peace': 'Serene zen tranquil garden with smooth river stones, calm reflecting water pool, blooming white lotus flower, gentle bamboo fountain, warm morning sunbeams, soothing meditative atmosphere',
  'future': 'Visionary utopian futuristic city of tomorrow, featuring sleek eco-architecture with vertical gardens, clean energy levitating transit, crystal-clear skies, and harmonious human technology integration',
  'artificial intelligence': 'Luminous and sophisticated cybernetic intelligence core, featuring intricate glowing golden and azure neural synaptic pathways, quantum crystalline structures, hyper-advanced AI consciousness visualization',
  'ai': 'Luminous, sophisticated neural network core with glowing golden synaptic nodes, interconnected quantum data streams, futuristic cybernetic visualization in dark obsidian space',
  'love': 'Warm, heart-touching artistic scene of enduring love and warmth, golden hour backlight, soft bokeh, heartfelt connection, beautiful cinematic lighting',
  'hope': 'A delicate green sprout blossoming with vibrant life through cracked ancient stone, illuminated by a single warm beam of heavenly morning sunlight, powerful symbol of resilience'
};

// Indian Festivals, Culture & Key Figures
const CULTURAL_MAP: Record<string, string> = {
  'diwali': 'Magnificent Diwali Deepavali celebration scene, featuring rows of glowing clay oil lamps (diyas), intricate vibrant Rangoli pattern, sparkling fireworks illuminating the night sky, traditional festive warmth, rich Indian cultural grandeur',
  'rath yatra': 'Grand Rath Yatra festival in Puri Odisha, featuring the colossal majestic Nandighosa chariot adorned in sacred red and yellow fabrics, ocean of devoted pilgrims, vibrant devotional flags, joyous spiritual atmosphere',
  'durga puja': 'Grand Durga Puja pandal celebration, featuring the magnificent, intricately sculpted idol of Goddess Durga with ten weapons slaying Mahishasura, glowing dhunuchi smoke, glowing golden chandeliers, vibrant Bengali festival energy',
  'holi': 'Joyful, vibrant Holi festival celebration of colors, explosions of organic gulal powder in magenta, saffron, turquoise and gold creating dynamic colorful mist in the air, ecstatic smiling faces, sunny outdoor celebration',
  'indian farmer': 'Dignified and resilient Indian farmer standing proudly in his lush green agricultural farm at sunrise, golden morning rays illuminating the swaying crops, honest warm smile, rich rural Indian landscape, authentic National Geographic documentary photography',
  'chhatrapati shivaji maharaj': 'Regal and courageous portrait of Chhatrapati Shivaji Maharaj, adorned in authentic Maratha royal turban (pheta) with jeweled sirpech, royal armor, resolute visionary gaze, seated on an ornate throne in Raigad fort, dramatic golden lighting',
  'lord rama': 'Divine and serene depiction of Lord Sri Rama, holding the celestial Kodanda bow, radiant divine aura, serene and noble expression, wearing regal ascetic royal robes, standing beside the sacred Sarayu river at sunset',
  'buddha': 'Serene meditative depiction of Gautama Buddha sitting in lotus posture under the sacred Bodhi tree, glowing golden halo aura, tranquil gentle smile, soft forest sunbeams, sublime spiritual peace'
};

/**
 * Expands and disambiguates raw user prompts to produce world-class visual generation results.
 */
export function expandAndRefineImagePrompt(rawPrompt: string, requestedStyle: string = 'photorealistic'): ExpandedPromptResult {
  const clean = rawPrompt.trim();
  const lower = clean.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. Detect Logo / Icon / Vector Graphic intent
  const isLogo = /\b(logo|icon|badge|emblem|symbol|vector mark|brand logo|minimalist logo|app icon)\b/i.test(clean);
  if (isLogo) {
    let brandTopic = clean.replace(/\b(create|make|design|generate|draw|render)\b/gi, '')
      .replace(/\b(a|an|the)\b/gi, '')
      .replace(/\b(logo for|logo of|icon for|icon of|badge for|badge of|app icon for|brand logo for)\b/gi, '')
      .trim();
    if (!brandTopic) brandTopic = clean;

    return {
      expandedPrompt: `Clean, modern vector logo design for "${brandTopic}", minimalist flat graphic mark, bold geometric shapes, sharp contours, premium brand identity, centered on clean solid background, vector graphic, no photographic clutter, zero distorted text, high professional design standards`,
      detectedCategory: 'Logo / Graphic Design',
      recommendedStyle: 'vector graphic',
      recommendedAspectRatio: '1:1',
      isLogoOrVector: true
    };
  }

  // 2. Check Exact or Direct Match with Country & Geographic Landmarks
  if (COUNTRY_REGION_MAP[lower]) {
    return {
      expandedPrompt: COUNTRY_REGION_MAP[lower],
      detectedCategory: 'Country & Geographic Landmark',
      recommendedStyle: 'photorealistic cinematic',
      recommendedAspectRatio: '16:9'
    };
  }

  // Check if prompt is a short country query like "image of india", "picture of odisha", "photo of japan"
  for (const [key, expanded] of Object.entries(COUNTRY_REGION_MAP)) {
    if (lower === key || lower === `image of ${key}` || lower === `picture of ${key}` || lower === `photo of ${key}` || lower === `landscape of ${key}` || lower === `view of ${key}`) {
      return {
        expandedPrompt: expanded,
        detectedCategory: 'Country & Geographic Landmark',
        recommendedStyle: 'photorealistic cinematic',
        recommendedAspectRatio: '16:9'
      };
    }
  }

  // 3. Check Homonyms
  if (HOMONYM_MAP[lower]) {
    return {
      expandedPrompt: HOMONYM_MAP[lower],
      detectedCategory: 'Disambiguated Homonym',
      recommendedStyle: requestedStyle,
      recommendedAspectRatio: '16:9'
    };
  }

  for (const [key, expanded] of Object.entries(HOMONYM_MAP)) {
    if (lower === key || lower === `image of ${key}` || lower === `picture of ${key}` || lower === `photo of ${key}`) {
      return {
        expandedPrompt: expanded,
        detectedCategory: 'Disambiguated Homonym',
        recommendedStyle: requestedStyle,
        recommendedAspectRatio: '16:9'
      };
    }
  }

  // 4. Check Abstract Concepts
  if (ABSTRACT_MAP[lower]) {
    return {
      expandedPrompt: ABSTRACT_MAP[lower],
      detectedCategory: 'Abstract Concept',
      recommendedStyle: 'cinematic artistic',
      recommendedAspectRatio: '16:9'
    };
  }

  for (const [key, expanded] of Object.entries(ABSTRACT_MAP)) {
    if (lower === key || lower === `image of ${key}` || lower === `picture of ${key}` || lower === `concept of ${key}`) {
      return {
        expandedPrompt: expanded,
        detectedCategory: 'Abstract Concept',
        recommendedStyle: 'cinematic artistic',
        recommendedAspectRatio: '16:9'
      };
    }
  }

  // 5. Check Cultural & Festival Concepts
  if (CULTURAL_MAP[lower]) {
    return {
      expandedPrompt: CULTURAL_MAP[lower],
      detectedCategory: 'Cultural Heritage & Festival',
      recommendedStyle: 'photorealistic vibrant',
      recommendedAspectRatio: '16:9'
    };
  }

  for (const [key, expanded] of Object.entries(CULTURAL_MAP)) {
    if (lower === key || lower === `image of ${key}` || lower === `picture of ${key}` || lower === `photo of ${key}`) {
      return {
        expandedPrompt: expanded,
        detectedCategory: 'Cultural Heritage & Festival',
        recommendedStyle: 'photorealistic vibrant',
        recommendedAspectRatio: '16:9'
      };
    }
  }

  // 6. General Expansion for Very Short Prompts (1-3 words) to prevent flat/degraded output
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 3) {
    // If it mentions a person/portrait explicitly, keep it portrait-oriented
    const isPortrait = /\b(man|woman|girl|boy|person|face|portrait|model|warrior|king|queen|doctor|nurse|soldier|teacher)\b/i.test(clean);
    
    if (isPortrait) {
      return {
        expandedPrompt: `High-detail, dignified portrait of ${clean}, natural expressive lighting, sharp focus, 85mm lens depth of field, authentic atmosphere, 8k photographic fidelity`,
        detectedCategory: 'Portrait / Character',
        recommendedStyle: requestedStyle,
        recommendedAspectRatio: '3:4'
      };
    }

    // Default rich general enhancement for short scenic/object prompts
    return {
      expandedPrompt: `Stunning, high-definition visual of ${clean}, intricate fine details, dramatic cinematic lighting, professional photographic composition, 8k resolution, vibrant realism`,
      detectedCategory: 'Scenic / Object Enhancement',
      recommendedStyle: requestedStyle,
      recommendedAspectRatio: '16:9'
    };
  }

  // Standard prompt - return with fine-tuning quality enhancements
  return {
    expandedPrompt: clean,
    detectedCategory: 'Standard User Prompt',
    recommendedStyle: requestedStyle
  };
}
