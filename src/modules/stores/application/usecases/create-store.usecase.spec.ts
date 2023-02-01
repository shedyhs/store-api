import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockStoreDAO } from '../../domain/mocks/store.dao.mock';
import { mockStoreDomain } from '../../domain/mocks/store.domain.mock';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { MockStoresRepository } from '../../infra/repositories/mocks/stores-repository.mock';
import { CreateStoreUseCase } from './create-store.usecase';
import { ICreateStoreUseCase } from './interfaces/create-store.usecase.interface';

describe('Create Store UseCase Unit Test', () => {
  let usersRepository: IUsersRepository;
  let storesRepository: IStoresRepository;
  let sut: ICreateStoreUseCase;
  beforeEach(async () => {
    usersRepository = new MockUsersRepository();
    storesRepository = new MockStoresRepository();
    sut = new CreateStoreUseCase(usersRepository, storesRepository);
  });

  it('should be able to create a store', async () => {
    await usersRepository.create(mockUserDAO);
    const response = await sut.execute(mockStoreDomain);
    expect(response).toHaveProperty('id');
    expect(response.name).toBe(mockStoreDomain.name);
    expect(response.userId).toBe(mockStoreDomain.userId);
    expect(response.createdAt).toBeInstanceOf(Date);
    expect(response.updatedAt).toBeInstanceOf(Date);
  });

  it('should not be to user create store twice', async () => {
    await usersRepository.create(mockUserDAO);
    await storesRepository.create(mockStoreDAO);
    expect(sut.execute(mockStoreDomain)).rejects.toThrow(
      ApplicationErrors.ConflictError,
    );
  });

  it('should not be able to create a store with nonexistent user', async () => {
    expect(sut.execute(mockStoreDomain)).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
