import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepoService } from './repo/repo.service';
import { DrizzleService } from './drizzle/drizzle.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RepoService, DrizzleService],
})
export class AppModule {}
