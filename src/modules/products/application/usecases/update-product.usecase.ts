import { IStoresRepository } from '@/modules/stores/infra/repositories/interfaces/stores-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { Product } from '../../domain/products/entities/product';
import { IProductsRepository } from '../../infra/repositories/interfaces/products-repository.interface';
import { IOutputProductDTO } from './dtos/output-product.dto';
import { IUpdateProductDTO } from './dtos/update-product.dto';
import { IUpdateProductUseCase } from './interfaces/update-product.usecase.interface';

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly storesRepository: IStoresRepository,
  ) {}

  async execute(input: IUpdateProductDTO): Promise<IOutputProductDTO> {
    const foundStore = await this.storesRepository.findByUserId(input.userId);
    if (!foundStore) {
      throw new ApplicationErrors.PreconditionRequired(
        'user must have a store to update a product',
      );
    }
    const foundProduct = await this.productsRepository.findById(input.id);
    if (!foundProduct) {
      throw new ApplicationErrors.NotFoundError('product not found');
    }
    if (foundStore.id !== foundProduct.store_id) {
      throw new ApplicationErrors.UnauthorizedError(
        'you cannot update product of another store',
      );
    }
    const product = Product.fromDAO(foundProduct);
    product.update(input);
    await this.productsRepository.update(product.toDAO());
    return product.toOutput();
  }
}
