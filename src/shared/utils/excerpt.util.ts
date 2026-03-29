/**
 * Generate an excerpt from content. Removes markdown/html, trims, and cuts at the nearest word boundary up to maxLength.
 * @param content The full content string
 * @param maxLength Maximum length of excerpt (default 200)
 * @returns Excerpt string
 */
export function generateExcerpt(content: string, maxLength = 200): string {
  if (!content) return '';
  // Remove HTML tags
  let text = content.replace(/<[^>]*>/g, '');
  // Remove markdown (simple)
  text = text.replace(/[#*_`>[]!-]/g, '');
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '$1'); // [text](url) => text
  text = text.replace(/\n+/g, ' ');
  text = text.trim();
  if (text.length <= maxLength) return text;
  // Cut at nearest space before maxLength
  const cut = text.lastIndexOf(' ', maxLength);
  return text.slice(0, cut > 0 ? cut : maxLength).trim() + '...';
}
