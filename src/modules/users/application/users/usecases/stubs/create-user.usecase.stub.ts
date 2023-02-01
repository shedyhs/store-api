import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import {
  DomainUserProperties,
  User,
} from '@/modules/users/domain/users/entities/user';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { ICreateUserUseCase } from '../interfaces/create-user.usecase.interface';

export class StubCreateUserUseCase implements ICreateUserUseCase {
  async execute(_input: DomainUserProperties): Promise<IOutputUserDTO> {
    const user = User.fromDomain(mockUserDomain);
    return user.toOutput();
  }
}
