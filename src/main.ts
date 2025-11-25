import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Database from 'libsql';
import { drizzle } from 'drizzle-orm/libsql';

async function bootstrap() {
  // new Database('./app.db');
  // const db = drizzle('./app.db');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
