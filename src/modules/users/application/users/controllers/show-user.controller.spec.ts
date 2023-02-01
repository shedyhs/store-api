import { describe, beforeEach, it, expect, vi } from 'vitest';
import { IShowUserUseCase } from '../usecases/interfaces/show-user.usecase.interface';
import { StubShowUserUseCase } from '../usecases/stubs/show-user.usecase.stub';
import { ShowUserController } from './show-user.controller';

describe('Show User Controller Unit Test', () => {
  let sut: ShowUserController;
  let useCase: IShowUserUseCase;

  beforeEach(() => {
    useCase = new StubShowUserUseCase();
    sut = new ShowUserController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: undefined,
      params: { id: 'some-user-uuid' },
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
      params: { id: 'some-user-uuid' },
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
