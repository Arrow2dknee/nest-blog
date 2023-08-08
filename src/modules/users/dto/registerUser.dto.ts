import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

import { ERROR } from '@messages/errorMessages';

export class RegisterUserDto {
  @Matches(new RegExp(/^[A-Za-z0-9]*$/), {
    message: ERROR.USER.USERNAME_CRITERIA,
  })
  @MaxLength(25)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  readonly username: string;

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
