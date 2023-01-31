import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { IAuthTokensRepository } from '../../infra/repositories/interfaces/auth-tokens-repository.interface';
import { IOutputAuthenticationDTO } from './dtos/authentication-output.dto';
import { IRefreshAuthenticationDTO } from './dtos/refresh-authentication.dto';
import { IRefreshAuthenticationUseCase } from './interfaces/refresh-authentication.usecase.interface';

export class RefreshAuthenticationUseCase
  implements IRefreshAuthenticationUseCase
{
  constructor(
    private readonly jwtProvider: IJwtProvider,
    private readonly idGeneratorProvider: IIdGeneratorProvider,
    private readonly authTokensRepository: IAuthTokensRepository,
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(
    input: IRefreshAuthenticationDTO,
  ): Promise<IOutputAuthenticationDTO> {
    const { sub: userId } = await this.jwtProvider.decode(input.accessToken);
    if (!userId) {
      throw new ApplicationErrors.UnauthorizedError('Invalid access token');
    }

    const foundUser = await this.usersRepository.findById(userId);
    if (!foundUser) {
      throw new ApplicationErrors.UnauthorizedError(
        'Invalid user of access token',
      );
    }
    const user = User.fromDAO(foundUser);
    const authToken = await this.authTokensRepository.findByRefreshToken(
      input.refreshToken,
    );
    if (!authToken) {
      throw new ApplicationErrors.UnauthorizedError('Invalid refresh token');
    }

    const accessToken = await this.jwtProvider.generate({
      payload: {
        email: user.email,
      },
      options: {
        subject: user.id,
      },
    });
    const refreshToken = this.idGeneratorProvider.uuid();
    await this.authTokensRepository.createOrUpdate({
      userId,
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
      user: user.toOutput(),
    };
  }
}
