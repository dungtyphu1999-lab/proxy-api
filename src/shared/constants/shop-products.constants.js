"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_TRANSITIONS_STATE = void 0;
/**
 * Record định nghĩa các trạng thái của sản phẩm mà seller có thể thay đổi:
 * - live -> hidden, live -> deleted
 * - hidden -> live, hidden -> deleted
 * - pending -> deleted
 * - rejected -> deleted
 * - suspended -> deleted
 * - draft -> deleted
 * - deleted -> Không thể chuyển trạng thái khác
 */
exports.ALLOWED_TRANSITIONS_STATE = {
    live: ['hidden', 'deleted'],
    hidden: ['live', 'deleted'],
    pending: ['deleted'],
    rejected: ['deleted'],
    suspended: ['deleted'],
    draft: ['deleted'],
    deleted: [],
};
