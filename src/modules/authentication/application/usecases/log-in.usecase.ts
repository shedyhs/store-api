import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IIdGeneratorProvider } from '@/shared/infra/providers/id-generator/id-generator.provider.interface';
import { IJwtProvider } from '@/shared/infra/providers/jwt/jwt.provider.interface';
import { IAuthTokensRepository } from '../../infra/repositories/interfaces/auth-tokens-repository.interface';
import { IOutputAuthenticationDTO } from './dtos/authentication-output.dto';
import { ILogInDTO } from './dtos/log-in.dto';
import { ILogInUseCase } from './interfaces/log-in.usecase.interface';

export class LogInUseCase implements ILogInUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly jwtProvider: IJwtProvider,
    private readonly authTokensRepository: IAuthTokensRepository,
    private readonly idGeneratorProvider: IIdGeneratorProvider,
  ) {}
  async execute(input: ILogInDTO): Promise<IOutputAuthenticationDTO> {
    const foundUser = await this.usersRepository.findByEmail(input.email);
    if (!foundUser) {
      throw new ApplicationErrors.UnauthorizedError(
        'Email or Password is invalid.',
      );
    }
    const user = User.fromDAO(foundUser);
    const passwordIsValid = user.password.compare(input.password);
    if (!passwordIsValid) {
      throw new ApplicationErrors.UnauthorizedError(
        'Email or Password is invalid.',
      );
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
      userId: user.id,
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
