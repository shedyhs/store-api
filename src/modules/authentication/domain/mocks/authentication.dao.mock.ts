import { IOutputAuthenticationDTO } from '@/modules/authentication/application/usecases/dtos/authentication-output.dto';
import { MockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';

const fakeUser = User.fromDomain(MockUserDomain);

export const MockAuthenticationDAO: IOutputAuthenticationDTO = {
  accessToken: 'fake-access-token',
  refreshToken: 'fake-refresh-token',
  user: fakeUser.toOutput(),
};