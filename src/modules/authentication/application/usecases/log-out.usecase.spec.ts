import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockAuthenticationDAO } from '../../domain/mocks/authentication.dao.mock';
import { IAuthTokensRepository } from '../../infra/repositories/interfaces/auth-tokens-repository.interface';
import { MockAuthTokensRepository } from '../../infra/repositories/mocks/auth-tokens.repository.mock';
import { ILogOutUseCase } from './interfaces/log-out-usecase.interface';
import { LogOutUseCase } from './log-out.usecase';

describe('LogOutUseCase', () => {
  let sut: ILogOutUseCase;
  let usersRepository: IUsersRepository;
  let authTokensRepository: IAuthTokensRepository;
  let user: User;

  beforeEach(async () => {
    authTokensRepository = new MockAuthTokensRepository();
    usersRepository = new MockUsersRepository();
    sut = new LogOutUseCase(authTokensRepository);

    await authTokensRepository.createOrUpdate({
      userId: mockAuthenticationDAO.user.id,
      accessToken: mockAuthenticationDAO.accessToken,
      refreshToken: mockAuthenticationDAO.refreshToken,
    });

    user = User.fromDomain(mockUserDomain);
    await usersRepository.create(user.toDAO());
  });

  it('Should be able to log out', async () => {
    const session = await sut.execute({
      userId: mockAuthenticationDAO.user.id,
      refreshToken: mockAuthenticationDAO.refreshToken,
    });
    expect(session).toBeUndefined();
  });

  it('Should not be able to log out with invalid refresh token', async () => {
    await expect(
      sut.execute({
        userId: mockAuthenticationDAO.user.id,
        refreshToken: 'invalid-refresh-token',
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to log in with invalid userId', async () => {
    await expect(
      sut.execute({
        userId: 'invalid-user-id',
        refreshToken: mockAuthenticationDAO.refreshToken,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });
});
