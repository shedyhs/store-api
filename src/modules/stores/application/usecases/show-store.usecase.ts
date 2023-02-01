import { ApplicationErrors } from '@/shared/errors/application-error';
import { Store } from '../../domain/stores/entities/store';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { IOutputStoreDTO } from './dtos/output-store.dto';
import { IShowStoreDTO } from './dtos/show-store.dto';
import { IShowStoreUseCase } from './interfaces/show-store.usecase.interface';

export class ShowStoreUseCase implements IShowStoreUseCase {
  constructor(private readonly storesRepository: IStoresRepository) {}
  async execute(input: IShowStoreDTO): Promise<IOutputStoreDTO> {
    const foundStore = await this.storesRepository.findById(input.id);
    if (!foundStore) {
      throw new ApplicationErrors.NotFoundError('store not found');
    }
    const store = Store.fromDAO(foundStore);
    return store.toOutput();
  }
}
