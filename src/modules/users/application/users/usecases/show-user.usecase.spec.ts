import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { IShowUserUseCase } from './interfaces/show-user.usecase.interface';
import { ShowUserUseCase } from './show-user.usecase';

describe('Show User UseCase Unit Test', () => {
  let usersRepository: IUsersRepository;
  let sut: IShowUserUseCase;

  beforeEach(async () => {
    usersRepository = new MockUsersRepository();
    sut = new ShowUserUseCase(usersRepository);
  });

  it('Should be able to show user', async () => {
    await usersRepository.create(mockUserDAO);
    const foundUser = await sut.execute({ id: mockUserDAO.id });
    expect(foundUser).toHaveProperty('id', mockUserDAO.id);
  });

  it('should not be able to show a nonexistent user', async () => {
    expect(() => sut.execute({ id: 'nonexistent-user' })).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
