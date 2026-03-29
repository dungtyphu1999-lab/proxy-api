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
exports.IsHttpUrl = exports.IsHttpUrlConstraint = exports.IsNotEmptyNumber = exports.IsNotEmptyNumberConstraint = exports.IsTrimmedMinLength = exports.IsTrimmedMinLengthConstraint = exports.IsNotEmptyString = exports.IsNotEmptyStringConstraint = exports.IsValidDateRange = exports.IsValidDateRangeConstraint = exports.IsFutureDate = exports.IsFutureDateConstraint = exports.IsValidPassword = exports.IsValidPasswordConstraint = exports.IsSlug = exports.IsSlugConstraint = exports.IsVietnamesePhoneNumber = exports.IsVietnamesePhoneNumberConstraint = void 0;
var class_validator_1 = require("class-validator");
// Custom validator for Vietnamese phone numbers
var IsVietnamesePhoneNumberConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isVietnamesePhoneNumber', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsVietnamesePhoneNumberConstraint = _classThis = /** @class */ (function () {
        function IsVietnamesePhoneNumberConstraint_1() {
        }
        IsVietnamesePhoneNumberConstraint_1.prototype.validate = function (phoneNumber) {
            if (!phoneNumber)
                return true; // Let @IsOptional handle this
            // Vietnamese phone number regex: +84 or 0 followed by 9-10 digits
            var vietnamesePhoneRegex = /^(\+84|0)(3|5|7|8|9)[0-9]{8}$/;
            return vietnamesePhoneRegex.test(phoneNumber.replace(/\s+/g, ''));
        };
        IsVietnamesePhoneNumberConstraint_1.prototype.defaultMessage = function () {
            return 'Phone number must be a valid Vietnamese phone number';
        };
        return IsVietnamesePhoneNumberConstraint_1;
    }());
    __setFunctionName(_classThis, "IsVietnamesePhoneNumberConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsVietnamesePhoneNumberConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsVietnamesePhoneNumberConstraint = _classThis;
}();
exports.IsVietnamesePhoneNumberConstraint = IsVietnamesePhoneNumberConstraint;
var IsVietnamesePhoneNumber = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsVietnamesePhoneNumberConstraint,
        });
    };
};
exports.IsVietnamesePhoneNumber = IsVietnamesePhoneNumber;
// Custom validator for slugs
var IsSlugConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isSlug', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsSlugConstraint = _classThis = /** @class */ (function () {
        function IsSlugConstraint_1() {
        }
        IsSlugConstraint_1.prototype.validate = function (slug) {
            if (!slug)
                return true; // Let @IsOptional handle this
            // Slug regex: lowercase letters, numbers, hyphens, no consecutive hyphens
            var slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
            return slugRegex.test(slug);
        };
        IsSlugConstraint_1.prototype.defaultMessage = function () {
            return 'Slug must contain only lowercase letters, numbers, and hyphens';
        };
        return IsSlugConstraint_1;
    }());
    __setFunctionName(_classThis, "IsSlugConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsSlugConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsSlugConstraint = _classThis;
}();
exports.IsSlugConstraint = IsSlugConstraint;
var IsSlug = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsSlugConstraint,
        });
    };
};
exports.IsSlug = IsSlug;
// Custom validator for password
var IsValidPasswordConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isValidPassword', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsValidPasswordConstraint = _classThis = /** @class */ (function () {
        function IsValidPasswordConstraint_1() {
        }
        IsValidPasswordConstraint_1.prototype.validate = function (password) {
            if (!password)
                return true; // Let @IsOptional handle this
            // Password regex: 8-20 chars, letters + numbers + common special chars, no spaces
            var passwordRegex = /^[A-Za-z\d@$!%*?&._\-+=(){}[\]:;"'<>,./?]{8,20}$/;
            return passwordRegex.test(password);
        };
        IsValidPasswordConstraint_1.prototype.defaultMessage = function () {
            return 'Password must be 8-20 characters long, can contain letters, numbers, and special characters (@$!%*?&._-+=(){}[]:;"\'<>,./?), no spaces allowed';
        };
        return IsValidPasswordConstraint_1;
    }());
    __setFunctionName(_classThis, "IsValidPasswordConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsValidPasswordConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsValidPasswordConstraint = _classThis;
}();
exports.IsValidPasswordConstraint = IsValidPasswordConstraint;
var IsValidPassword = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidPasswordConstraint,
        });
    };
};
exports.IsValidPassword = IsValidPassword;
var IsFutureDateConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isFutureDate', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsFutureDateConstraint = _classThis = /** @class */ (function () {
        function IsFutureDateConstraint_1() {
        }
        IsFutureDateConstraint_1.prototype.validate = function (dateString) {
            if (!dateString)
                return true;
            var inputDate = new Date(dateString);
            var now = new Date();
            // Reset time to start of day for comparison
            now.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);
            return inputDate >= now;
        };
        IsFutureDateConstraint_1.prototype.defaultMessage = function () {
            return 'Date must be today or in the future';
        };
        return IsFutureDateConstraint_1;
    }());
    __setFunctionName(_classThis, "IsFutureDateConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsFutureDateConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsFutureDateConstraint = _classThis;
}();
exports.IsFutureDateConstraint = IsFutureDateConstraint;
var IsFutureDate = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFutureDateConstraint,
        });
    };
};
exports.IsFutureDate = IsFutureDate;
var IsValidDateRangeConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isValidDateRange', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsValidDateRangeConstraint = _classThis = /** @class */ (function () {
        function IsValidDateRangeConstraint_1() {
        }
        IsValidDateRangeConstraint_1.prototype.validate = function (endDate, args) {
            if (!endDate)
                return true; // Let @IsOptional handle this
            var dateObject = args.object;
            var startDate = dateObject.start_date;
            if (!startDate)
                return true; // If no start_date, we can't validate range
            var start = new Date(startDate);
            var end = new Date(endDate);
            // Reset time to start of day for accurate date comparison
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);
            return end >= start; // Changed from start < end to end >= start
        };
        IsValidDateRangeConstraint_1.prototype.defaultMessage = function () {
            return 'End date must be equal to or after start date';
        };
        return IsValidDateRangeConstraint_1;
    }());
    __setFunctionName(_classThis, "IsValidDateRangeConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsValidDateRangeConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsValidDateRangeConstraint = _classThis;
}();
exports.IsValidDateRangeConstraint = IsValidDateRangeConstraint;
var IsValidDateRange = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidDateRangeConstraint,
        });
    };
};
exports.IsValidDateRange = IsValidDateRange;
var IsNotEmptyStringConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isNotEmptyString', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsNotEmptyStringConstraint = _classThis = /** @class */ (function () {
        function IsNotEmptyStringConstraint_1() {
        }
        IsNotEmptyStringConstraint_1.prototype.validate = function (text) {
            if (!text)
                return false; // Null or undefined is not valid
            // Check if string contains at least one non-whitespace character
            return text.trim().length > 0;
        };
        IsNotEmptyStringConstraint_1.prototype.defaultMessage = function () {
            return 'Field cannot be empty or contain only whitespace characters';
        };
        return IsNotEmptyStringConstraint_1;
    }());
    __setFunctionName(_classThis, "IsNotEmptyStringConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsNotEmptyStringConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsNotEmptyStringConstraint = _classThis;
}();
exports.IsNotEmptyStringConstraint = IsNotEmptyStringConstraint;
var IsNotEmptyString = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNotEmptyStringConstraint,
        });
    };
};
exports.IsNotEmptyString = IsNotEmptyString;
// Custom validator for minimum length after trimming whitespace
var IsTrimmedMinLengthConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isTrimmedMinLength', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsTrimmedMinLengthConstraint = _classThis = /** @class */ (function () {
        function IsTrimmedMinLengthConstraint_1() {
        }
        IsTrimmedMinLengthConstraint_1.prototype.validate = function (text, args) {
            if (!text)
                return false;
            var minLength = args.constraints[0];
            return text.trim().length >= minLength;
        };
        IsTrimmedMinLengthConstraint_1.prototype.defaultMessage = function (args) {
            var minLength = args.constraints[0];
            return "Field must be at least ".concat(minLength, " characters long (excluding leading/trailing spaces)");
        };
        return IsTrimmedMinLengthConstraint_1;
    }());
    __setFunctionName(_classThis, "IsTrimmedMinLengthConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsTrimmedMinLengthConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsTrimmedMinLengthConstraint = _classThis;
}();
exports.IsTrimmedMinLengthConstraint = IsTrimmedMinLengthConstraint;
var IsTrimmedMinLength = function (minLength, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [minLength],
            validator: IsTrimmedMinLengthConstraint,
        });
    };
};
exports.IsTrimmedMinLength = IsTrimmedMinLength;
var IsNotEmptyNumberConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isNotEmptyNumber', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsNotEmptyNumberConstraint = _classThis = /** @class */ (function () {
        function IsNotEmptyNumberConstraint_1() {
        }
        IsNotEmptyNumberConstraint_1.prototype.validate = function (value) {
            if (value === undefined || value === null) {
                return false;
            }
            if (typeof value === 'number' && Number.isNaN(value)) {
                return false;
            }
            if (typeof value === 'string') {
                return value.trim().length > 0;
            }
            return true;
        };
        IsNotEmptyNumberConstraint_1.prototype.defaultMessage = function () {
            return 'Field cannot be empty or contain only whitespace characters';
        };
        return IsNotEmptyNumberConstraint_1;
    }());
    __setFunctionName(_classThis, "IsNotEmptyNumberConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsNotEmptyNumberConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsNotEmptyNumberConstraint = _classThis;
}();
exports.IsNotEmptyNumberConstraint = IsNotEmptyNumberConstraint;
var IsNotEmptyNumber = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNotEmptyNumberConstraint,
        });
    };
};
exports.IsNotEmptyNumber = IsNotEmptyNumber;
var IsHttpUrlConstraint = function () {
    var _classDecorators = [(0, class_validator_1.ValidatorConstraint)({ name: 'isHttpUrl', async: false })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IsHttpUrlConstraint = _classThis = /** @class */ (function () {
        function IsHttpUrlConstraint_1() {
        }
        IsHttpUrlConstraint_1.prototype.validate = function (url) {
            if (!url)
                return true;
            // HTTP/HTTPS URL regex: must start with http:// or https://
            var httpUrlRegex = /^https?:\/\/.+/;
            return httpUrlRegex.test(url);
        };
        IsHttpUrlConstraint_1.prototype.defaultMessage = function () {
            return 'URL must start with http:// or https://';
        };
        return IsHttpUrlConstraint_1;
    }());
    __setFunctionName(_classThis, "IsHttpUrlConstraint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsHttpUrlConstraint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsHttpUrlConstraint = _classThis;
}();
exports.IsHttpUrlConstraint = IsHttpUrlConstraint;
var IsHttpUrl = function (validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsHttpUrlConstraint,
        });
    };
};
exports.IsHttpUrl = IsHttpUrl;
