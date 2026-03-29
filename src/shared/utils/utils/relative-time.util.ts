/**
 * Format a date to relative time string (e.g., "10 tiếng trước", "30 phút trước")
 * @param date - The date to format
 * @returns Formatted relative time string or null if date is null/undefined
 */
export function formatRelativeTime(
  date: Date | null | undefined,
): string | null {
  if (!date) {
    return null;
  }

  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
  const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

  if (diffYears > 0) {
    return `${diffYears} năm trước`;
  } else if (diffMonths > 0) {
    return `${diffMonths} tháng trước`;
  } else if (diffWeeks > 0) {
    return `${diffWeeks} tuần trước`;
  } else if (diffDays > 0) {
    return `${diffDays} ngày trước`;
  } else if (diffHours > 0) {
    return `${diffHours} tiếng trước`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} phút trước`;
  } else if (diffSeconds > 0) {
    return ' ';
  } else {
    return ' ';
  }
}
