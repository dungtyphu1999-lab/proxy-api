/**
 * String normalization utilities for search and comparison
 */

/**
 * Remove Vietnamese diacritics/tones from a string
 * Useful for accent-insensitive search
 *
 * @param str - Input string with Vietnamese characters
 * @returns String with diacritics removed

 */
export function removeVietnameseTones(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/gi, (char) =>
      char === char.toUpperCase() ? 'A' : 'a',
    )
    .replace(/[èéẹẻẽêềếệểễ]/gi, (char) =>
      char === char.toUpperCase() ? 'E' : 'e',
    )
    .replace(/[ìíịỉĩ]/gi, (char) => (char === char.toUpperCase() ? 'I' : 'i'))
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/gi, (char) =>
      char === char.toUpperCase() ? 'O' : 'o',
    )
    .replace(/[ùúụủũưừứựửữ]/gi, (char) =>
      char === char.toUpperCase() ? 'U' : 'u',
    )
    .replace(/[ỳýỵỷỹ]/gi, (char) => (char === char.toUpperCase() ? 'Y' : 'y'))
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

/**
 * Normalize string for search comparison
 * - Trims whitespace
 * - Converts to lowercase
 * - Removes Vietnamese diacritics
 *
 * @param str - Input string
 * @returns Normalized string for search
 */
export function normalizeSearchString(str: string): string {
  return removeVietnameseTones(str).toLowerCase();
}
