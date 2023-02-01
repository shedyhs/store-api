import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { DeleteUserUseCase } from './delete-user.usecase';
import { IDeleteUserUseCase } from './interfaces/delete-user.usecase.interface';

describe('Delete User UseCase Unit Test', () => {
  let usersRepository: IUsersRepository;
  let sut: IDeleteUserUseCase;

  beforeEach(() => {
    usersRepository = new MockUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should delete existent user', async () => {
    await usersRepository.create(mockUserDAO);
    const response = await sut.execute({ id: mockUserDAO.id });
    expect(response).toBeUndefined();
  });

  it('should not be able to delete a nonexistent user', async () => {
    expect(() => sut.execute({ id: 'nonexistent-user' })).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
