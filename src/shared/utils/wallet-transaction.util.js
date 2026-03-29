"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionNumber = generateTransactionNumber;
exports.isAutoCancelledPendingTransaction = isAutoCancelledPendingTransaction;
/**
 * Generate transaction number from short timestamp + microsecond + random to avoid collision
 * @returns Short timestamp + microsecond + random as string (12 characters)
 */
function generateTransactionNumber() {
    var timestamp = Date.now();
    // Get last 7 digits of timestamp (remove first 6 digits)
    var shortTimestamp = timestamp.toString().slice(-7);
    var hrtime = process.hrtime();
    var microsecond = Math.floor(hrtime[1] / 1000); // Convert nanoseconds to microseconds
    var random = Math.floor(Math.random() * 10000); // 0-9999 additional entropy
    return "".concat(shortTimestamp).concat(microsecond.toString().slice(-3)).concat(random.toString().slice(-2));
}
/**
 * Check if a pending transaction is auto-cancelled
 * @param createdAt - The creation date of the transaction
 * @param timeoutInMinutes - The timeout in minutes
 * @returns True if the transaction is auto-cancelled, false otherwise
 */
function isAutoCancelledPendingTransaction(createdAt, timeoutInMinutes) {
    if (timeoutInMinutes === void 0) { timeoutInMinutes = 30; }
    var timeout = timeoutInMinutes * 60 * 1000;
    var now = Date.now();
    var createdTime = new Date(createdAt).getTime();
    return createdTime < now - timeout;
}
