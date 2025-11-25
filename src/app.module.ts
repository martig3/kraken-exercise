import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepoService } from './repo/repo.service';
import { DrizzleService } from './drizzle/drizzle.service';
import { RepoController } from './repo/repo.controller';

@Module({
  imports: [],
  controllers: [AppController, RepoController],
  providers: [AppService, RepoService, DrizzleService],
})
export class AppModule {}
