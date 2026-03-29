"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformTimeString = exports.TransformDateStringOnly = exports.Expose = exports.ToMultilines = exports.ToBoolean = exports.Default = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var Default = function (defaultValue) {
    return (0, common_1.applyDecorators)((0, class_transformer_1.Expose)(), (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        return typeof value === 'undefined' ? defaultValue : value;
    }), (0, swagger_1.ApiProperty)({
        required: false,
        default: defaultValue,
    }));
};
exports.Default = Default;
var ToBoolean = function () {
    return (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        if (['true', '1', 1].includes(value)) {
            return true;
        }
        if (['false', '0', 0].includes(value)) {
            return false;
        }
        return value;
    });
};
exports.ToBoolean = ToBoolean;
var ToMultilines = function () {
    return (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        if (typeof value === 'string') {
            return value.replace(/\\n/g, '\n');
        }
        return value;
    });
};
exports.ToMultilines = ToMultilines;
var Expose = function (options) {
    return common_1.applyDecorators.apply(void 0, __spreadArray([(0, class_transformer_1.Expose)(options)], ((options === null || options === void 0 ? void 0 : options.name) ? [(0, swagger_1.ApiProperty)({ name: options.name })] : []), false));
};
exports.Expose = Expose;
var TransformDateStringOnly = function () {
    return (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        if (typeof value !== 'string') {
            return value;
        }
        return value.replace(/\//g, '-').trim();
    });
};
exports.TransformDateStringOnly = TransformDateStringOnly;
var TransformTimeString = function () {
    return (0, class_transformer_1.Transform)(function (_a) {
        var value = _a.value;
        if (typeof value !== 'string') {
            return value;
        }
        var _b = value.split(' '), dateString = _b[0], _c = _b[1], timeString = _c === void 0 ? '00:00:00' : _c;
        return "".concat(dateString, " ").concat(timeString);
    });
};
exports.TransformTimeString = TransformTimeString;
