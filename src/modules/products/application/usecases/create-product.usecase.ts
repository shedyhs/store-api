import { IStoresRepository } from '@/modules/stores/infra/repositories/interfaces/stores-repository.interface';
import { ApplicationErrors } from '@/shared/errors/application-error';
import { Product } from '../../domain/products/entities/product';
import { IProductsRepository } from '../../infra/repositories/interfaces/products-repository.interface';
import { ICreateProductDTO } from './dtos/create-product.dto';
import { IOutputProductDTO } from './dtos/output-product.dto';
import { ICreateProductUseCase } from './interfaces/create-product.usecase.interface';

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly productsRepository: IProductsRepository,
    private readonly storesRepositories: IStoresRepository,
  ) {}

  async execute(input: ICreateProductDTO): Promise<IOutputProductDTO> {
    const foundStore = await this.storesRepositories.findByUserId(input.userId);
    if (!foundStore) {
      throw new ApplicationErrors.PreconditionRequired('user not have a store');
    }
    const product = Product.fromDomain({ ...input, storeId: foundStore.id });
    await this.productsRepository.create(product.toDAO());
    return product.toOutput();
  }
}
