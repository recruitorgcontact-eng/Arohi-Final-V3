/**
 * Date and Timestamp Utilities for Arohi AI Chat and Activity Logs
 * Handles dynamic relative date formatting (Today, Yesterday, 19 Aug, 15 Aug 2025, etc.)
 * and robust timestamp extraction from saved chat structures.
 */

export function extractChatTimestamp(chat: any): number | null {
  if (!chat) return null;

  // 1. Explicit numeric or ISO timestamp fields
  if (typeof chat.updatedAt === 'number' && chat.updatedAt > 0) return chat.updatedAt;
  if (typeof chat.createdAt === 'number' && chat.createdAt > 0) return chat.createdAt;
  if (typeof chat.timestamp === 'number' && chat.timestamp > 0) return chat.timestamp;

  if (typeof chat.updatedAt === 'string') {
    const parsed = Date.parse(chat.updatedAt);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  if (typeof chat.createdAt === 'string') {
    const parsed = Date.parse(chat.createdAt);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  if (typeof chat.timestamp === 'string') {
    const parsed = Date.parse(chat.timestamp);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }

  // 2. Extract timestamp from chat ID (e.g., "chat-1740049200000", "chat_1740049200000", "call-1740049200000")
  if (typeof chat.id === 'string') {
    const match = chat.id.match(/(?:chat|call|session|msg)?[-_]?(\d{10,13})/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      // If 10 digits (seconds), convert to milliseconds
      return num < 1e11 ? num * 1000 : num;
    }
  }

  // 3. Inspect messages for timestamp or message IDs
  if (Array.isArray(chat.messages) && chat.messages.length > 0) {
    // Check from newest message backwards
    for (let i = chat.messages.length - 1; i >= 0; i--) {
      const msg = chat.messages[i];
      if (!msg) continue;
      if (typeof msg.createdAt === 'number' && msg.createdAt > 0) return msg.createdAt;
      if (typeof msg.createdAt === 'string') {
        const parsed = Date.parse(msg.createdAt);
        if (!isNaN(parsed)) return parsed;
      }
      if (typeof msg.id === 'string') {
        const msgMatch = msg.id.match(/(?:call-end|msg|msg_)?[-_]?(\d{10,13})/);
        if (msgMatch && msgMatch[1]) {
          const num = parseInt(msgMatch[1], 10);
          return num < 1e11 ? num * 1000 : num;
        }
      }
    }
  }

  // 4. Try parsing chat.date if it is NOT "Today", "Yesterday", or "Recent"
  if (typeof chat.date === 'string' && chat.date.trim().length > 0) {
    const lower = chat.date.trim().toLowerCase();
    if (lower !== 'today' && lower !== 'yesterday' && lower !== 'recent') {
      const parsed = Date.parse(chat.date);
      if (!isNaN(parsed)) return parsed;

      // Handle DD/MM/YYYY or DD-MM-YYYY formats (e.g., 20/08/2026)
      const dmyMatch = chat.date.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
      if (dmyMatch) {
        const d = parseInt(dmyMatch[1], 10);
        const m = parseInt(dmyMatch[2], 10) - 1;
        const y = parseInt(dmyMatch[3], 10);
        return new Date(y, m, d).getTime();
      }
    }
  }

  return null;
}

/**
 * Formats a date or timestamp into a dynamic, user-friendly relative label
 * - "Today" (if on the same calendar day)
 * - "Yesterday" (if exactly 1 calendar day ago)
 * - "19 Aug" (if within the same calendar year)
 * - "19 Aug 2025" (if in a previous calendar year)
 */
export function formatRelativeChatDate(
  dateOrTimestamp: number | string | Date | undefined | null,
  fallback: string = 'Recent'
): string {
  if (!dateOrTimestamp) return fallback;

  let date: Date;
  if (typeof dateOrTimestamp === 'number') {
    date = new Date(dateOrTimestamp < 1e11 ? dateOrTimestamp * 1000 : dateOrTimestamp);
  } else if (typeof dateOrTimestamp === 'string') {
    const trimmed = dateOrTimestamp.trim();
    if (/^\d{10,13}$/.test(trimmed)) {
      const num = parseInt(trimmed, 10);
      date = new Date(num < 1e11 ? num * 1000 : num);
    } else {
      // Check for DD/MM/YYYY
      const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
      if (dmyMatch) {
        const d = parseInt(dmyMatch[1], 10);
        const m = parseInt(dmyMatch[2], 10) - 1;
        const y = parseInt(dmyMatch[3], 10);
        date = new Date(y, m, d);
      } else {
        const parsed = Date.parse(trimmed);
        if (!isNaN(parsed)) {
          date = new Date(parsed);
        } else {
          return fallback;
        }
      }
    }
  } else if (dateOrTimestamp instanceof Date) {
    date = dateOrTimestamp;
  } else {
    return fallback;
  }

  if (isNaN(date.getTime())) return fallback;

  const now = new Date();

  // Calculate calendar day difference in local time
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const targetDayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diffDays = Math.floor((todayStart - targetDayStart) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (now.getFullYear() === date.getFullYear()) {
    // Same year: e.g. "19 Aug"
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  } else {
    // Different year: e.g. "19 Aug 2025"
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

/**
 * Returns the dynamic, accurate display date for any SavedChat item.
 * Automatically resolves timestamps from ID, messages, or metadata.
 */
export function getChatDisplayDate(chat: any): string {
  if (!chat) return 'Recent';

  const timestamp = extractChatTimestamp(chat);
  if (timestamp !== null) {
    return formatRelativeChatDate(timestamp, chat.date || 'Recent');
  }

  // Fallback to existing chat.date if no timestamp could be reconstructed
  if (chat.date && typeof chat.date === 'string') {
    const trimmed = chat.date.trim();
    if (trimmed && trimmed.toLowerCase() !== 'today' && trimmed.toLowerCase() !== 'recent') {
      return trimmed;
    }
  }

  return 'Today';
}

/**
 * Returns dynamic, accurate display date for voice call logs.
 */
export function getCallDisplayDate(call: any): string {
  if (!call) return 'Recent';

  if (typeof call.id === 'string') {
    const match = call.id.match(/(?:call|session)?[-_]?(\d{10,13})/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      const ts = num < 1e11 ? num * 1000 : num;
      return formatRelativeChatDate(ts, call.date || 'Recent');
    }
  }

  if (call.date && typeof call.date === 'string') {
    const parsed = Date.parse(call.date);
    if (!isNaN(parsed)) {
      return formatRelativeChatDate(parsed, call.date);
    }
    return call.date;
  }

  return 'Recent';
}
