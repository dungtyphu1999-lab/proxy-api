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
export const ALLOWED_TRANSITIONS_STATE: Record<string, string[]> = {
  live: ['hidden', 'deleted'],
  hidden: ['live', 'deleted'],
  pending: ['deleted'],
  rejected: ['deleted'],
  suspended: ['deleted'],
  draft: ['deleted'],
  deleted: [],
};
