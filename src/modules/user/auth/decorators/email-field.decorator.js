"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailField = EmailField;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
function EmailField() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        description: 'User email address',
        example: 'user@example.com',
        required: true,
        type: String,
        maxLength: 100,
        format: 'email',
    }), (0, class_validator_1.IsEmail)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MaxLength)(100), (0, class_validator_1.Matches)(/^[^.]*\.?[^.]*\.?[^.]*$/, {
        message: 'Email address can contain maximum two dots',
    }));
}
