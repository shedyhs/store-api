import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockStoreDAO } from '../../domain/mocks/store.dao.mock';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { MockStoresRepository } from '../../infra/repositories/mocks/stores-repository.mock';
import { IShowStoreUseCase } from './interfaces/show-store.usecase.interface';
import { ShowStoreUseCase } from './show-store.usecase';

describe('Show Store UseCase Unit Test', () => {
  let storesRepository: IStoresRepository;
  let sut: IShowStoreUseCase;
  beforeEach(() => {
    storesRepository = new MockStoresRepository();
    sut = new ShowStoreUseCase(storesRepository);
  });

  it('should be able to show store', async () => {
    await storesRepository.create(mockStoreDAO);
    const response = await sut.execute({ id: mockStoreDAO.id });
    expect(response.id).toBe(mockStoreDAO.id);
    expect(response.name).toBe(mockStoreDAO.name);
    expect(response.userId).toBe(mockStoreDAO.userId);
    expect(response.createdAt).toBe(mockStoreDAO.created_at);
    expect(response.updatedAt).toBe(mockStoreDAO.updated_at);
  });

  it('should not be able to show a nonexistent store', async () => {
    expect(sut.execute({ id: 'nonexistent-store-id' })).rejects.toThrow(
      ApplicationErrors.NotFoundError,
    );
  });
});
