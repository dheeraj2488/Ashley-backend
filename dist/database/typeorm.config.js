"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("../entities/user.entity");
const product_entity_1 = require("../entities/product.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, product_entity_1.Product],
    synchronize: true, // ⚠️ dev only
};
