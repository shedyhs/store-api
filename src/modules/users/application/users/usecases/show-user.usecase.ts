import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { IShowUserDTO } from './dtos/show-user.dto';
import { IShowUserUseCase } from './interfaces/show-user.usecase.interface';

export class ShowUserUseCase implements IShowUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: IShowUserDTO): Promise<IOutputUserDTO> {
    const foundUser = await this.usersRepository.findById(input.id);
    if (!foundUser) {
      throw new ApplicationErrors.NotFoundError('user not found');
    }
    const user = User.fromDAO(foundUser);
    return user.toOutput();
  }
}
