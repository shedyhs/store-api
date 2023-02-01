import { mockUserDomain } from '@/modules/users/domain/mocks/user.domain.mock';
import { User } from '@/modules/users/domain/users/entities/user';
import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IShowUserDTO } from '../dtos/show-user.dto';
import { IShowUserUseCase } from '../interfaces/show-user.usecase.interface';

export class StubShowUserUseCase implements IShowUserUseCase {
  async execute(_input: IShowUserDTO): Promise<IOutputUserDTO> {
    const user = User.fromDomain(mockUserDomain);
    return user.toOutput();
  }
}
