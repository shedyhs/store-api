import { AuthTokenDAO } from '../../../domain/authentication/dao/auth-token.dao';

export interface IAuthTokensRepository {
  createOrUpdate(authToken: AuthTokenDAO): Promise<void>;
  findByUserId(userId: string): Promise<AuthTokenDAO | undefined>;
  findByRefreshToken(refreshToken: string): Promise<AuthTokenDAO | undefined>;
  delete(userId: string): Promise<void>;
}
