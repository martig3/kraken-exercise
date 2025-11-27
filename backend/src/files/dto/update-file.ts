import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsIn,
  IsUUID,
} from 'class-validator';
import type { UUID } from 'node:crypto';

export type FileStatus =
  | 'default'
  | 'processing'
  | 'queued'
  | 'processed'
  | 'error';

export class RepoFileDto {
  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNotEmpty()
  @IsInt()
  coverage: number;

  @IsOptional()
  @IsIn(['default', 'processing', 'queued', 'processed', 'error'])
  status?: FileStatus;

  @IsOptional()
  @IsString()
  prUrl?: string;

  @IsNotEmpty()
  @IsUUID()
  repoId: UUID;
}
