import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ILogInUseCase } from '../usecases/interfaces/log-in.usecase.interface';
import { StubLogInUseCase } from '../usecases/stubs/log-in.usecase.stub';
import { LogInController } from './log-in.controller';

describe('LogIn Controller Unit Test', () => {
  let sut: LogInController;
  let useCase: ILogInUseCase;

  beforeEach(() => {
    useCase = new StubLogInUseCase();
    sut = new LogInController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: { email: 'some@email.com', password: 'password' },
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
    });

    expect(response.statusCode).toBe(201);
    expect(response.data).toHaveProperty('_embedded');
    expect(response.data).toHaveProperty('_links');
    expect(response.data._links).toHaveLength(1);
    expect(response.data).toHaveProperty('_received');
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: { email: 'some@email.com', password: 'password' },
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
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
