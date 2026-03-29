"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeRangeForFilter = getTimeRangeForFilter;
function getTimeRangeForFilter(timeFilter) {
    var now = new Date();
    var endDate = new Date(now); // bây giờ
    var startDate = new Date(now);
    switch (timeFilter) {
        case '1d':
            break;
        case '7d':
            startDate.setDate(now.getDate() - 7);
            break;
        case '1m':
            startDate.setMonth(now.getMonth() - 1);
            break;
        case '3m':
            startDate.setMonth(now.getMonth() - 3);
            break;
        case '1y':
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        default:
            startDate.setFullYear(1970);
    }
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    return { startDate: startDate, endDate: endDate };
}
