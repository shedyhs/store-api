import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';
import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';
import { IRefreshAuthenticationDTO } from '../dtos/refresh-authentication.dto';
import { IRefreshAuthenticationUseCase } from '../interfaces/refresh-authentication.usecase.interface';

export class StubRefreshAuthenticationUseCase
  implements IRefreshAuthenticationUseCase
{
  async execute(
    _input: IRefreshAuthenticationDTO,
  ): Promise<IOutputAuthenticationDTO> {
    const user = User.fromDomain(mockUserDomain);
    return {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: user.toOutput(),
    };
  }
}
