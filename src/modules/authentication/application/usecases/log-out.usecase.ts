import { ApplicationErrors } from '@/shared/errors/application-error';
import { IAuthTokensRepository } from '../../infra/repositories/interfaces/auth-tokens-repository.interface';
import { ILogOutDTO } from './dtos/log-out.dto';
import { ILogOutUseCase } from './interfaces/log-out-usecase.interface';

export class LogOutUseCase implements ILogOutUseCase {
  constructor(private readonly authTokensRepository: IAuthTokensRepository) {}
  async execute(input: ILogOutDTO): Promise<void> {
    const authToken = await this.authTokensRepository.findByRefreshToken(
      input.refreshToken,
    );
    if (!authToken) {
      throw new ApplicationErrors.UnauthorizedError('Invalid refresh token');
    }
    if (authToken.userId !== input.userId) {
      throw new ApplicationErrors.UnauthorizedError(
        'Invalid user of refresh token',
      );
    }
    await this.authTokensRepository.delete(input.userId);
  }
}
