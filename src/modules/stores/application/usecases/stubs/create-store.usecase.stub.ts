import { mockStoreDomain } from '@/modules/stores/domain/mocks/store.domain.mock';
import { Store } from '@/modules/stores/domain/stores/entities/store';
import { ICreateStoreDTO } from '../dtos/create-store.dto';
import { IOutputStoreDTO } from '../dtos/output-store.dto';
import { ICreateStoreUseCase } from '../interfaces/create-store.usecase.interface';

export class StubCreateStoreUseCase implements ICreateStoreUseCase {
  async execute(_input: ICreateStoreDTO): Promise<IOutputStoreDTO> {
    const store = Store.fromDomain(mockStoreDomain);
    return store.toOutput();
  }
}
