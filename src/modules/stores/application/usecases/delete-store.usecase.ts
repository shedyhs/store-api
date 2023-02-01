import { ApplicationErrors } from '@/shared/errors/application-error';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { IDeleteStoreDTO } from './dtos/delete-store.dto';
import { IDeleteStoreUseCase } from './interfaces/delete-store.usecase.interface';

export class DeleteStoreUseCase implements IDeleteStoreUseCase {
  constructor(private readonly storesRepository: IStoresRepository) {}
  async execute(input: IDeleteStoreDTO): Promise<void> {
    const foundStore = await this.storesRepository.findByUserId(input.userId);
    if (!foundStore) {
      throw new ApplicationErrors.NotFoundError('store not found');
    }
    await this.storesRepository.delete(foundStore);
  }
}
