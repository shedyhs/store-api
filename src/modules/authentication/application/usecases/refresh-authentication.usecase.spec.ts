import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { JwtProvider } from '@/shared/infra/providers/jwt/jwt.provider';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockAuthenticationDAO } from '../../domain/mocks/authentication.dao.mock';
import { IAuthTokensRepository } from '../../infra/repositories/interfaces/auth-tokens-repository.interface';
import { MockAuthTokensRepository } from '../../infra/repositories/mocks/auth-tokens.repository.mock';
import { IRefreshAuthenticationUseCase } from './interfaces/refresh-authentication.usecase.interface';
import { RefreshAuthenticationUseCase } from './refresh-authentication.usecase';

describe('Refresh Authentication UseCase Unit Test', () => {
  let sut: IRefreshAuthenticationUseCase;
  let idGeneratorProvider: IIdGeneratorProvider;
  let usersRepository: IUsersRepository;
  let authTokensRepository: IAuthTokensRepository;
  let jwtProvider: IJwtProvider;
  let user: User;
  let accessToken: string;
  let refreshToken: string;
  beforeEach(async () => {
    idGeneratorProvider = new IdGeneratorProvider();
    jwtProvider = new JwtProvider();
    authTokensRepository = new MockAuthTokensRepository();
    usersRepository = new MockUsersRepository();
    sut = new RefreshAuthenticationUseCase(
      jwtProvider,
      idGeneratorProvider,
      authTokensRepository,
      usersRepository,
    );
    await authTokensRepository.createOrUpdate({
      userId: mockAuthenticationDAO.user.id,
      accessToken: mockAuthenticationDAO.accessToken,
      refreshToken: mockAuthenticationDAO.refreshToken,
    });
    user = User.fromDAO(mockUserDAO);
    await usersRepository.create(user.toDAO());
    accessToken = await jwtProvider.generate({
      payload: { email: user.email },
      options: { subject: user.id },
    });
    refreshToken = idGeneratorProvider.uuid();
    await authTokensRepository.createOrUpdate({
      accessToken,
      refreshToken,
      userId: user.id,
    });
  });

  it('Should be able to refresh authentication', async () => {
    const session = await sut.execute({
      accessToken,
      refreshToken: mockAuthenticationDAO.refreshToken,
    });
    expect(session).toHaveProperty('accessToken');
    expect(session).toHaveProperty('refreshToken');
    expect(session).toHaveProperty('user');
  });

  it('Should not be able to refresh token with invalid accessToken', async () => {
    const invalidAccessToken = await jwtProvider.generate({
      payload: { email: user.email },
      options: { subject: 'invalid-user-id' },
    });
    await expect(
      sut.execute({
        accessToken: invalidAccessToken,
        refreshToken: mockAuthenticationDAO.refreshToken,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to refresh token with empty subject', async () => {
    const invalidAccessToken = await jwtProvider.generate({
      payload: { email: user.email },
      options: {},
    });
    await expect(
      sut.execute({
        accessToken: invalidAccessToken,
        refreshToken: mockAuthenticationDAO.refreshToken,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to log in with invalid refreshToken', async () => {
    await expect(
      sut.execute({
        accessToken,
        refreshToken: 'invalid-refresh-token',
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });
});
