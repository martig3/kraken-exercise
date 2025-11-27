import { IsNotEmpty, IsUrl } from 'class-validator';
export class CreateRepoDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
