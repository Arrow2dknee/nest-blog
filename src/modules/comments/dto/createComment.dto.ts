import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
