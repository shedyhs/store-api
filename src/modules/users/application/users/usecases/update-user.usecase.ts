import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { IUpdateUserDTO } from './dtos/update-user.dto';
import { IUpdateUserUseCase } from './interfaces/update-user.usecase.interface';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(input: IUpdateUserDTO): Promise<IOutputUserDTO> {
    const foundUser = await this.usersRepository.findById(input.id);
    if (!foundUser) {
      throw new ApplicationErrors.NotFoundError('user not found');
    }
    const user = User.fromDAO(foundUser);
    user.update(input);
    await this.usersRepository.update(user.toDAO());
    return user.toOutput();
  }
}
