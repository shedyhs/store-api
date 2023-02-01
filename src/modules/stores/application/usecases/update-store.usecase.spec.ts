import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockStoreDAO } from '../../domain/mocks/store.dao.mock';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { MockStoresRepository } from '../../infra/repositories/mocks/stores-repository.mock';
import { IUpdateStoreUseCase } from './interfaces/update-store.usecase.interface';
import { UpdateStoreUseCase } from './update-store.usecase';

describe('Update Store UseCase Unit Test', () => {
  let storesRepository: IStoresRepository;
  let sut: IUpdateStoreUseCase;
  beforeEach(async () => {
    storesRepository = new MockStoresRepository();
    sut = new UpdateStoreUseCase(storesRepository);
  });

  it('should be able to update a store', async () => {
    await storesRepository.create(mockStoreDAO);
    const response = await sut.execute({
      userId: mockStoreDAO.userId,
      name: 'another-name',
    });
    expect(response.name).toBe('another-name');
    expect(response.updatedAt.getTime()).toBeGreaterThan(
      mockStoreDAO.updated_at.getTime(),
    );
  });

  it('should not be able to update nonexistent user', async () => {
    expect(
      sut.execute({ userId: 'nonexistent-user-id', name: 'another-name' }),
    ).rejects.toThrow(ApplicationErrors.NotFoundError);
  });
});
