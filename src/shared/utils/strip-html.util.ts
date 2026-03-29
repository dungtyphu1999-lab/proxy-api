/**
 * Strip HTML tags from content and return plain text.
 * @param content The HTML content string
 * @returns Plain text without HTML tags
 */
export function stripHtml(content: string): string {
  if (!content) return '';
  // Remove HTML tags
  return content.replace(/<[^>]*>/g, '');
}
