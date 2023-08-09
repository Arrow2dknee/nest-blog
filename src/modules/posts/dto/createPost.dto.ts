import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { ERROR } from '@messages/errorMessages';

export class CreatePostDto {
  @Matches(new RegExp(/^[A-Za-z]*$/), {
    message: ERROR.POST.TITLE_CRITERIA,
  })
  @MaxLength(100)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @MaxLength(255)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
