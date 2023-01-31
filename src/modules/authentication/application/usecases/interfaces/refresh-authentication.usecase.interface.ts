import { IRefreshAuthenticationDTO } from '../dtos/refresh-authentication.dto';
import { IOutputAuthenticationDTO } from '../dtos/authentication-output.dto';

export interface IRefreshAuthenticationUseCase {
  execute(input: IRefreshAuthenticationDTO): Promise<IOutputAuthenticationDTO>;
}
