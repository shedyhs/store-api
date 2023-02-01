import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user.usecase';
import { ICreateUserUseCase } from './interfaces/create-user.usecase.interface';

describe('Create User UseCase Unit Test', () => {
  let sut: ICreateUserUseCase;
  let usersRepository: IUsersRepository;

  beforeEach(() => {
    usersRepository = new MockUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should create user correctly', async () => {
    const response = await sut.execute({
      email: 'shedyhs@gmail.com',
      username: 'shedyhs',
      password: 'Pa$$w0rd',
    });

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('username');
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('updatedAt');
    expect(response).not.toHaveProperty('password');
  });

  it('should not be able to create a user with already existent email', async () => {
    await usersRepository.create(mockUserDAO);

    expect(
      sut.execute({
        email: mockUserDAO.email,
        password: 'Pa$$w0rd',
        username: 'shedyhs',
      }),
    ).rejects.toThrow(ApplicationErrors.ConflictError);
  });
});
