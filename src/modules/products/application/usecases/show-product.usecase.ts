import { ApplicationErrors } from '@/shared/errors/application-error';
import { Product } from '../../domain/products/entities/product';
import { IProductsRepository } from '../../infra/repositories/interfaces/products-repository.interface';
import { IOutputProductDTO } from './dtos/output-product.dto';
import { IShowProductDTO } from './dtos/show-product.dto';
import { IShowProductUseCase } from './interfaces/show-product.usecase.interface';

export class ShowProductUseCase implements IShowProductUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}
  async execute(input: IShowProductDTO): Promise<IOutputProductDTO> {
    const foundProduct = await this.productsRepository.findById(input.id);
    if (!foundProduct) {
      throw new ApplicationErrors.NotFoundError('product not found');
    }
    const product = Product.fromDAO(foundProduct);
    return product.toOutput();
  }
}
