"use strict";
/**
 * String normalization utilities for search and comparison
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVietnameseTones = removeVietnameseTones;
exports.normalizeSearchString = normalizeSearchString;
/**
 * Remove Vietnamese diacritics/tones from a string
 * Useful for accent-insensitive search
 *
 * @param str - Input string with Vietnamese characters
 * @returns String with diacritics removed

 */
function removeVietnameseTones(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/gi, function (char) {
        return char === char.toUpperCase() ? 'A' : 'a';
    })
        .replace(/[èéẹẻẽêềếệểễ]/gi, function (char) {
        return char === char.toUpperCase() ? 'E' : 'e';
    })
        .replace(/[ìíịỉĩ]/gi, function (char) { return (char === char.toUpperCase() ? 'I' : 'i'); })
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/gi, function (char) {
        return char === char.toUpperCase() ? 'O' : 'o';
    })
        .replace(/[ùúụủũưừứựửữ]/gi, function (char) {
        return char === char.toUpperCase() ? 'U' : 'u';
    })
        .replace(/[ỳýỵỷỹ]/gi, function (char) { return (char === char.toUpperCase() ? 'Y' : 'y'); })
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
function normalizeSearchString(str) {
    return removeVietnameseTones(str).toLowerCase();
}
