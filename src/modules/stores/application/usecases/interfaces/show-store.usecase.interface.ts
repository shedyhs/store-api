import { IOutputStoreDTO } from '../dtos/output-store.dto';
import { IShowStoreDTO } from '../dtos/show-store.dto';

export interface IShowStoreUseCase {
  execute(input: IShowStoreDTO): Promise<IOutputStoreDTO>;
}
