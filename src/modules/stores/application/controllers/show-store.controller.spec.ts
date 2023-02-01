import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IShowStoreUseCase } from '../usecases/interfaces/show-store.usecase.interface';
import { StubShowStoreUseCase } from '../usecases/stubs/show-store.usecase.stub';
import { ShowStoreController } from './show-store.controller';

describe('Show Store Controller Unit Test', () => {
  let sut: ShowStoreController;
  let useCase: IShowStoreUseCase;

  beforeEach(() => {
    useCase = new StubShowStoreUseCase();
    sut = new ShowStoreController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: undefined,
      params: { id: 'some-store-uuid' },
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
    });
    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('_embedded');
    expect(response.data).toHaveProperty('_links');
    expect(response.data).toHaveProperty('_received');
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: undefined,
      params: { id: 'some-store-uuid' },
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
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
