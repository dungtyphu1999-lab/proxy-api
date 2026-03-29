"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DANGEROUS_CHARS_REGEX = exports.MAX_CONTENT_LENGTH = exports.MAX_TITLE_LENGTH = void 0;
/**
 * Constants related to blog post validation
 */
exports.MAX_TITLE_LENGTH = 255;
exports.MAX_CONTENT_LENGTH = 2500;
exports.DANGEROUS_CHARS_REGEX = /[<>{}()[\]\\/"'`;]/g;
