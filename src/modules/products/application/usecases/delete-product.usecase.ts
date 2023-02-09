import { IStoresRepository } from '@/modules/stores/infra/repositories/interfaces/stores-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { IProductsRepository } from '../../infra/repositories/interfaces/products-repository.interface';
import { IDeleteProductDTO } from './dtos/delete-product.dto';
import { IDeleteProductUseCase } from './interfaces/delete-product.usecase.interface';

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly storesRepository: IStoresRepository,
  ) {}

  async execute(input: IDeleteProductDTO): Promise<void> {
    const foundStore = await this.storesRepository.findByUserId(input.userId);
    if (!foundStore) {
      throw new ApplicationErrors.PreconditionRequired(
        'user must have a store to delete a product',
      );
    }
    const foundProduct = await this.productsRepository.findById(input.id);
    if (!foundProduct) {
      throw new ApplicationErrors.NotFoundError('product not found');
    }
    if (foundStore.id !== foundProduct.store_id) {
      throw new ApplicationErrors.UnauthorizedError(
        'you cannot delete product of another store',
      );
    }
    await this.productsRepository.delete(foundProduct);
  }
}
