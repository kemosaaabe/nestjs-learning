import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service.js';
import type { CreateUserDto } from './interfaces/user.interface.js';
import { TasksService } from '../tasks/tasks.service.js';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUser(Number(userId));
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get(':id/tasks')
  getUserTasks(@Param('id') userId: string) {
    return this.tasksService.getUserTasks(Number(userId));
  }
}
