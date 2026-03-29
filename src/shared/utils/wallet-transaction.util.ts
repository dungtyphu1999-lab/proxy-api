/**
 * Generate transaction number from short timestamp + microsecond + random to avoid collision
 * @returns Short timestamp + microsecond + random as string (12 characters)
 */
export function generateTransactionNumber(): string {
  const timestamp = Date.now();
  // Get last 7 digits of timestamp (remove first 6 digits)
  const shortTimestamp = timestamp.toString().slice(-7);
  const hrtime = process.hrtime();
  const microsecond = Math.floor(hrtime[1] / 1000); // Convert nanoseconds to microseconds
  const random = Math.floor(Math.random() * 10000); // 0-9999 additional entropy
  return `${shortTimestamp}${microsecond.toString().slice(-3)}${random.toString().slice(-2)}`;
}

/**
 * Check if a pending transaction is auto-cancelled
 * @param createdAt - The creation date of the transaction
 * @param timeoutInMinutes - The timeout in minutes
 * @returns True if the transaction is auto-cancelled, false otherwise
 */
export function isAutoCancelledPendingTransaction(
  createdAt: Date,
  timeoutInMinutes = 30,
): boolean {
  const timeout = timeoutInMinutes * 60 * 1000;
  const now = Date.now();
  const createdTime = new Date(createdAt).getTime();

  return createdTime < now - timeout;
}
