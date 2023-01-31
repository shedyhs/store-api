import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';
import { ILogInDTO } from '../dtos/log-in.dto';

export interface ILogInUseCase {
  execute(input: ILogInDTO): Promise<IOutputAuthenticationDTO>;
}
