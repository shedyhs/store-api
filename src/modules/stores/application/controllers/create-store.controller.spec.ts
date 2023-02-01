import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockStoreDomain } from '../../domain/mocks/store.domain.mock';
import { ICreateStoreUseCase } from '../usecases/interfaces/create-store.usecase.interface';
import { StubCreateStoreUseCase } from '../usecases/stubs/create-store.usecase.stub';
import { CreateStoreController } from './create-store.controller';

describe('Create Store Controller Unit Test', () => {
  let sut: CreateStoreController;
  let useCase: ICreateStoreUseCase;

  beforeEach(() => {
    useCase = new StubCreateStoreUseCase();
    sut = new CreateStoreController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: { name: mockStoreDomain.name },
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: {
        id: mockStoreDomain.userId,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.data).toHaveProperty('_embedded');
    expect(response.data).toHaveProperty('_links');
    expect(response.data._links).toHaveLength(3);
    expect(response.data).toHaveProperty('_received');
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: { name: mockStoreDomain.name },
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
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
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
    });

    expect(spyUseCase).not.toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(response.data).toHaveProperty('errors');
    expect(response.data.errors).toHaveLength(2);
  });
});
