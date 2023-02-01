import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { IUpdateUserUseCase } from './interfaces/update-user.usecase.interface';
import { UpdateUserUseCase } from './update-user.usecase';

describe('Update User UseCase Unit Test', () => {
  let usersRepository: IUsersRepository;
  let sut: IUpdateUserUseCase;

  beforeEach(() => {
    usersRepository = new MockUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update a user', async () => {
    await usersRepository.create(mockUserDAO);
    const response = await sut.execute({
      id: mockUserDAO.id,
      username: 'another-username',
      email: 'another@email.com',
      password: 'NewPa$$w0rd',
    });

    expect(response).toHaveProperty('id', mockUserDAO.id);
    expect(response.email).toBe('another@email.com');
    expect(response.username).toBe('another-username');
    expect(response.createdAt.getTime()).toBe(mockUserDAO.created_at.getTime());
    expect(response.updatedAt.getTime()).toBeGreaterThan(
      mockUserDAO.updated_at.getTime(),
    );
  });

  it('should not be able to update a nonexistent user', async () => {
    expect(() => sut.execute(mockUserDAO)).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
