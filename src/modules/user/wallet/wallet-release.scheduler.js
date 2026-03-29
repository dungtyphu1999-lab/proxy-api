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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletReleaseScheduler = void 0;
var common_1 = require("@nestjs/common");
var WalletReleaseScheduler = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WalletReleaseScheduler = _classThis = /** @class */ (function () {
        function WalletReleaseScheduler_1(walletReleaseService) {
            this.walletReleaseService = walletReleaseService;
            this.logger = new common_1.Logger(WalletReleaseScheduler.name);
        }
        WalletReleaseScheduler_1.prototype.onModuleInit = function () {
            this.scheduleNextRun();
            this.logger.log('Wallet release scheduler initialized');
        };
        /**
         * Schedule the next run at 12:00 AM (midnight)
         */
        WalletReleaseScheduler_1.prototype.scheduleNextRun = function () {
            var _this = this;
            var now = new Date();
            var nextRun = new Date();
            // Set to 12:00 AM (midnight) today
            nextRun.setHours(0, 0, 0, 0);
            // If it's already past midnight today, schedule for tomorrow
            if (now >= nextRun) {
                nextRun.setDate(nextRun.getDate() + 1);
            }
            this.nextRunTime = nextRun;
            var msUntilNextRun = nextRun.getTime() - now.getTime();
            this.logger.log("Scheduled next wallet release at ".concat(nextRun.toISOString(), " (in ").concat(Math.round(msUntilNextRun / 1000 / 60), " minutes)"));
            // Clear existing interval if any
            if (this.intervalId) {
                clearTimeout(this.intervalId);
            }
            // Schedule the run
            this.intervalId = setTimeout(function () {
                void _this.handleRelease();
                // After first run, schedule daily at 12:00 AM (midnight)
                _this.scheduleDaily();
            }, msUntilNextRun);
        };
        /**
         * Schedule daily runs at 12:00 AM (midnight)
         */
        WalletReleaseScheduler_1.prototype.scheduleDaily = function () {
            var _this = this;
            // Run every 24 hours
            var dailyInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.intervalId = setInterval(function () {
                void _this.handleRelease();
            }, dailyInterval);
            this.logger.log('Scheduled daily wallet release at 12:00 AM (midnight)');
        };
        /**
         * Handle the release process
         */
        WalletReleaseScheduler_1.prototype.handleRelease = function () {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            this.logger.log('Starting scheduled wallet release process');
                            return [4 /*yield*/, this.walletReleaseService.releaseLockedBalanceToSaleBalance()];
                        case 1:
                            _a.sent();
                            this.logger.log('Scheduled wallet release process completed');
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Error in scheduled wallet release:', error_1 instanceof Error ? error_1.message : String(error_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        WalletReleaseScheduler_1.prototype.onModuleDestroy = function () {
            if (this.intervalId) {
                if (typeof this.intervalId === 'number') {
                    clearInterval(this.intervalId);
                }
                else {
                    clearTimeout(this.intervalId);
                }
            }
            this.logger.log('Wallet release scheduler destroyed');
        };
        return WalletReleaseScheduler_1;
    }());
    __setFunctionName(_classThis, "WalletReleaseScheduler");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletReleaseScheduler = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletReleaseScheduler = _classThis;
}();
exports.WalletReleaseScheduler = WalletReleaseScheduler;
