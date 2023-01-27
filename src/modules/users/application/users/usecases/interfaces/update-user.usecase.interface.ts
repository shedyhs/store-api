import { IOutputUserDTO } from '../dtos/output-user.dto';
import { IUpdateUserDTO } from '../dtos/update-user.dto';

export interface IUpdateUserUseCase {
  execute(input: IUpdateUserDTO): Promise<IOutputUserDTO>;
}
