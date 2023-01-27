import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IShowUserDTO } from '../dtos/show-user.dto';

export interface IShowUserUseCase {
  execute(input: IShowUserDTO): Promise<IOutputUserDTO>;
}
