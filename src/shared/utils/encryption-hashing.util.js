"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionUtil = void 0;
var bcrypt = require("bcrypt");
var SALT_OR_ROUNDS = 12;
var EncryptionUtil = /** @class */ (function () {
    function EncryptionUtil() {
    }
    /**
     * generate hash from password or string
     * @param {string} password
     * @returns {string}
     */
    EncryptionUtil.generateHash = function (password) {
        return bcrypt.hashSync(password, SALT_OR_ROUNDS);
    };
    /**
     * validate text with hash
     * @param {string} password
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    EncryptionUtil.validateHash = function (password, hash) {
        return bcrypt.compare(password, hash || '');
    };
    EncryptionUtil.generateStrongPassword = function (length) {
        if (length === void 0) { length = 12; }
        var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var lowercase = 'abcdefghijklmnopqrstuvwxyz';
        var digits = '0123456789';
        var specialChars = '@$!%*?&';
        var allChars = uppercase + lowercase + digits + specialChars;
        var password = '';
        // Ensure the password has at least one character from each category
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += digits[Math.floor(Math.random() * digits.length)];
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        // Fill the rest of the password length with random characters from all categories
        for (var i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        // Shuffle the password to ensure the characters are randomly distributed
        password = password
            .split('')
            .sort(function () { return Math.random() - 0.5; })
            .join('');
        return password;
    };
    return EncryptionUtil;
}());
exports.EncryptionUtil = EncryptionUtil;
