import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateUserDto, User } from './interfaces/user.interface.js';
import { LoggerService } from '../logger/logger.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly loggerService: LoggerService) {}

  private readonly users: User[] = [];
  private userNextId = 1;

  getUsers() {
    return this.users;
  }

  getUser(userId: number) {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      throw new NotFoundException('Task not found');
    }

    return user;
  }

  createUser(user: CreateUserDto) {
    const newUserId = this.userNextId++;

    const newUser = { id: newUserId, ...user };

    this.users.push(newUser);

    this.loggerService.log(`User created: ${newUserId} `);

    return newUser;
  }
}
