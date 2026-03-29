"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canIgnoreAuth = void 0;
var use_jwt_auth_guard_decorator_1 = require("./decorators/use-jwt-auth-guard.decorator");
var canIgnoreAuth = function (reflector, context) {
    return (!!reflector.get(use_jwt_auth_guard_decorator_1.OPTIONAL_AUTH, context.getHandler()) &&
        !context.switchToHttp().getRequest().header('authorization'));
};
exports.canIgnoreAuth = canIgnoreAuth;
