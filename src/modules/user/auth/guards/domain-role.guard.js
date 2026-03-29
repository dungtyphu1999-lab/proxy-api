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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainRoleGuard = void 0;
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var common_1 = require("@nestjs/common");
var DomainRoleGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DomainRoleGuard = _classThis = /** @class */ (function () {
        function DomainRoleGuard_1() {
            this.logger = new common_1.Logger(DomainRoleGuard.name);
            var env = String(process.env.NODE_ENV || '').toLowerCase();
            var requestedDisable = process.env.DISABLE_DOMAIN_GUARD === 'true';
            // Allow disabling only in local development.
            this.disableGuard = requestedDisable && env === 'development';
            try {
                var parsed = JSON.parse(process.env.DOMAIN_ROLE_MAP || '{}');
                this.domainRoleMap = this.normalizeDomainRoleMap(parsed);
            }
            catch (_a) {
                this.domainRoleMap = {};
            }
        }
        DomainRoleGuard_1.prototype.normalizeDomainRoleMap = function (source) {
            var normalized = {};
            for (var _i = 0, _a = Object.entries(source || {}); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], role = _b[1];
                var variants = this.getHostVariants(key);
                for (var _c = 0, variants_1 = variants; _c < variants_1.length; _c++) {
                    var variant = variants_1[_c];
                    normalized[variant] = role;
                }
            }
            return normalized;
        };
        DomainRoleGuard_1.prototype.getHostVariants = function (value) {
            var raw = String(value || '')
                .trim()
                .toLowerCase()
                .replace(/\/+$/, '');
            if (!raw)
                return [];
            var variants = new Set([raw]);
            try {
                var url = raw.startsWith('http://') || raw.startsWith('https://')
                    ? new URL(raw)
                    : new URL("https://".concat(raw));
                variants.add(url.origin.toLowerCase());
                variants.add(url.host.toLowerCase());
                variants.add(url.hostname.toLowerCase());
            }
            catch (_a) {
                // ignore invalid URL input and keep raw variant
            }
            return __spreadArray([], variants, true);
        };
        DomainRoleGuard_1.prototype.canActivate = function (context) {
            var _this = this;
            var req = context.switchToHttp().getRequest();
            var frontendHost = req.headers['x-frontend-host'];
            var user = req.user;
            var hostHeader = String(req.headers.host || '').toLowerCase();
            var isLocalHostRequest = hostHeader.startsWith('localhost:') ||
                hostHeader.startsWith('127.0.0.1:');
            if ((this.disableGuard && isLocalHostRequest) || !frontendHost) {
                if (this.disableGuard && !isLocalHostRequest) {
                    this.logger.warn('DISABLE_DOMAIN_GUARD is ignored for non-localhost requests.');
                }
                else if (this.disableGuard) {
                    this.logger.warn('DomainRoleGuard is disabled in local development.');
                }
                return true;
            }
            var hostCandidates = this.getHostVariants(frontendHost);
            var expectedRole = hostCandidates
                .map(function (candidate) { return _this.domainRoleMap[candidate]; })
                .find(Boolean);
            if (!expectedRole) {
                this.logger.warn("DomainRoleGuard: invalid site \"".concat(frontendHost, "\", candidates=").concat(hostCandidates.join(', ')));
                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_SITE);
            }
            if (expectedRole && !user.roles.includes(expectedRole)) {
                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_SITE);
            }
            return true;
        };
        return DomainRoleGuard_1;
    }());
    __setFunctionName(_classThis, "DomainRoleGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DomainRoleGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DomainRoleGuard = _classThis;
}();
exports.DomainRoleGuard = DomainRoleGuard;
