import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockStoreDomain } from '../../domain/mocks/store.domain.mock';
import { IUpdateStoreUseCase } from '../usecases/interfaces/update-store.usecase.interface';
import { StubUpdateStoreUseCase } from '../usecases/stubs/update-store.usecase.stub';
import { UpdateStoreController } from './update-store.controller';

describe('Update Store Controller Unit Test', () => {
  let useCase: IUpdateStoreUseCase;
  let sut: UpdateStoreController;

  beforeEach(() => {
    useCase = new StubUpdateStoreUseCase();
    sut = new UpdateStoreController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: {
        name: mockStoreDomain.name,
      },
      file: undefined,
      headers: undefined,
      method: 'PUT',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com/users',
      user: {
        id: mockStoreDomain.userId,
      },
    });
    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('_embedded');
    expect(response.data).toHaveProperty('_links');
    expect(response.data).toHaveProperty('_received');
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: {
        name: mockStoreDomain.name,
      },
      file: undefined,
      headers: undefined,
      method: 'PUT',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com/users',
      user: {
        id: mockStoreDomain.userId,
      },
    });
    expect(spyUseCase).toHaveBeenCalled();
  });

  it('should not be able to call usecase without required data', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    const response = await sut.handle({
      body: {},
      file: undefined,
      headers: undefined,
      method: 'PUT',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com/users',
      user: undefined,
    });

    expect(spyUseCase).not.toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(response.data).toHaveProperty('errors');
    expect(response.data.errors).toHaveLength(1);
  });
});
