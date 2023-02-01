import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockStoreDAO } from '../../domain/mocks/store.dao.mock';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { MockStoresRepository } from '../../infra/repositories/mocks/stores-repository.mock';
import { IDeleteStoreUseCase } from './interfaces/delete-store.usecase.interface';
import { DeleteStoreUseCase } from './delete-store.usecase';

describe('Delete Store UseCase Unit Test', () => {
  let storesRepository: IStoresRepository;
  let sut: IDeleteStoreUseCase;
  beforeEach(() => {
    storesRepository = new MockStoresRepository();
    sut = new DeleteStoreUseCase(storesRepository);
  });

  it('should be able to delete store', async () => {
    await storesRepository.create(mockStoreDAO);
    const response = await sut.execute({ userId: mockStoreDAO.userId });
    expect(response).toBeUndefined();
  });

  it('should not be able to delete a nonexistent store', async () => {
    expect(sut.execute({ userId: 'nonexistent-user-id' })).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
