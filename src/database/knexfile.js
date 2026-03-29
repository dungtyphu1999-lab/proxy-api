"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
var baseConfig = {
    client: process.env.DB_CLIENT || 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        user: process.env.DB_USER || 'your_db_user',
        password: process.env.DB_PASSWORD || 'your_db_password',
        database: process.env.DB_NAME || 'your_db_name',
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: './migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './seeds',
        extension: 'ts',
    },
};
var config = {
    development: __assign(__assign({}, baseConfig), { debug: process.env.DB_DEBUG === 'true' }),
    production: __assign({}, baseConfig),
};
exports.default = config;
