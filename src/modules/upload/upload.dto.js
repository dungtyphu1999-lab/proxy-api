"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImagesDto = exports.UploadImageDto = exports.AreValidImageFilesConstraint = exports.IsValidImageFileConstraint = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var IsValidImageFileConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isValidImageFile', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsValidImageFileConstraint = _classThis = /** @class */ (function () {
        function IsValidImageFileConstraint_1() {
        }
        IsValidImageFileConstraint_1.prototype.validate = function (file) {
            if (!file)
                return false;
            // Check if file has required properties
            if (!file.mimetype || !file.originalname || !file.size)
                return false;
            // Check MIME type
            if (!file.mimetype.startsWith('image/'))
                return false;
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
            if (!allowedExtensions.includes(fileExtension))
                return false;
            // Check file size (5MB max)
            if (file.size <= 0 || file.size > 5 * 1024 * 1024)
                return false;
            // Check filename length
            if (file.originalname.length === 0 || file.originalname.length > 255)
                return false;
            return true;
        };
        IsValidImageFileConstraint_1.prototype.defaultMessage = function (args) {
            var file = args.value;
            if (!file)
                return 'File is required';
            if (!file.mimetype || !file.mimetype.startsWith('image/')) {
                return 'File must be a valid image (image/*)';
            }
            if (!file.originalname || file.originalname.length === 0) {
                return 'File must have a valid filename';
            }
            if (file.originalname.length > 255) {
                return 'Filename cannot exceed 255 characters';
            }
            if (!file.size || file.size <= 0) {
                return 'File must have valid size';
            }
            if (file.size > 5 * 1024 * 1024) {
                return 'File size cannot exceed 5MB';
            }
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
                return "Invalid file extension. Allowed: ".concat(allowedExtensions.join(', '));
            }
            return 'Invalid file';
        };
        return IsValidImageFileConstraint_1;
    }());
    __setFunctionName(_classThis, "IsValidImageFileConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsValidImageFileConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsValidImageFileConstraint = _classThis;
}();
exports.IsValidImageFileConstraint = IsValidImageFileConstraint;
var AreValidImageFilesConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'areValidImageFiles', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AreValidImageFilesConstraint = _classThis = /** @class */ (function () {
        function AreValidImageFilesConstraint_1() {
        }
        AreValidImageFilesConstraint_1.prototype.validate = function (files) {
            if (!Array.isArray(files) || files.length === 0)
                return false;
            if (files.length > 5)
                return false;
            var validator = new IsValidImageFileConstraint();
            return files.every(function (file) { return validator.validate(file); });
        };
        AreValidImageFilesConstraint_1.prototype.defaultMessage = function (args) {
            var files = args.value;
            if (!Array.isArray(files))
                return 'Files must be an array';
            if (files.length === 0)
                return 'At least one file is required';
            if (files.length > 5)
                return 'Maximum 5 files allowed';
            // Find the first invalid file and return specific error
            var validator = new IsValidImageFileConstraint();
            var invalidIndex = files.findIndex(function (file) { return !validator.validate(file); });
            if (invalidIndex >= 0) {
                var validationArgs = {
                    value: files[invalidIndex],
                };
                return "File ".concat(invalidIndex + 1, ": ").concat(validator.defaultMessage(validationArgs));
            }
            return 'Invalid files';
        };
        return AreValidImageFilesConstraint_1;
    }());
    __setFunctionName(_classThis, "AreValidImageFilesConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AreValidImageFilesConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AreValidImageFilesConstraint = _classThis;
}();
exports.AreValidImageFilesConstraint = AreValidImageFilesConstraint;
var UploadImageDto = function () {
    var _a;
    var _file_decorators;
    var _file_initializers = [];
    var _file_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UploadImageDto() {
                this.file = __runInitializers(this, _file_initializers, void 0);
                __runInitializers(this, _file_extraInitializers);
            }
            return UploadImageDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _file_decorators = [(0, swagger_1.ApiProperty)({
                    type: 'string',
                    format: 'binary',
                    description: 'Image file to upload (max 5MB). Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP',
                    required: true,
                }), (0, class_validator_1.IsDefined)({ message: 'Image file is required' }), (0, class_validator_1.IsNotEmpty)({ message: 'Image file cannot be empty' }), (0, class_validator_1.Validate)(IsValidImageFileConstraint)];
            __esDecorate(null, null, _file_decorators, { kind: "field", name: "file", static: false, private: false, access: { has: function (obj) { return "file" in obj; }, get: function (obj) { return obj.file; }, set: function (obj, value) { obj.file = value; } }, metadata: _metadata }, _file_initializers, _file_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UploadImageDto = UploadImageDto;
var UploadImagesDto = function () {
    var _a;
    var _files_decorators;
    var _files_initializers = [];
    var _files_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UploadImagesDto() {
                this.files = __runInitializers(this, _files_initializers, void 0);
                __runInitializers(this, _files_extraInitializers);
            }
            return UploadImagesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _files_decorators = [(0, swagger_1.ApiProperty)({
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    description: 'Image files to upload (1-5 files, 5MB each)',
                    required: true,
                }), (0, class_validator_1.IsDefined)({ message: 'Image files are required' }), (0, class_validator_1.IsArray)({ message: 'Files must be an array' }), (0, class_validator_1.ArrayMinSize)(1, { message: 'At least one file is required' }), (0, class_validator_1.ArrayMaxSize)(5, { message: 'Maximum 5 files allowed' }), (0, class_validator_1.Validate)(AreValidImageFilesConstraint)];
            __esDecorate(null, null, _files_decorators, { kind: "field", name: "files", static: false, private: false, access: { has: function (obj) { return "files" in obj; }, get: function (obj) { return obj.files; }, set: function (obj, value) { obj.files = value; } }, metadata: _metadata }, _files_initializers, _files_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UploadImagesDto = UploadImagesDto;
