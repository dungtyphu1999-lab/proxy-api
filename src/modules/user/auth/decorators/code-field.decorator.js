"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeField = CodeField;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
function CodeField() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        description: '6-digit verification code',
        example: '123456',
        minLength: 6,
        maxLength: 6,
    }), (0, class_validator_1.IsString)({ message: 'Verification code must be a string' }), (0, class_validator_1.Length)(6, 6, { message: 'Verification code must be exactly 6 digits' }), (0, class_validator_1.Matches)(/^\d{6}$/, {
        message: 'Verification code must contain only digits',
    }));
}
