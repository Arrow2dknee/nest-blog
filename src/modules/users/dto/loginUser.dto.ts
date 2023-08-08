import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { ERROR } from '@messages/errorMessages';

export class LoginUserDto {
  @Matches(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/), {
    message: ERROR.USER.EMAIL_FORMAT,
  })
  @MaxLength(255)
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @Matches(
    new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#)<>,'.{[$@(\]}\/;:\\|"!%&^*?_+-~èéêëēėęÿûüùúūîïíīįìôöòóœøōõàáâãåāßśšłžźżçćčñń°–—•€£¥₩₽§""„»«…¿¡''`‰]{10,15}$/i,
    ),
    {
      message: ERROR.USER.PASSWORD_CRITERIA,
    },
  )
  @MaxLength(60)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
