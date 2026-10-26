import { vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserLookupService } from './user-lookup.service.js';
import { UserRepository } from './user.repository.js';

describe('UserLookupService', () => {
  let userLookupService: UserLookupService;
  let userRepositoryMock: {
    findById: ReturnType<typeof vi.fn<UserRepository['findById']>>;
  };

  beforeEach(async () => {
    userRepositoryMock = {
      findById: vi.fn<UserRepository['findById']>(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UserLookupService,
        { provide: UserRepository, useValue: userRepositoryMock },
      ],
    }).compile();

    userLookupService = moduleRef.get(UserLookupService);
  });

  describe('findUser', () => {
    it('should return a user if found', async () => {
      userRepositoryMock.findById.mockResolvedValue({
        id: 1,
        name: 'Sanek',
        email: 'sanek@gmail.com',
      });

      const user = await userLookupService.findUser(1);

      expect(user).toEqual({ id: 1, name: 'Sanek', email: 'sanek@gmail.com' });
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      userRepositoryMock.findById.mockResolvedValue(null);

      await expect(userLookupService.findUser(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(999);
    });
  });
});
