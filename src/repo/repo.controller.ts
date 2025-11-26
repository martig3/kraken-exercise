import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { RepoService } from './repo.service';
import { CreateRepoDto } from './dto/create-repo';
import { RemoveRepoDto } from './dto/remove-repo';
import { FilesService } from 'src/files/files.service';
import { UUID } from 'crypto';

@Controller('repo')
export class RepoController {
  constructor(
    private readonly repoService: RepoService,
    private readonly filesService: FilesService,
  ) {}

  @Get('/')
  async findAll() {
    return await this.repoService.findAll();
  }
  @Get('/:repoId/files')
  async findByRepoId(@Param('repoId') repoId: string): Promise<any> {
    return await this.filesService.findManyByRepo(repoId as UUID);
  }
  @Post('/create')
  async create(@Body() createRepoDto: CreateRepoDto) {
    const result = await this.repoService.create(createRepoDto);
    if (result.isErr()) {
      throw new Error(result.error);
    }
    return result.value;
  }
  @Post('/remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Body() removeRepoDto: RemoveRepoDto) {
    const result = await this.repoService.remove(removeRepoDto);
    if (result.isErr()) {
      throw new Error(result.error);
    }
    return null;
  }
}
