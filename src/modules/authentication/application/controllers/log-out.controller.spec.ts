import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ILogOutUseCase } from '../usecases/interfaces/log-out-usecase.interface';
import { StubLogOutUseCase } from '../usecases/stubs/log-out.usecase.stub';
import { LogOutController } from './log-out.controller';

describe('LogOut Controller Unit Test', () => {
  let sut: LogOutController;
  let useCase: ILogOutUseCase;

  beforeEach(() => {
    useCase = new StubLogOutUseCase();
    sut = new LogOutController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: { refreshToken: 'refresh-token' },
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: {
        id: 'some-user-id',
      },
    });

    expect(response.statusCode).toBe(204);
    expect(response.data).toBeUndefined();
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: { refreshToken: 'refresh-token' },
      file: undefined,
      headers: undefined,
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: {
        id: 'some-user-id',
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
