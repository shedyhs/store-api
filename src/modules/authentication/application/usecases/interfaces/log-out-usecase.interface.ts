import { ILogOutDTO } from '../dtos/log-out.dto';

export interface ILogOutUseCase {
  execute(input: ILogOutDTO): Promise<void>;
}
