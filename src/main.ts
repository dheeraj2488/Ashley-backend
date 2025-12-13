import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Load .env file FIRST
console.log('jwt secret' , process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
