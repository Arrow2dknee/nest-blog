import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username: username.toLowerCase() },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(dto: RegisterUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, {
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    const newUser = await this.userRepository.save(user);
    delete user.password;

    return newUser;
  }
}
