import { IPaginateResponse } from '@/shared/interfaces/pagination.interface';
import { IProductsRepository } from '../../infra/repositories/interfaces/products-repository.interface';
import { IOutputProductDTO } from './dtos/output-product.dto';
import { IShowAllProductsDTO } from './dtos/show-all-product.dto';
import { IShowAllProductsUseCase } from './interfaces/show-all-products.usecase.interface';

export class ShowAllProductsUseCase implements IShowAllProductsUseCase {
  constructor(private readonly productsRepository: IProductsRepository) {}
  async execute(
    input: IShowAllProductsDTO,
  ): Promise<IPaginateResponse<IOutputProductDTO>> {}
}
