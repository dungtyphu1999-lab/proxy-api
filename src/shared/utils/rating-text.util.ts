/**
 * Get Vietnamese rating text based on average star rating
 * @param avgStar - Average star rating (0-5)
 * @returns Vietnamese text describing the rating quality
 */
export function getRatingText(avgStar: number): string {
  if (avgStar >= 4.6 && avgStar <= 5.0) {
    return 'Tuyệt vời';
  } else if (avgStar >= 4.0 && avgStar <= 4.5) {
    return 'Tốt';
  } else if (avgStar >= 3.0 && avgStar <= 3.9) {
    return 'Khá';
  } else if (avgStar >= 2.0 && avgStar <= 2.9) {
    return 'Trung bình';
  } else if (avgStar >= 1.0 && avgStar <= 1.9) {
    return 'Kém';
  } else {
    return 'Rất tệ';
  }
}

/**
 * Round rating to 1 decimal place
 * @param rating - Rating value to round
 * @returns Rating rounded to 1 decimal place
 */
export function roundRatingToOneDecimal(rating: number): number {
  return Math.round(rating * 10) / 10;
}

export function toSlug(value?: string): string | undefined {
  if (!value) return undefined;
  return value.toString().trim().toLowerCase().replace(/\s+/g, '-');
}
