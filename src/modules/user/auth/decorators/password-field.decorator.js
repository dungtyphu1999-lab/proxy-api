"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordField = PasswordField;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
function PasswordField() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'password123',
        minLength: 6,
        maxLength: 50,
    }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(6), (0, class_validator_1.MaxLength)(50));
}
