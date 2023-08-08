import {
  Injectable,
  BadRequestException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';

import { JWTService } from '@modules/auth/jwt.service';
import { ERROR } from '@messages/errorMessages';

import { UsersRepository } from './users.repository';
import { RegisterUserDto, LoginUserDto } from './dto';
import { ILoggedInUser } from './interfaces/loggedInUser.interface';
import { IValidateUser } from './interfaces/validateUser.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JWTService,
  ) {}

  public async newUserRegistration(dto: RegisterUserDto): Promise<any> {
    const { username, email, password } = dto;

    const userWithSimilarName = await this.usersRepository.getUserByName(
      username,
    );
    if (userWithSimilarName) {
      throw new BadRequestException({
        message: ERROR.USER.USERNAME_EXISTS,
      });
    }
    const userWithSimilarEmail = await this.usersRepository.getUserByEmail(
      email,
    );
    if (userWithSimilarEmail) {
      throw new BadRequestException({
        message: ERROR.USER.EMAIL_EXISTS,
      });
    }

    const payload: RegisterUserDto = {
      username: username.toLowerCase(),
      email,
      password: this.jwtService.encodePassword(password),
    };
    const newUser = await this.usersRepository.createUser(payload);

    return {
      username: newUser.username,
      email: newUser.email,
    };
  }

  public async loginUser(dto: LoginUserDto): Promise<ILoggedInUser> {
    const { email, password } = dto;

    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException({
        message: ERROR.USER.USER_NOT_FOUND,
      });
    }

    const doesPwdMatch = this.jwtService.comparePassword(
      password,
      user.password,
    );

    if (!doesPwdMatch) {
      throw new BadRequestException({
        message: ERROR.USER.INCORRECT_PASSWORD,
      });
    }

    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      token: this.jwtService.generateToken(user),
    };
  }

  public async validateUserByToken(token: string): Promise<IValidateUser> {
    const decodedUser = await this.jwtService.verify(token);

    if (!decodedUser) {
      throw new BadRequestException({
        message: ERROR.AUTH.INVALID_TOKEN,
      });
    }
    const user = await this.usersRepository.getUserByEmail(decodedUser.email);

    if (!user) {
      throw new NotFoundException({
        message: ERROR.USER.USER_NOT_FOUND,
      });
    }

    return {
      id: user.id.toString(),
      status: HttpStatus.OK,
    };
  }
}
