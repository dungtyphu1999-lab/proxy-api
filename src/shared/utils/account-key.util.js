"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAccountKeys = exports.extractAccountKey = void 0;
var extractAccountKey = function (line, delimiter, keyColumn) {
    var _a;
    var trimmed = (line !== null && line !== void 0 ? line : '').trim();
    if (!trimmed)
        return null;
    var parts = delimiter ? trimmed.split(delimiter) : [trimmed];
    var idx = Math.max(0, (keyColumn !== null && keyColumn !== void 0 ? keyColumn : 1) - 1);
    var key = ((_a = parts[idx]) !== null && _a !== void 0 ? _a : '').trim();
    return key || trimmed;
};
exports.extractAccountKey = extractAccountKey;
var extractAccountKeys = function (lines, delimiter, keyColumn) {
    var keys = new Set();
    lines.forEach(function (line) {
        var key = (0, exports.extractAccountKey)(line, delimiter, keyColumn);
        if (key) {
            keys.add(key);
        }
    });
    return Array.from(keys);
};
exports.extractAccountKeys = extractAccountKeys;
