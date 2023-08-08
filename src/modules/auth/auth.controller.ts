import { Controller, Post, Body } from '@nestjs/common';

import { RegisterUserDto, LoginUserDto } from '@modules/users/dto';
import { UsersService } from '@modules/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerUser(@Body() dto: RegisterUserDto) {
    return this.usersService.newUserRegistration(dto);
  }

  @Post('/login')
  async loginUser(@Body() dto: LoginUserDto) {
    return this.usersService.loginUser(dto);
  }
}
