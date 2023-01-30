import { beforeEach, describe, it, expect, vi } from 'vitest';
import { IDeleteUserUseCase } from '../usecases/interfaces/delete-user.usecase.interface';
import { StubDeleteUserUseCase } from '../usecases/stubs/delete-user.usecase.stub';
import { DeleteUserController } from './delete-user.controller';

describe('Delete User Controller Unit Test', () => {
  let sut: DeleteUserController;
  let useCase: IDeleteUserUseCase;

  beforeEach(() => {
    useCase = new StubDeleteUserUseCase();
    sut = new DeleteUserController(useCase);
  });

  it('should return response', async () => {
    const response = await sut.handle({
      body: undefined,
      file: undefined,
      headers: undefined,
      method: 'DELETE',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com/users',
      user: { id: 'some-user-uuid' },
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
      method: 'DELETE',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com/users',
      user: {
        id: 'some-user-uuid',
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
      method: 'DELETE',
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
