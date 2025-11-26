import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { files as filesTable } from 'src/db/schema';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class FilesService {
  constructor(private readonly drizzleService: DrizzleService) {}
  async findManyByRepo(repoId: UUID) {
    const files = await this.drizzleService.db.query.files.findMany({
      where: eq(filesTable.repoId, repoId),
    });
    return files;
  }
}
