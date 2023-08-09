import { IsNotEmpty, IsNumberString } from 'class-validator';

import { ERROR } from '@messages/errorMessages';

export class PostIdDto {
  @IsNumberString({}, { message: ERROR.POST.ID_NUMBER_FORMAT })
  @IsNotEmpty({ message: ERROR.POST.ID_REQUIRED })
  readonly id: string;
}
