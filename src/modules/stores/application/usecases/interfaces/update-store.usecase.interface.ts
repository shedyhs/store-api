import { IOutputStoreDTO } from '../dtos/output-store.dto';
import { IUpdateStoreDTO } from '../dtos/update-store.dto';

export interface IUpdateStoreUseCase {
  execute(input: IUpdateStoreDTO): Promise<IOutputStoreDTO>;
}
