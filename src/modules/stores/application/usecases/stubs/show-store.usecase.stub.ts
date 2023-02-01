import { mockStoreDomain } from '@/modules/stores/domain/mocks/store.domain.mock';
import { Store } from '@/modules/stores/domain/stores/entities/store';
import { IOutputStoreDTO } from '../dtos/output-store.dto';
import { IShowStoreDTO } from '../dtos/show-store.dto';
import { IShowStoreUseCase } from '../interfaces/show-store.usecase.interface';

export class StubShowStoreUseCase implements IShowStoreUseCase {
  async execute(_input: IShowStoreDTO): Promise<IOutputStoreDTO> {
    const store = Store.fromDomain(mockStoreDomain);
    return store.toOutput();
  }
}
