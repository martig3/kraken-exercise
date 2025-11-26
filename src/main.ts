import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Database from 'libsql';
import { exec } from 'node:child_process';
import { configDotenv } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  configDotenv();
  // create sqlite db file if it doesn't exist
  new Database(process.env.DB_URL!);

  // apply migrations
  exec('npx drizzle-kit migrate');

  // create a folder called ./repos
  exec('mkdir ./repos');

  const app = await NestFactory.create(AppModule);
  app.enableCors('*');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
