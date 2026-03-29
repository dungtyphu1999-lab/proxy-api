"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROCESSING_STATUSES = exports.RESOLVED_STATUSES = exports.MAX_UNRESOLVED_COMPLAINTS_BEFORE_RESTRICTION = exports.COMPLAINT_DEADLINE_DAYS = void 0;
// Constants for business rules
exports.COMPLAINT_DEADLINE_DAYS = 7;
exports.MAX_UNRESOLVED_COMPLAINTS_BEFORE_RESTRICTION = 5;
// Helper: statuses that are considered "resolved/done"
exports.RESOLVED_STATUSES = [
    'resolved',
    'closed',
    'dismissed',
    'rejected',
    'cancelled',
];
// Helper: statuses that are still "in progress"
exports.PROCESSING_STATUSES = [
    'pending',
    'shop_responded',
    'admin_review',
    'investigating',
];
