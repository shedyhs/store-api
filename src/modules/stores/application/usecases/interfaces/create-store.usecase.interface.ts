import { ICreateStoreDTO } from '../dtos/create-store.dto';
import { IOutputStoreDTO } from '../dtos/output-store.dto';

export interface ICreateStoreUseCase {
  execute(input: ICreateStoreDTO): Promise<IOutputStoreDTO>;
}
