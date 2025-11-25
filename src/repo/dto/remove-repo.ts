import { IsNotEmpty, IsUrl } from 'class-validator';
export class RemoveRepoDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
