import { MockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { IUpdateUserUseCase } from '../usecases/interfaces/update-user.usecase.interface';
import { StubUpdateUserUseCase } from '../usecases/stubs/update-user.usecase.stub';
import { UpdateUserController } from './update-user.controller';

describe('Update User Controller Unit Test', () => {
  let useCase: IUpdateUserUseCase;
  let sut: UpdateUserController;

  beforeEach(() => {
    useCase = new StubUpdateUserUseCase();
    sut = new UpdateUserController(useCase);
  });

  it('should return treat response', async () => {
    const response = await sut.handle({
      body: MockUserDomain,
      file: undefined,
      headers: undefined,
      method: 'PUT',
      params: undefined,
      query: undefined,
      url: 'http://localhost.com/users',
      user: {
        id: 'some-user-uuid',
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
      body: MockUserDomain,
      file: undefined,
      headers: undefined,
      method: 'PUT',
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
