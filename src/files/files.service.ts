import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { err, ok } from 'neverthrow';
import {
  files,
  files as filesTable,
  InsertRepoFile,
  RepoFile,
} from 'src/db/schema';
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
  async findNextQueued() {
    return await this.drizzleService.db.query.files.findFirst({
      where: eq(files.status, 'queued'),
    });
  }
  async updateFile(updatedFile: InsertRepoFile) {
    const result = await this.drizzleService.db
      .update(files)
      .set(updatedFile)
      .where(eq(files.path, updatedFile.path));
    return result;
  }
  async insertManyFiles(newFiles: RepoFile[]) {
    try {
      await this.drizzleService.db.transaction(async (tx) => {
        // this would be batched to avoid spamming the DB ideally,
        // but I'm going to keep it simple here
        const fileInserts = await Promise.all(
          newFiles.map(async (file) => {
            const result = await tx.insert(files).values(newFiles);
            if (result.rowsAffected == 0) {
              return err(`Failed to insert file path ${file.path}`);
            }
            return ok(result);
          }),
        );
        if (fileInserts.some((result) => result.isErr())) {
          tx.rollback();
          return err('Failed to insert some file paths');
        }
      });
    } catch (error) {
      return err(`Transaction failed: ${error}`);
    }
    return ok();
  }
}
