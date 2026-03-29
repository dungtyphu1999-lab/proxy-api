"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlugWithId = generateSlugWithId;
var nanoid_1 = require("nanoid");
var slugify_1 = require("slugify");
var nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 6);
function generateSlugWithId(name) {
    var baseSlug = (0, slugify_1.default)(name, { lower: true, strict: true });
    return "".concat(baseSlug, "-").concat(nanoid());
}
