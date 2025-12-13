"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
async function bootstrap() {
    dotenv.config(); // Load .env file FIRST
    console.log('jwt secret', process.env.JWT_SECRET);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
