"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotBlank = IsNotBlank;
var class_validator_1 = require("class-validator");
function IsNotBlank(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isNotBlank',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate: function (value) {
                    return typeof value === 'string' && value.trim().length > 0;
                },
                defaultMessage: function () {
                    return 'Field must not be empty or contain only whitespace';
                },
            },
        });
    };
}
