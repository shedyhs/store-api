import { MockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
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
    await usersRepository.create(MockUserDAO);
    const response = await sut.execute({
      id: MockUserDAO.id,
      username: 'another-username',
      email: 'another@email.com',
      password: 'NewPa$$w0rd',
    });

    expect(response).toHaveProperty('id', MockUserDAO.id);
    expect(response.email).toBe('another@email.com');
    expect(response.username).toBe('another-username');
    expect(response.createdAt.getTime()).toBe(MockUserDAO.created_at.getTime());
    expect(response.updatedAt.getTime()).toBeGreaterThan(
      MockUserDAO.updated_at.getTime(),
    );
  });

  it('should not be able to update a nonexistent user', async () => {
    expect(() => sut.execute(MockUserDAO)).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
