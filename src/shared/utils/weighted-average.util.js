"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWeightedAverage = calculateWeightedAverage;
/**
 * Calculate weighted average safely with rounding to fixed decimals.
 * - Returns 0 if totalWeight <= 0 or if inputs are invalid
 */
function calculateWeightedAverage(weightedSum, totalWeight, fractionDigits) {
    if (fractionDigits === void 0) { fractionDigits = 2; }
    if (!Number.isFinite(weightedSum) || !Number.isFinite(totalWeight))
        return 0;
    if (totalWeight <= 0)
        return 0;
    var value = weightedSum / totalWeight;
    var factor = Math.pow(10, Math.max(0, fractionDigits));
    return Math.round(value * factor) / factor;
}
