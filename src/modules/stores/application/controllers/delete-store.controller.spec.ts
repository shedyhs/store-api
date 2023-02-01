import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IDeleteStoreUseCase } from '../usecases/interfaces/delete-store.usecase.interface';
import { StubDeleteStoreUseCase } from '../usecases/stubs/delete-store.usecase.stub';
import { DeleteStoreController } from './delete-store.controller';

describe('Delete Store Controller Unit Test', () => {
  let sut: DeleteStoreController;
  let useCase: IDeleteStoreUseCase;

  beforeEach(() => {
    useCase = new StubDeleteStoreUseCase();
    sut = new DeleteStoreController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: { id: 'some-store-uuid' },
    });
    expect(response.statusCode).toBe(204);
    expect(response.data).toBeUndefined();
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: { id: 'some-store-uuid' },
    });
    expect(spyUseCase).toHaveBeenCalled();
  });

  it('should not be able to call without required data', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    const response = await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
    });
    expect(spyUseCase).not.toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(response.data).toHaveProperty('errors');
    expect(response.data.errors).toHaveLength(1);
  });
});
