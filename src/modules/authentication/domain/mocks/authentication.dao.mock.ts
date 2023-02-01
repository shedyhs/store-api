import { IOutputAuthenticationDTO } from '@/modules/authentication/application/usecases/dtos/authentication-output.dto';
import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';

const fakeUser = User.fromDomain(mockUserDomain);

export const mockAuthenticationDAO: IOutputAuthenticationDTO = {
  accessToken: 'fake-access-token',
  refreshToken: 'fake-refresh-token',
  user: fakeUser.toOutput(),
};
