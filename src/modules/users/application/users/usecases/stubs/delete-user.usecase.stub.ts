import { IDeleteUserDTO } from '../dtos/delete-user.dto';
import { IDeleteUserUseCase } from '../interfaces/delete-user.usecase.interface';

export class StubDeleteUserUseCase implements IDeleteUserUseCase {
  async execute(_input: IDeleteUserDTO): Promise<void> {
    return undefined;
  }
}
