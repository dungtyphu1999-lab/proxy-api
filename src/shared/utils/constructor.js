"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialClass = exports.ExactClass = void 0;
var ExactClass = /** @class */ (function () {
    function ExactClass(properties) {
        Object.assign(this, properties);
    }
    return ExactClass;
}());
exports.ExactClass = ExactClass;
var PartialClass = /** @class */ (function () {
    function PartialClass(properties) {
        if (properties === void 0) { properties = {}; }
        Object.assign(this, properties);
    }
    return PartialClass;
}());
exports.PartialClass = PartialClass;
