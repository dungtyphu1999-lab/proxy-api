"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileOutputDto = exports.UploadImagesInputDto = exports.UploadImageInputDto = exports.UploadFileInputDto = exports.ImageFileUploadNormalSizeDto = exports.ImageFileUploadDto = exports.FileUploadDto = void 0;
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var FileUploadDto = function () {
    var _a;
    var _fieldname_decorators;
    var _fieldname_initializers = [];
    var _fieldname_extraInitializers = [];
    var _originalname_decorators;
    var _originalname_initializers = [];
    var _originalname_extraInitializers = [];
    var _encoding_decorators;
    var _encoding_initializers = [];
    var _encoding_extraInitializers = [];
    var _mimetype_decorators;
    var _mimetype_initializers = [];
    var _mimetype_extraInitializers = [];
    var _destination_decorators;
    var _destination_initializers = [];
    var _destination_extraInitializers = [];
    var _filename_decorators;
    var _filename_initializers = [];
    var _filename_extraInitializers = [];
    var _path_decorators;
    var _path_initializers = [];
    var _path_extraInitializers = [];
    var _size_decorators;
    var _size_initializers = [];
    var _size_extraInitializers = [];
    var _$ref_decorators;
    var _$ref_initializers = [];
    var _$ref_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FileUploadDto() {
                this.fieldname = __runInitializers(this, _fieldname_initializers, void 0);
                this.originalname = (__runInitializers(this, _fieldname_extraInitializers), __runInitializers(this, _originalname_initializers, void 0));
                this.encoding = (__runInitializers(this, _originalname_extraInitializers), __runInitializers(this, _encoding_initializers, void 0));
                this.mimetype = (__runInitializers(this, _encoding_extraInitializers), __runInitializers(this, _mimetype_initializers, void 0));
                this.destination = (__runInitializers(this, _mimetype_extraInitializers), __runInitializers(this, _destination_initializers, void 0));
                this.filename = (__runInitializers(this, _destination_extraInitializers), __runInitializers(this, _filename_initializers, void 0));
                this.path = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _path_initializers, void 0));
                this.size = (__runInitializers(this, _path_extraInitializers), __runInitializers(this, _size_initializers, void 0));
                this.$ref = (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _$ref_initializers, void 0));
                __runInitializers(this, _$ref_extraInitializers);
            }
            return FileUploadDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _fieldname_decorators = [(0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _originalname_decorators = [(0, class_validator_1.MaxLength)(255), (0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _encoding_decorators = [(0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _mimetype_decorators = [(0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _destination_decorators = [(0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _filename_decorators = [(0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _path_decorators = [(0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _size_decorators = [(0, class_validator_1.IsInt)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _$ref_decorators = [(0, class_validator_1.IsDefined)()];
            __esDecorate(null, null, _fieldname_decorators, { kind: "field", name: "fieldname", static: false, private: false, access: { has: function (obj) { return "fieldname" in obj; }, get: function (obj) { return obj.fieldname; }, set: function (obj, value) { obj.fieldname = value; } }, metadata: _metadata }, _fieldname_initializers, _fieldname_extraInitializers);
            __esDecorate(null, null, _originalname_decorators, { kind: "field", name: "originalname", static: false, private: false, access: { has: function (obj) { return "originalname" in obj; }, get: function (obj) { return obj.originalname; }, set: function (obj, value) { obj.originalname = value; } }, metadata: _metadata }, _originalname_initializers, _originalname_extraInitializers);
            __esDecorate(null, null, _encoding_decorators, { kind: "field", name: "encoding", static: false, private: false, access: { has: function (obj) { return "encoding" in obj; }, get: function (obj) { return obj.encoding; }, set: function (obj, value) { obj.encoding = value; } }, metadata: _metadata }, _encoding_initializers, _encoding_extraInitializers);
            __esDecorate(null, null, _mimetype_decorators, { kind: "field", name: "mimetype", static: false, private: false, access: { has: function (obj) { return "mimetype" in obj; }, get: function (obj) { return obj.mimetype; }, set: function (obj, value) { obj.mimetype = value; } }, metadata: _metadata }, _mimetype_initializers, _mimetype_extraInitializers);
            __esDecorate(null, null, _destination_decorators, { kind: "field", name: "destination", static: false, private: false, access: { has: function (obj) { return "destination" in obj; }, get: function (obj) { return obj.destination; }, set: function (obj, value) { obj.destination = value; } }, metadata: _metadata }, _destination_initializers, _destination_extraInitializers);
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: function (obj) { return "filename" in obj; }, get: function (obj) { return obj.filename; }, set: function (obj, value) { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _path_decorators, { kind: "field", name: "path", static: false, private: false, access: { has: function (obj) { return "path" in obj; }, get: function (obj) { return obj.path; }, set: function (obj, value) { obj.path = value; } }, metadata: _metadata }, _path_initializers, _path_extraInitializers);
            __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: function (obj) { return "size" in obj; }, get: function (obj) { return obj.size; }, set: function (obj, value) { obj.size = value; } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
            __esDecorate(null, null, _$ref_decorators, { kind: "field", name: "$ref", static: false, private: false, access: { has: function (obj) { return "$ref" in obj; }, get: function (obj) { return obj.$ref; }, set: function (obj, value) { obj.$ref = value; } }, metadata: _metadata }, _$ref_initializers, _$ref_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FileUploadDto = FileUploadDto;
var ImageFileUploadDto = /** @class */ (function (_super) {
    __extends(ImageFileUploadDto, _super);
    function ImageFileUploadDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageFileUploadDto;
}(FileUploadDto));
exports.ImageFileUploadDto = ImageFileUploadDto;
var ImageFileUploadNormalSizeDto = /** @class */ (function (_super) {
    __extends(ImageFileUploadNormalSizeDto, _super);
    function ImageFileUploadNormalSizeDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageFileUploadNormalSizeDto;
}(ImageFileUploadDto));
exports.ImageFileUploadNormalSizeDto = ImageFileUploadNormalSizeDto;
// Input DTOs
var UploadFileInputDto = function () {
    var _a;
    var _file_decorators;
    var _file_initializers = [];
    var _file_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UploadFileInputDto() {
                this.file = __runInitializers(this, _file_initializers, void 0);
                __runInitializers(this, _file_extraInitializers);
            }
            return UploadFileInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _file_decorators = [(0, swagger_1.ApiProperty)({
                    type: 'string',
                    format: 'binary',
                    description: 'File to upload',
                })];
            __esDecorate(null, null, _file_decorators, { kind: "field", name: "file", static: false, private: false, access: { has: function (obj) { return "file" in obj; }, get: function (obj) { return obj.file; }, set: function (obj, value) { obj.file = value; } }, metadata: _metadata }, _file_initializers, _file_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UploadFileInputDto = UploadFileInputDto;
var UploadImageInputDto = function () {
    var _a;
    var _file_decorators;
    var _file_initializers = [];
    var _file_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UploadImageInputDto() {
                this.file = __runInitializers(this, _file_initializers, void 0);
                __runInitializers(this, _file_extraInitializers);
            }
            return UploadImageInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _file_decorators = [(0, swagger_1.ApiProperty)({
                    type: 'string',
                    format: 'binary',
                    description: 'Image file to upload (max 2MB). Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP',
                })];
            __esDecorate(null, null, _file_decorators, { kind: "field", name: "file", static: false, private: false, access: { has: function (obj) { return "file" in obj; }, get: function (obj) { return obj.file; }, set: function (obj, value) { obj.file = value; } }, metadata: _metadata }, _file_initializers, _file_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UploadImageInputDto = UploadImageInputDto;
var UploadImagesInputDto = function () {
    var _a;
    var _files_decorators;
    var _files_initializers = [];
    var _files_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UploadImagesInputDto() {
                this.files = __runInitializers(this, _files_initializers, void 0);
                __runInitializers(this, _files_extraInitializers);
            }
            return UploadImagesInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _files_decorators = [(0, swagger_1.ApiProperty)({
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                    description: 'Image files to upload (max 5 files, 2MB each)',
                })];
            __esDecorate(null, null, _files_decorators, { kind: "field", name: "files", static: false, private: false, access: { has: function (obj) { return "files" in obj; }, get: function (obj) { return obj.files; }, set: function (obj, value) { obj.files = value; } }, metadata: _metadata }, _files_initializers, _files_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UploadImagesInputDto = UploadImagesInputDto;
// Output DTOs
var UploadFileOutputDto = function () {
    var _a;
    var _filename_decorators;
    var _filename_initializers = [];
    var _filename_extraInitializers = [];
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _path_decorators;
    var _path_initializers = [];
    var _path_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UploadFileOutputDto() {
                this.filename = __runInitializers(this, _filename_initializers, void 0);
                this.url = (__runInitializers(this, _filename_extraInitializers), __runInitializers(this, _url_initializers, void 0));
                this.path = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _path_initializers, void 0));
                __runInitializers(this, _path_extraInitializers);
            }
            return UploadFileOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _filename_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Generated filename',
                    example: 'my-file-123e4567-e89b-12d3-a456-426614174000.jpg',
                })];
            _url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File URL',
                    example: 'uploads/images/my-file-123e4567-e89b-12d3-a456-426614174000.jpg',
                })];
            _path_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File path',
                    example: 'uploads/images/my-file-123e4567-e89b-12d3-a456-426614174000.jpg',
                })];
            __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: function (obj) { return "filename" in obj; }, get: function (obj) { return obj.filename; }, set: function (obj, value) { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _path_decorators, { kind: "field", name: "path", static: false, private: false, access: { has: function (obj) { return "path" in obj; }, get: function (obj) { return obj.path; }, set: function (obj, value) { obj.path = value; } }, metadata: _metadata }, _path_initializers, _path_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UploadFileOutputDto = UploadFileOutputDto;
