"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: '127.0.0.1',
    password: 'macampu123',
    database: 'ts_crud',
    port: 5432
});
exports.default = pool;
