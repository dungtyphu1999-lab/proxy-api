"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneField = PhoneField;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
function PhoneField() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        description: 'User phone number',
        example: '+1234567890',
        required: true,
        type: String,
        maxLength: 20,
    }), (0, class_validator_1.Matches)(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/, {
        message: 'Invalid phone number format',
    }), (0, class_validator_1.MaxLength)(20));
}
