import { IOutputUserDTO } from '@/modules/users/application/users/usecases/dtos/output-user.dto';

export interface IOutputAuthenticationDTO {
  accessToken: string;
  refreshToken: string;
  user: IOutputUserDTO;
}
