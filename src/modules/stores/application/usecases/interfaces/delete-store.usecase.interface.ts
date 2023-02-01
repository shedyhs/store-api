import { IDeleteStoreDTO } from '../dtos/delete-store.dto';

export interface IDeleteStoreUseCase {
  execute(input: IDeleteStoreDTO): Promise<void>;
}
