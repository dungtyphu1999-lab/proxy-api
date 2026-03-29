"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseImageUpload = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
var add_file_upload_to_request_body_interceptor_1 = require("./add-file-upload-to-request-body.interceptor");
var MultipartFormData = (0, swagger_1.ApiConsumes)('multipart/form-data');
var UseImageUpload = function (fieldName) {
    if (fieldName === void 0) { fieldName = 'file'; }
    var multerOptions = {
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
        fileFilter: function (req, file, cb) {
            // Check file type
            if (!file.mimetype.startsWith('image/')) {
                return cb(new common_1.BadRequestException('Only image files are allowed. Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP'), false);
            }
            // Check file extension
            var allowedExtensions = [
                '.jpg',
                '.jpeg',
                '.png',
                '.gif',
                '.webp',
                '.bmp',
            ];
            var fileExtension = file.originalname
                .toLowerCase()
                .substring(file.originalname.lastIndexOf('.'));
            if (!allowedExtensions.includes(fileExtension)) {
                return cb(new common_1.BadRequestException("Invalid file extension. Allowed extensions: ".concat(allowedExtensions.join(', '))), false);
            }
            cb(null, true);
        },
    };
    return (0, common_1.applyDecorators)(MultipartFormData, (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(fieldName, multerOptions), add_file_upload_to_request_body_interceptor_1.AddFileUploadToRequestBodyInterceptor));
};
exports.UseImageUpload = UseImageUpload;
