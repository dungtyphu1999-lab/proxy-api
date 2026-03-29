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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileOutputDto = exports.UploadFileInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
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
