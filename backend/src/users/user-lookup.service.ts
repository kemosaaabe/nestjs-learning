import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository.js';

@Injectable()
export class UserLookupService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser(id: number) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.findById(id);
  }
}
