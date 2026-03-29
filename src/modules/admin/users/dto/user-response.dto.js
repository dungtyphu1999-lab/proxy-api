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
exports.UserResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var UserResponseDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _username_decorators;
    var _username_initializers = [];
    var _username_extraInitializers = [];
    var _is_verified_decorators;
    var _is_verified_initializers = [];
    var _is_verified_extraInitializers = [];
    var _is_locked_decorators;
    var _is_locked_initializers = [];
    var _is_locked_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _phone_number_decorators;
    var _phone_number_initializers = [];
    var _phone_number_extraInitializers = [];
    var _locked_at_decorators;
    var _locked_at_initializers = [];
    var _locked_at_extraInitializers = [];
    var _wallet_balance_decorators;
    var _wallet_balance_initializers = [];
    var _wallet_balance_extraInitializers = [];
    var _wallet_currency_decorators;
    var _wallet_currency_initializers = [];
    var _wallet_currency_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UserResponseDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.email = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.username = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _username_initializers, void 0));
                this.is_verified = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _is_verified_initializers, void 0));
                this.is_locked = (__runInitializers(this, _is_verified_extraInitializers), __runInitializers(this, _is_locked_initializers, void 0));
                this.created_at = (__runInitializers(this, _is_locked_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.phone_number = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _phone_number_initializers, void 0));
                this.locked_at = (__runInitializers(this, _phone_number_extraInitializers), __runInitializers(this, _locked_at_initializers, void 0));
                this.wallet_balance = (__runInitializers(this, _locked_at_extraInitializers), __runInitializers(this, _wallet_balance_initializers, void 0));
                this.wallet_currency = (__runInitializers(this, _wallet_balance_extraInitializers), __runInitializers(this, _wallet_currency_initializers, void 0));
                __runInitializers(this, _wallet_currency_extraInitializers);
            }
            return UserResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)()];
            _email_decorators = [(0, swagger_1.ApiProperty)()];
            _username_decorators = [(0, swagger_1.ApiProperty)()];
            _is_verified_decorators = [(0, swagger_1.ApiProperty)()];
            _is_locked_decorators = [(0, swagger_1.ApiProperty)()];
            _created_at_decorators = [(0, swagger_1.ApiProperty)()];
            _phone_number_decorators = [(0, swagger_1.ApiProperty)({ required: false })];
            _locked_at_decorators = [(0, swagger_1.ApiProperty)({ required: false })];
            _wallet_balance_decorators = [(0, swagger_1.ApiProperty)({ required: false })];
            _wallet_currency_decorators = [(0, swagger_1.ApiProperty)({ required: false })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: function (obj) { return "username" in obj; }, get: function (obj) { return obj.username; }, set: function (obj, value) { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _is_verified_decorators, { kind: "field", name: "is_verified", static: false, private: false, access: { has: function (obj) { return "is_verified" in obj; }, get: function (obj) { return obj.is_verified; }, set: function (obj, value) { obj.is_verified = value; } }, metadata: _metadata }, _is_verified_initializers, _is_verified_extraInitializers);
            __esDecorate(null, null, _is_locked_decorators, { kind: "field", name: "is_locked", static: false, private: false, access: { has: function (obj) { return "is_locked" in obj; }, get: function (obj) { return obj.is_locked; }, set: function (obj, value) { obj.is_locked = value; } }, metadata: _metadata }, _is_locked_initializers, _is_locked_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _phone_number_decorators, { kind: "field", name: "phone_number", static: false, private: false, access: { has: function (obj) { return "phone_number" in obj; }, get: function (obj) { return obj.phone_number; }, set: function (obj, value) { obj.phone_number = value; } }, metadata: _metadata }, _phone_number_initializers, _phone_number_extraInitializers);
            __esDecorate(null, null, _locked_at_decorators, { kind: "field", name: "locked_at", static: false, private: false, access: { has: function (obj) { return "locked_at" in obj; }, get: function (obj) { return obj.locked_at; }, set: function (obj, value) { obj.locked_at = value; } }, metadata: _metadata }, _locked_at_initializers, _locked_at_extraInitializers);
            __esDecorate(null, null, _wallet_balance_decorators, { kind: "field", name: "wallet_balance", static: false, private: false, access: { has: function (obj) { return "wallet_balance" in obj; }, get: function (obj) { return obj.wallet_balance; }, set: function (obj, value) { obj.wallet_balance = value; } }, metadata: _metadata }, _wallet_balance_initializers, _wallet_balance_extraInitializers);
            __esDecorate(null, null, _wallet_currency_decorators, { kind: "field", name: "wallet_currency", static: false, private: false, access: { has: function (obj) { return "wallet_currency" in obj; }, get: function (obj) { return obj.wallet_currency; }, set: function (obj, value) { obj.wallet_currency = value; } }, metadata: _metadata }, _wallet_currency_initializers, _wallet_currency_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UserResponseDto = UserResponseDto;
