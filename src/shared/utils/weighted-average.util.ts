/**
 * Calculate weighted average safely with rounding to fixed decimals.
 * - Returns 0 if totalWeight <= 0 or if inputs are invalid
 */
export function calculateWeightedAverage(
  weightedSum: number,
  totalWeight: number,
  fractionDigits: number = 2,
): number {
  if (!Number.isFinite(weightedSum) || !Number.isFinite(totalWeight)) return 0;
  if (totalWeight <= 0) return 0;
  const value = weightedSum / totalWeight;
  const factor = Math.pow(10, Math.max(0, fractionDigits));
  return Math.round(value * factor) / factor;
}
