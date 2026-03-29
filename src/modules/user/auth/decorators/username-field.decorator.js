"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameField = UsernameField;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
function UsernameField() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiProperty)({
        description: 'User unique username',
        example: 'johndoe',
        required: true,
        type: String,
        maxLength: 30,
        minLength: 8,
    }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(8), (0, class_validator_1.MaxLength)(30));
}
