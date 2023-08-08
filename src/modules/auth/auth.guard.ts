import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { UsersService } from '@modules/users/users.service';
import { IValidateUser } from '@modules/users/interfaces/validateUser.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const accessToken = authorization && authorization.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { status, id }: IValidateUser =
      await this.userService.validateUserByToken(accessToken);

    req['user'] = id;

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
