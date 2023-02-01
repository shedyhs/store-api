import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import {
  UpdateUserProperties,
  User,
} from '@/modules/users/domain/users/entities/user';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IUpdateUserUseCase } from '../interfaces/update-user.usecase.interface';

export class StubUpdateUserUseCase implements IUpdateUserUseCase {
  async execute(_input: UpdateUserProperties): Promise<IOutputUserDTO> {
    const user = User.fromDomain(mockUserDomain);
    return user.toOutput();
  }
}
