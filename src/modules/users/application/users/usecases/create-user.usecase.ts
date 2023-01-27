import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ICreateUserDTO } from './dtos/create-user.dto';
import { IOutputUserDTO } from './dtos/output-user.dto';
import { ICreateUserUseCase } from './interfaces/create-user.usecase.interface';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}
  async execute(input: ICreateUserDTO): Promise<IOutputUserDTO> {
    const user = new User(
      { email: input.email, password: input.password },
      input.id,
    );
    await this.usersRepository.create(user);
    return user.toOutput();
  }
}
