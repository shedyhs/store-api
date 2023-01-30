import { MockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ICreateUserUseCase } from '../usecases/interfaces/create-user.usecase.interface';
import { StubCreateUserUseCase } from '../usecases/stubs/create-user.usecase.stub';
import { CreateUserController } from './create-user.controller';

describe('Create User Controller Unit Test', () => {
  let sut: CreateUserController;
  let useCase: ICreateUserUseCase;

  beforeEach(() => {
    useCase = new StubCreateUserUseCase();
    sut = new CreateUserController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: MockUserDomain,
      file: undefined,
      headers: undefined,
      method: 'POST',
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
      body: MockUserDomain,
      file: undefined,
      headers: undefined,
      method: 'POST',
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
      method: 'POST',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com',
      user: undefined,
    });

    expect(spyUseCase).not.toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(response.data).toHaveProperty('errors');
    expect(response.data.errors).toHaveLength(3);
  });
});
