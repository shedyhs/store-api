import { AuthTokenDAO } from '@/modules/authentication/domain/authentication/dao/auth-token.dao';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IAuthTokensRepository } from '../interfaces/auth-tokens-repository.interface';

export class MockAuthTokensRepository implements IAuthTokensRepository {
  authTokens: AuthTokenDAO[] = [];

  async createOrUpdate(authToken: AuthTokenDAO): Promise<void> {
    const foundAuthToken = this.authTokens.find(
      (internalAuthToken) => internalAuthToken.userId === authToken.userId,
    );
    if (foundAuthToken) {
      const index = this.authTokens.indexOf(foundAuthToken);
      this.authTokens.splice(index, 1);
    }
    this.authTokens.push(authToken);
  }

  async findByUserId(userId: string): Promise<AuthTokenDAO | undefined> {
    const foundAuthToken = this.authTokens.find(
      (authToken) => authToken.userId === userId,
    );
    if (!foundAuthToken) {
      return undefined;
    }
    return foundAuthToken;
  }

  async findByRefreshToken(
    refreshToken: string,
  ): Promise<AuthTokenDAO | undefined> {
    const foundAuthToken = this.authTokens.find(
      (authToken) => authToken.refreshToken === refreshToken,
    );
    if (!foundAuthToken) {
      return undefined;
    }
    return foundAuthToken;
  }

  async delete(userId: string): Promise<void> {
    const foundUser = this.authTokens.find(
      (authToken) => authToken.userId === userId,
    );
    if (!foundUser) {
      throw new ApplicationErrors.NotFoundError('Auth token not found');
    }
    const index = this.authTokens.indexOf(foundUser);
    this.authTokens.splice(index, 1);
  }
}
