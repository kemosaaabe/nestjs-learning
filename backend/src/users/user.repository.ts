import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface.js';

@Injectable()
export class UserRepository {
  async findById(_id: number): Promise<User | null> {
    return null;
  }
}
