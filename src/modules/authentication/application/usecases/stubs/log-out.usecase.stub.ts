import { ILogOutDTO } from '../dtos/log-out.dto';
import { ILogOutUseCase } from '../interfaces/log-out-usecase.interface';

export class StubLogOutUseCase implements ILogOutUseCase {
  async execute(_input: ILogOutDTO): Promise<void> {
    return undefined;
  }
}
