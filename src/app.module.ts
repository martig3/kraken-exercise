import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepoService } from './repo/repo.service';
import { DrizzleService } from './drizzle/drizzle.service';
import { RepoController } from './repo/repo.controller';
import { CoverageService } from './coverage/coverage.service';
import { FilesService } from './files/files.service';

@Module({
  imports: [],
  controllers: [AppController, RepoController],
  providers: [
    AppService,
    RepoService,
    DrizzleService,
    CoverageService,
    FilesService,
  ],
})
export class AppModule {}
