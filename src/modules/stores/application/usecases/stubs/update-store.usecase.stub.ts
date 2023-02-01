import { mockStoreDomain } from '@/modules/stores/domain/mocks/store.domain.mock';
import { Store } from '@/modules/stores/domain/stores/entities/store';
import { IOutputStoreDTO } from '../dtos/output-store.dto';
import { IUpdateStoreDTO } from '../dtos/update-store.dto';
import { IUpdateStoreUseCase } from '../interfaces/update-store.usecase.interface';

export class StubUpdateStoreUseCase implements IUpdateStoreUseCase {
  async execute(_input: IUpdateStoreDTO): Promise<IOutputStoreDTO> {
    const store = Store.fromDomain(mockStoreDomain);
    return store.toOutput();
  }
}
