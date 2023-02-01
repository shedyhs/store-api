import { ApplicationErrors } from '@/shared/errors/application-error';
import { Store } from '../../domain/stores/entities/store';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { IOutputStoreDTO } from './dtos/output-store.dto';
import { IUpdateStoreDTO } from './dtos/update-store.dto';
import { IUpdateStoreUseCase } from './interfaces/update-store.usecase.interface';

export class UpdateStoreUseCase implements IUpdateStoreUseCase {
  constructor(private readonly storesRepository: IStoresRepository) {}
  async execute(input: IUpdateStoreDTO): Promise<IOutputStoreDTO> {
    const foundStore = await this.storesRepository.findByUserId(input.userId);
    if (!foundStore) {
      throw new ApplicationErrors.NotFoundError(
        'user not have a store to update',
      );
    }
    const store = Store.fromDAO(foundStore);
    store.update(input);
    return store.toOutput();
  }
}
