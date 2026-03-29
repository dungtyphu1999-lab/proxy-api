"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPriceInput = exports.extractPriceValue = exports.formatPriceDisplay = exports.formatCurrencyWithSuffix = exports.extractNumericValue = exports.formatCurrency = void 0;
/**
 * Format a numeric string to Vietnamese currency format
 * @param value - The numeric string to format
 * @returns Formatted currency string (e.g., "100.000 đ")
 */
var formatCurrency = function (value) {
    // Handle negative numbers properly
    var isNegative = value.startsWith('-');
    var cleanValue = value.replace(/[^\d.]/g, '');
    if (!cleanValue)
        return '';
    // Convert to number and format with dots
    var number = parseFloat(cleanValue);
    if (isNaN(number))
        return '';
    var formatted = Math.abs(number).toLocaleString('vi-VN');
    return (isNegative ? '-' : '') + formatted + ' đ';
};
exports.formatCurrency = formatCurrency;
/**
 * Extract numeric value from formatted currency string
 * @param formattedValue - The formatted currency string
 * @returns Numeric string (e.g., "100000")
 */
var extractNumericValue = function (formattedValue) {
    var isNegative = formattedValue.includes('-');
    var numericValue = formattedValue.replace(/[^\d.]/g, '');
    return (isNegative ? '-' : '') + numericValue;
};
exports.extractNumericValue = extractNumericValue;
/**
 * Format currency for display with custom suffix
 * @param value - The numeric string to format
 * @param suffix - Custom suffix (default: " đ")
 * @returns Formatted currency string
 */
var formatCurrencyWithSuffix = function (value, suffix) {
    if (suffix === void 0) { suffix = ' đ'; }
    var numericValue = value.replace(/\D/g, '');
    if (!numericValue)
        return '';
    var number = parseInt(numericValue, 10);
    return number.toLocaleString('vi-VN') + suffix;
};
exports.formatCurrencyWithSuffix = formatCurrencyWithSuffix;
// NEW FUNCTIONS FOR PRICE INPUT FORMATTING
/**
 * Format number to display with dots as thousand separators (no suffix)
 * @param value - The number value to format
 * @returns Formatted string with dots (e.g., "1.000.000")
 */
var formatPriceDisplay = function (value) {
    if (value === '' || value === null || value === undefined)
        return '';
    var numValue = typeof value === 'string' ? Number(value.replace(/\./g, '')) : value;
    if (isNaN(numValue) || numValue === 0)
        return '';
    return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
exports.formatPriceDisplay = formatPriceDisplay;
/**
 * Extract clean numeric value from input string
 * @param value - The input string (e.g., "1.000.000")
 * @returns Clean numeric string (e.g., "1000000")
 */
var extractPriceValue = function (value) {
    return value.replace(/\./g, '').replace(/[^0-9]/g, '');
};
exports.extractPriceValue = extractPriceValue;
/**
 * Format input value for price display
 * @param inputValue - Raw input string
 * @returns Formatted currency string
 */
var formatPriceInput = function (inputValue) {
    var numericValue = (0, exports.extractPriceValue)(inputValue);
    if (numericValue === '')
        return '';
    return (0, exports.formatPriceDisplay)(Number(numericValue));
};
exports.formatPriceInput = formatPriceInput;
