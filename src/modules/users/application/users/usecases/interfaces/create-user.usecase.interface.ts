import { ICreateUserDTO } from '../dtos/create-user.dto';
import { IOutputUserDTO } from '../dtos/output-user.dto';

export interface ICreateUserUseCase {
  execute(input: ICreateUserDTO): Promise<IOutputUserDTO>;
}
