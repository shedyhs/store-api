import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { ICreateUserDTO } from './dtos/create-user.dto';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { ICreateUserUseCase } from './interfaces/create-user.usecase.interface';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(input: ICreateUserDTO): Promise<IOutputUserDTO> {
    const user = User.fromDomain(input);
    const alreadyExistsEmail = await this.usersRepository.findByEmail(
      user.email,
    );
    if (alreadyExistsEmail) {
      throw new ApplicationErrors.ConflictError('email already in use');
    }
    await this.usersRepository.create(user.toDAO());
    return user.toOutput();
  }
}
