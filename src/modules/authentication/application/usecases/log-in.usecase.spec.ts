import { MockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';
import { MockUsersRepository } from '@/modules/users/infra/repositories/mock/users-repository.mock';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { JwtProvider } from '@/shared/infra/providers/jwt/jwt.provider';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { beforeEach, describe, expect, it } from 'vitest';
import { MockAuthTokensRepository } from '../../infra/repositories/mocks/auth-tokens.repository.mock';
import { ILogInUseCase } from './interfaces/log-in.usecase.interface';
import { LogInUseCase } from './log-in.usecase';

describe('Log In UseCase Unit Test', () => {
  let sut: ILogInUseCase;
  let usersRepository: MockUsersRepository;
  let authTokensRepository: MockAuthTokensRepository;
  let jwtProvider: IJwtProvider;
  let idGeneratorProvider: IIdGeneratorProvider;
  let user: User;

  beforeEach(async () => {
    idGeneratorProvider = new IdGeneratorProvider();
    jwtProvider = new JwtProvider();
    authTokensRepository = new MockAuthTokensRepository();
    usersRepository = new MockUsersRepository();
    sut = new LogInUseCase(
      usersRepository,
      jwtProvider,
      authTokensRepository,
      idGeneratorProvider,
    );

    user = User.fromDomain(MockUserDomain);
    await usersRepository.create(user.toDAO());
  });

  it('Should be able to log in', async () => {
    const session = await sut.execute({
      email: user.email,
      password: MockUserDomain.password,
    });
    expect(session).toHaveProperty('accessToken');
    expect(session).toHaveProperty('refreshToken');
    expect(session).toHaveProperty('user');
    expect(session.user).not.toHaveProperty('password');
  });

  it('Should not be able to log in with invalid password', async () => {
    await expect(
      sut.execute({
        email: user.email,
        password: 'invalid-password',
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });

  it('Should not be able to log in with invalid email', async () => {
    await expect(
      sut.execute({
        email: 'invalid@email.com',
        password: MockUserDomain.password,
      }),
    ).rejects.toThrow(ApplicationErrors.UnauthorizedError);
  });
});
