import { Injectable } from '@nestjs/common';
import { Repo } from './repo.interface';
import { CreateRepoDto } from './dto/create-repo';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { files, repos } from 'src/db/schema';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { eq } from 'drizzle-orm';
import { err, ok, Result } from 'neverthrow';
import { RemoveRepoDto } from './dto/remove-repo';

@Injectable()
export class RepoService {
  constructor(private readonly drizzleService: DrizzleService) {}

  private async findTestFiles(dirPath: string): Promise<string[]> {
    try {
      const files = await fs.readdir(dirPath, {
        recursive: true,
        withFileTypes: false,
      });
      console.log(files.length);

      return files
        .filter((file) => file.endsWith('.test.ts'))
        .map((file) => path.join(dirPath, file));
    } catch (error) {
      console.error(`Error finding test files in ${dirPath}:`, error);
      return [];
    }
  }

  async create(createRepoDto: CreateRepoDto): Promise<Result<Repo, string>> {
    const existingRepo = await this.drizzleService.db.query.repos.findFirst({
      where: eq(repos.url, createRepoDto.url),
    });
    if (existingRepo) {
      return err('Repo already exists');
    }

    const execAsync = promisify(exec);

    try {
      await execAsync(`cd ./repos && git clone ${createRepoDto.url}`);
    } catch (error) {
      console.error(error);
      return err(`Failed to clone repository: ${error}`);
    }

    const record = await this.drizzleService.db
      .insert(repos)
      .values({ url: createRepoDto.url })
      .returning();

    // Extract repo name from URL
    const repoName =
      createRepoDto.url.split('/').pop()?.replace('.git', '') ?? '';

    if (!repoName) {
      return err('Invalid repository URL');
    }

    const repoPath = path.join('./repos', repoName);
    const testFiles = await this.findTestFiles(repoPath);

    // testFiles.map(f => () => {
    //   this.drizzleService.db.insert(files).values({})
    // })
    testFiles.forEach((file) => {
      console.log(`  - ${path.relative(repoPath, file)}`);
    });

    return ok(record[0]);
  }

  async remove(removeRepoDto: RemoveRepoDto): Promise<Result<null, string>> {
    await this.drizzleService.db
      .delete(repos)
      .values({ url: removeRepoDto.url });
    return ok(null);
  }

  async findAll(): Promise<Repo[]> {
    return await this.drizzleService.db.query.repos.findMany();
  }
}
