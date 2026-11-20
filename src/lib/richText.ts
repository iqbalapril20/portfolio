/**
 * Lightweight deterministic HTML sanitizer & plain-text extractor for trusted CMS/DB HTML snippets.
 */

const ALLOWED_TAGS = new Set([
  'p',
  'br',
  'strong',
  'b',
  'em',
  'i',
  'u',
  'ul',
  'ol',
  'li',
  'h2',
  'h3',
  'h4',
  'blockquote',
  'code',
  'pre',
]);

export function sanitizeRichHtml(input: string): string {
  if (!input) return '';
  if (!/<[a-z][\s\S]*>/i.test(input)) {
    return input
      .split(/\n{2,}/)
      .map((para) => `<p>${escapeHtml(para.trim()).replace(/\n/g, '<br />')}</p>`)
      .join('');
  }

  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?([a-zA-Z0-9]+)(?:\s[^>]*)?>/g, (match, tagName: string) => {
      const lower = tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(lower)) return '';
      if (match.startsWith('</')) return `</${lower}>`;
      if (lower === 'br') return '<br />';
      return `<${lower}>`;
    });
}

export function stripHtmlToText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatWhatsAppUrl(phone: string | null | undefined, message: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d]/g, '');
  if (!digits) return null;
  const normalized = digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
