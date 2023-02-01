import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces/users-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { StoreDomain, Store } from '../../domain/stores/entities/store';
import { IStoresRepository } from '../../infra/repositories/interfaces/stores-repository.interface';
import { IOutputStoreDTO } from './dtos/output-store.dto';
import { ICreateStoreUseCase } from './interfaces/create-store.usecase.interface';

export class CreateStoreUseCase implements ICreateStoreUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly storesRepository: IStoresRepository,
  ) {}

  async execute(input: StoreDomain): Promise<IOutputStoreDTO> {
    const foundUser = await this.usersRepository.findById(input.userId);
    if (!foundUser) {
      throw new ApplicationErrors.NotFoundError('user not found');
    }
    const userAlreadyHasStore = await this.storesRepository.findByUserId(
      input.userId,
    );
    if (userAlreadyHasStore) {
      throw new ApplicationErrors.ConflictError('user already has a store');
    }
    const store = Store.fromDomain(input);
    await this.storesRepository.create(store.toDAO());
    return store.toOutput();
  }
}
