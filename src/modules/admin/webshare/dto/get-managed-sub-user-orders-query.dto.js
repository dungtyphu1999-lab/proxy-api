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
exports.GetManagedSubUserOrdersQueryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var GetManagedSubUserOrdersQueryDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageRow_decorators;
    var _pageRow_initializers = [];
    var _pageRow_extraInitializers = [];
    var _keyword_decorators;
    var _keyword_initializers = [];
    var _keyword_extraInitializers = [];
    var _days_decorators;
    var _days_initializers = [];
    var _days_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetManagedSubUserOrdersQueryDto() {
                this.page = __runInitializers(this, _page_initializers, void 0);
                this.pageRow = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _pageRow_initializers, void 0));
                this.keyword = (__runInitializers(this, _pageRow_extraInitializers), __runInitializers(this, _keyword_initializers, void 0));
                this.days = (__runInitializers(this, _keyword_extraInitializers), __runInitializers(this, _days_initializers, void 0));
                __runInitializers(this, _days_extraInitializers);
            }
            return GetManagedSubUserOrdersQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Trang hiện tại',
                    example: 1,
                    default: 1,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _pageRow_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Số bản ghi mỗi trang',
                    example: 10,
                    default: 10,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _keyword_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Tìm theo mã đơn, account ID hoặc pool',
                    example: 'account-123',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _days_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Lọc theo số ngày gần nhất',
                    example: 30,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _pageRow_decorators, { kind: "field", name: "pageRow", static: false, private: false, access: { has: function (obj) { return "pageRow" in obj; }, get: function (obj) { return obj.pageRow; }, set: function (obj, value) { obj.pageRow = value; } }, metadata: _metadata }, _pageRow_initializers, _pageRow_extraInitializers);
            __esDecorate(null, null, _keyword_decorators, { kind: "field", name: "keyword", static: false, private: false, access: { has: function (obj) { return "keyword" in obj; }, get: function (obj) { return obj.keyword; }, set: function (obj, value) { obj.keyword = value; } }, metadata: _metadata }, _keyword_initializers, _keyword_extraInitializers);
            __esDecorate(null, null, _days_decorators, { kind: "field", name: "days", static: false, private: false, access: { has: function (obj) { return "days" in obj; }, get: function (obj) { return obj.days; }, set: function (obj, value) { obj.days = value; } }, metadata: _metadata }, _days_initializers, _days_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetManagedSubUserOrdersQueryDto = GetManagedSubUserOrdersQueryDto;
