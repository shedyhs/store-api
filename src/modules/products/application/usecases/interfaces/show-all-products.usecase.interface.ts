import { IPaginateResponse } from '@/shared/interfaces/pagination.interface';
import { IOutputProductDTO } from '../dtos/output-product.dto';
import { IShowAllProductsDTO } from '../dtos/show-all-product.dto';

export interface IShowAllProductsUseCase {
  execute(
    input: IShowAllProductsDTO,
  ): Promise<IPaginateResponse<IOutputProductDTO>>;
}
