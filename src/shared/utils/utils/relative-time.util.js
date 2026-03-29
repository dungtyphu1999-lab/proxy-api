"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRelativeTime = formatRelativeTime;
/**
 * Format a date to relative time string (e.g., "10 tiếng trước", "30 phút trước")
 * @param date - The date to format
 * @returns Formatted relative time string or null if date is null/undefined
 */
function formatRelativeTime(date) {
    if (!date) {
        return null;
    }
    var now = new Date();
    var diffMs = now.getTime() - new Date(date).getTime();
    var diffSeconds = Math.floor(diffMs / 1000);
    var diffMinutes = Math.floor(diffMs / (1000 * 60));
    var diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    var diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    var diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    var diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    if (diffYears > 0) {
        return "".concat(diffYears, " n\u0103m tr\u01B0\u1EDBc");
    }
    else if (diffMonths > 0) {
        return "".concat(diffMonths, " th\u00E1ng tr\u01B0\u1EDBc");
    }
    else if (diffWeeks > 0) {
        return "".concat(diffWeeks, " tu\u1EA7n tr\u01B0\u1EDBc");
    }
    else if (diffDays > 0) {
        return "".concat(diffDays, " ng\u00E0y tr\u01B0\u1EDBc");
    }
    else if (diffHours > 0) {
        return "".concat(diffHours, " ti\u1EBFng tr\u01B0\u1EDBc");
    }
    else if (diffMinutes > 0) {
        return "".concat(diffMinutes, " ph\u00FAt tr\u01B0\u1EDBc");
    }
    else if (diffSeconds > 0) {
        return ' ';
    }
    else {
        return ' ';
    }
}
