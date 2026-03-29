"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenValidationErrors = flattenValidationErrors;
var app_validation_error_dto_1 = require("../dto/app-validation-error.dto");
function flattenValidationErrors(errors, parentPath) {
    var _a;
    if (parentPath === void 0) { parentPath = ''; }
    var result = new Array();
    for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
        var error = errors_1[_i];
        var propertyPath = parentPath
            ? "".concat(parentPath, ".").concat(error.property)
            : error.property;
        if (error.constraints) {
            result.push({
                property: error.property,
                property_path: propertyPath,
                value: error.value,
                constraints: error.constraints,
            });
        }
        if ((_a = error.children) === null || _a === void 0 ? void 0 : _a.length) {
            result.push.apply(result, flattenValidationErrors(error.children, propertyPath));
        }
    }
    return new app_validation_error_dto_1.AppValidationErrors(result);
}
