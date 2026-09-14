import { CommerceDispatchItem } from '../types/connectors';

export function buildAmazonUrl(query: string): string {
  const clean = query.trim();
  return `https://www.amazon.in/s?k=${encodeURIComponent(clean)}`;
}

export function buildFlipkartUrl(query: string): string {
  const clean = query.trim();
  return `https://www.flipkart.com/search?q=${encodeURIComponent(clean)}`;
}

export function buildUberUrl(destination: string, pickup = 'my_location'): string {
  const cleanDest = destination.trim();
  return `https://m.uber.com/ul/?action=setPickup&pickup=${encodeURIComponent(pickup)}&dropoff[formatted_address]=${encodeURIComponent(cleanDest)}`;
}

export function buildOlaUrl(destination: string): string {
  const cleanDest = destination.trim();
  return `https://book.olacabs.com/?dropoff_name=${encodeURIComponent(cleanDest)}`;
}

export function buildGoogleFlightsUrl(origin: string, destination: string, date?: string): string {
  const q = `Flights from ${origin.trim()} to ${destination.trim()}${date ? ` on ${date.trim()}` : ''}`;
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`;
}

export function buildZomatoUrl(query: string): string {
  const clean = query.trim();
  return `https://www.zomato.com/search?q=${encodeURIComponent(clean)}`;
}

export function buildSwiggyUrl(query: string): string {
  const clean = query.trim();
  return `https://www.swiggy.com/search?query=${encodeURIComponent(clean)}`;
}

export function buildIrctcUrl(): string {
  return 'https://www.irctc.co.in/nget/train-search';
}

/**
 * Parses user message or AI response to detect actionable real-world commerce/mobility intent
 */
export function detectCommerceDispatch(text: string): CommerceDispatchItem | null {
  if (!text || text.length < 5) return null;
  const lower = text.toLowerCase();

  // 1. Amazon Shopping intent
  const amazonMatch = lower.match(/(?:buy|order|search|find|price of|check on|look up)\s+(.+?)\s+(?:on\s+amazon|from\s+amazon)/i) ||
                      lower.match(/(?:amazon)\s+(?:search|for|find|buy)\s+(.+)/i);
  if (amazonMatch && amazonMatch[1]) {
    const query = amazonMatch[1].replace(/under\s+₹?\d+/i, '').trim();
    return {
      id: `disp_amz_${Date.now()}`,
      provider: 'amazon',
      providerName: 'Amazon India',
      providerLogoText: '📦',
      title: `Search "${amazonMatch[1].trim()}" on Amazon`,
      description: 'Opens official Amazon India with live prices, Prime delivery options, and customer reviews.',
      category: 'shopping',
      targetUrl: buildAmazonUrl(amazonMatch[1].trim()),
      accentColor: 'text-amber-400',
      parameters: { query: amazonMatch[1].trim() }
    };
  }

  // 2. Flipkart Shopping intent
  const flipkartMatch = lower.match(/(?:buy|order|search|find|check)\s+(.+?)\s+(?:on\s+flipkart|from\s+flipkart)/i) ||
                        lower.match(/(?:flipkart)\s+(?:search|for|find|buy)\s+(.+)/i);
  if (flipkartMatch && flipkartMatch[1]) {
    return {
      id: `disp_fk_${Date.now()}`,
      provider: 'flipkart',
      providerName: 'Flipkart',
      providerLogoText: '🛍️',
      title: `Search "${flipkartMatch[1].trim()}" on Flipkart`,
      description: 'Opens Flipkart with real-time SuperCoin deals, exchange offers, and bank discounts.',
      category: 'shopping',
      targetUrl: buildFlipkartUrl(flipkartMatch[1].trim()),
      accentColor: 'text-blue-400',
      parameters: { query: flipkartMatch[1].trim() }
    };
  }

  // 3. Uber Cab / Ride intent
  const uberMatch = lower.match(/(?:book|call|get|find|order)\s+(?:a\s+)?(?:cab|taxi|uber|ride|auto)\s+(?:to|for)\s+(.+?)(?:$|\.|\n)/i) ||
                    lower.match(/(?:uber\s+to)\s+(.+?)(?:$|\.|\n)/i);
  if (uberMatch && uberMatch[1]) {
    const dest = uberMatch[1].trim();
    return {
      id: `disp_uber_${Date.now()}`,
      provider: 'uber',
      providerName: 'Uber',
      providerLogoText: '🚗',
      title: `Ride to ${dest}`,
      description: 'Pre-fills destination coordinates directly into the official Uber app for instant vehicle dispatch.',
      category: 'ride',
      targetUrl: buildUberUrl(dest),
      accentColor: 'text-emerald-400',
      parameters: { destination: dest, pickup: 'Current Location' }
    };
  }

  // 4. Flight booking intent
  const flightMatch = lower.match(/(?:flight|flights|fly|airfare)\s+(?:from|between)\s+([a-zA-Z\s]+?)\s+to\s+([a-zA-Z\s]+?)(?:\s+(?:on|for)\s+([a-zA-Z0-9\s]+))?(?:$|\.|\n)/i) ||
                      lower.match(/(?:book\s+a\s+flight\s+to)\s+([a-zA-Z\s]+?)(?:$|\.|\n)/i);
  if (flightMatch) {
    const origin = flightMatch[2] ? flightMatch[1].trim() : 'Bhubaneswar';
    const destination = flightMatch[2] ? flightMatch[2].trim() : flightMatch[1].trim();
    const date = flightMatch[3] ? flightMatch[3].trim() : undefined;
    return {
      id: `disp_flt_${Date.now()}`,
      provider: 'flights',
      providerName: 'Google Flights & Airfare',
      providerLogoText: '✈️',
      title: `Flights: ${origin} ➔ ${destination}`,
      description: 'Compares verified live schedules & airfares across IndiGo, Air India, and Akasa Air.',
      category: 'flight',
      targetUrl: buildGoogleFlightsUrl(origin, destination, date),
      accentColor: 'text-sky-400',
      parameters: { origin, destination, date }
    };
  }

  // 5. Food Delivery intent (Swiggy / Zomato)
  const zomatoMatch = lower.match(/(?:order|find|search|get)\s+(.+?)\s+(?:on|from)\s+zomato/i) ||
                      lower.match(/zomato\s+(?:for|search|order)\s+(.+)/i);
  if (zomatoMatch && zomatoMatch[1]) {
    const dish = zomatoMatch[1].trim();
    return {
      id: `disp_zmt_${Date.now()}`,
      provider: 'zomato',
      providerName: 'Zomato',
      providerLogoText: '🍽️',
      title: `Order "${dish}" on Zomato`,
      description: 'Opens Zomato with live restaurant menus, hygiene ratings, and dining discount offers.',
      category: 'food',
      targetUrl: buildZomatoUrl(dish),
      accentColor: 'text-rose-400',
      parameters: { query: dish }
    };
  }

  const swiggyMatch = lower.match(/(?:order|find|search|get)\s+(.+?)\s+(?:on|from)\s+swiggy/i) ||
                      lower.match(/swiggy\s+(?:for|search|order)\s+(.+)/i);
  if (swiggyMatch && swiggyMatch[1]) {
    const dish = swiggyMatch[1].trim();
    return {
      id: `disp_swg_${Date.now()}`,
      provider: 'swiggy',
      providerName: 'Swiggy',
      providerLogoText: '🍛',
      title: `Order "${dish}" on Swiggy`,
      description: 'Direct deep-link to Swiggy Food and Instamart with real-time delivery estimates.',
      category: 'food',
      targetUrl: buildSwiggyUrl(dish),
      accentColor: 'text-orange-400',
      parameters: { query: dish }
    };
  }

  // 6. Train booking intent (IRCTC)
  if (lower.includes('irctc') || lower.includes('train ticket') || lower.includes('train booking') || lower.includes('tatkal')) {
    return {
      id: `disp_irctc_${Date.now()}`,
      provider: 'irctc',
      providerName: 'IRCTC NextGen',
      providerLogoText: '🚆',
      title: 'IRCTC Train Ticket Search',
      description: 'Direct link to official Indian Railways e-ticketing system for berth availability and Tatkal.',
      category: 'train',
      targetUrl: buildIrctcUrl(),
      accentColor: 'text-amber-500',
      parameters: { query: 'IRCTC NextGen Portal' }
    };
  }

  return null;
}
