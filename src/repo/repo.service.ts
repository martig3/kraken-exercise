import { Injectable } from '@nestjs/common';
import { Repo } from './repo.interface';
import { CreateRepoDto } from './dto/create-repo';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class RepoService {
  constructor(private readonly drizzleService: DrizzleService) {}

  create(createRepoDto: CreateRepoDto) {}

  findAll(): Repo[] {
    return [];
  }
}
