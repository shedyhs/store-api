import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';
import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';
import { ILogInDTO } from '../dtos/log-in.dto';
import { ILogInUseCase } from '../interfaces/log-in.usecase.interface';

export class StubLogInUseCase implements ILogInUseCase {
  async execute(_input: ILogInDTO): Promise<IOutputAuthenticationDTO> {
    const user = User.fromDomain(mockUserDomain);
    return {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: user.toOutput(),
    };
  }
}
