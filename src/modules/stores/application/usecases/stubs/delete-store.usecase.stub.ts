import { IDeleteStoreDTO } from '../dtos/delete-store.dto';
import { IDeleteStoreUseCase } from '../interfaces/delete-store.usecase.interface';

export class StubDeleteStoreUseCase implements IDeleteStoreUseCase {
  async execute(_input: IDeleteStoreDTO): Promise<void> {
    return undefined;
  }
}
