import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IRefreshAuthenticationUseCase } from '../usecases/interfaces/refresh-authentication.usecase.interface';
import { StubRefreshAuthenticationUseCase } from '../usecases/stubs/refresh-authentication.usecase.stub';
import { RefreshAuthenticationController } from './refresh-authentication.controller';

describe('Refresh Authentication Controller Unit Test', () => {
  let sut: RefreshAuthenticationController;
  let useCase: IRefreshAuthenticationUseCase;

  beforeEach(() => {
    useCase = new StubRefreshAuthenticationUseCase();
    sut = new RefreshAuthenticationController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: { refreshToken: 'refresh-token' },
      file: undefined,
      headers: {
        Authorization: 'access-token',
      },
      method: undefined,
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
    });

    expect(response.statusCode).toBe(200);
    expect(response.data).toHaveProperty('_embedded');
    expect(response.data).toHaveProperty('_links');
    expect(response.data._links).toHaveLength(1);
    expect(response.data).toHaveProperty('_received');
  });

  it('should call useCase', async () => {
    const spyUseCase = vi.spyOn(useCase, 'execute');
    await sut.handle({
      body: { refreshToken: 'refresh-token' },
      file: undefined,
      headers: {
        Authorization: 'access-token',
      },
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
