"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripHtml = stripHtml;
/**
 * Strip HTML tags from content and return plain text.
 * @param content The HTML content string
 * @returns Plain text without HTML tags
 */
function stripHtml(content) {
    if (!content)
        return '';
    // Remove HTML tags
    return content.replace(/<[^>]*>/g, '');
}
