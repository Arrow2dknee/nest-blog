import { HttpStatus } from '@nestjs/common';

export interface IValidateUser {
  id: string;
  status: HttpStatus;
}
