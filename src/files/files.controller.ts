import { Body, Controller, Logger, Patch } from '@nestjs/common';
import { FilesService } from './files.service';
import { RepoFile } from 'src/db/schema';
import { RepoFileDto } from './dto/update-file';
import { err, ok, Result } from 'neverthrow';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);
  constructor(private readonly filesService: FilesService) {}
  @Patch()
  async updateFile(
    @Body() fileDto: RepoFileDto,
  ): Promise<Result<RepoFile, string>> {
    const result = await this.filesService.updateFile(fileDto);
    if (result.isErr()) {
      return err('File not updated');
    }
    return ok(result.value);
  }
}
