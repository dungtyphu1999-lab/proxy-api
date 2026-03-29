"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationHash = createNotificationHash;
var crypto = require("crypto");
/**
 * Create hash for notification deduplication
 * @param id - Notification ID from database
 * @param type - Notification type
 * @param title - Notification title
 * @param message - Notification message
 * @returns MD5 hash string
 */
function createNotificationHash(id, type, title, message) {
    var hashString = "".concat(id, "_").concat(type, "_").concat(title, "_").concat(message);
    return crypto.createHash('md5').update(hashString).digest('hex');
}
