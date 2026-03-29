"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExcerpt = generateExcerpt;
/**
 * Generate an excerpt from content. Removes markdown/html, trims, and cuts at the nearest word boundary up to maxLength.
 * @param content The full content string
 * @param maxLength Maximum length of excerpt (default 200)
 * @returns Excerpt string
 */
function generateExcerpt(content, maxLength) {
    if (maxLength === void 0) { maxLength = 200; }
    if (!content)
        return '';
    // Remove HTML tags
    var text = content.replace(/<[^>]*>/g, '');
    // Remove markdown (simple)
    text = text.replace(/[#*_`>[]!-]/g, '');
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '$1'); // [text](url) => text
    text = text.replace(/\n+/g, ' ');
    text = text.trim();
    if (text.length <= maxLength)
        return text;
    // Cut at nearest space before maxLength
    var cut = text.lastIndexOf(' ', maxLength);
    return text.slice(0, cut > 0 ? cut : maxLength).trim() + '...';
}
