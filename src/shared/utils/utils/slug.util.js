"use strict";
/**
 * SEO-optimized slug generation utility
 * Converts text to URL-friendly slugs with proper SEO practices
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlugUtil = void 0;
var common_1 = require("@nestjs/common");
var SlugUtil = /** @class */ (function () {
    function SlugUtil() {
    }
    /**
     * Generate SEO-friendly slug from text
     * - Converts to lowercase
     * - Removes Vietnamese diacritics
     * - Replaces spaces and special chars with hyphens
     * - Removes consecutive hyphens
     * - Trims leading/trailing hyphens
     * - Limits length for SEO optimization
     */
    SlugUtil.generate = function (text, maxLength) {
        if (maxLength === void 0) { maxLength = 100; }
        if (!text || typeof text !== 'string') {
            return '';
        }
        return (text
            .toLowerCase()
            .trim()
            // Remove Vietnamese diacritics for better URL compatibility
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            // Replace common special characters with SEO-friendly alternatives
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd')
            // Replace spaces and underscores with hyphens
            .replace(/[\s_]+/g, '-')
            // Remove special characters except hyphens and alphanumeric
            .replace(/[^a-z0-9-]/g, '')
            // Remove consecutive hyphens
            .replace(/-+/g, '-')
            // Remove leading and trailing hyphens
            .replace(/^-+|-+$/g, '')
            // Limit length for SEO (Google typically shows ~60 chars in URLs)
            .substring(0, maxLength)
            // Final cleanup - remove trailing hyphen if created by substring
            .replace(/-+$/, ''));
    };
    /**
     * Generate unique slug with counter suffix if needed
     * @param baseSlug - The base slug to make unique
     * @param checkExists - Function that returns true if slug exists
     */
    SlugUtil.makeUnique = function (baseSlug, checkExists) {
        return __awaiter(this, void 0, void 0, function () {
            var slug, counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!baseSlug) {
                            throw new common_1.BadRequestException('Base slug cannot be empty');
                        }
                        slug = baseSlug;
                        counter = 1;
                        _a.label = 1;
                    case 1: return [4 /*yield*/, checkExists(slug)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        // Add counter with hyphen for readability
                        slug = "".concat(baseSlug, "-").concat(counter);
                        counter++;
                        // Prevent infinite loop with reasonable limit
                        if (counter > 1000) {
                            throw new common_1.BadRequestException('Unable to generate unique slug after 1000 attempts');
                        }
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, slug];
                }
            });
        });
    };
    /**
     * Validate if a slug meets SEO best practices
     */
    SlugUtil.validate = function (slug) {
        var errors = [];
        if (!slug) {
            errors.push('Slug cannot be empty');
        }
        if (slug !== slug.toLowerCase()) {
            errors.push('Slug should be lowercase');
        }
        if (slug.includes(' ')) {
            errors.push('Slug should not contain spaces');
        }
        if (slug.startsWith('-') || slug.endsWith('-')) {
            errors.push('Slug should not start or end with hyphens');
        }
        if (slug.includes('--')) {
            errors.push('Slug should not contain consecutive hyphens');
        }
        if (slug.length > 100) {
            errors.push('Slug should be under 100 characters for optimal SEO');
        }
        if (!/^[a-z0-9-]*$/.test(slug)) {
            errors.push('Slug should only contain lowercase letters, numbers, and hyphens');
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
        };
    };
    return SlugUtil;
}());
exports.SlugUtil = SlugUtil;
