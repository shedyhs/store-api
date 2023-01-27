import { IDeleteUserDTO } from '../dtos/delete-user.dto';

export interface IDeleteUserUseCase {
  execute(input: IDeleteUserDTO): Promise<void>;
}
