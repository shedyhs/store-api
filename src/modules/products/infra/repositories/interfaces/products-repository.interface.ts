import { ProductDAO } from '@/modules/products/domain/products/dao/product.dao';
import {
  IPaginateRequest,
  IPaginateResponse,
} from '@/shared/interfaces/pagination.interface';

export interface IProductsRepository {
  create(product: ProductDAO): Promise<void>;
  update(product: ProductDAO): Promise<void>;
  findById(id: string): Promise<ProductDAO | undefined>;
  findAllProducts(
    filters: IPaginateRequest,
  ): Promise<IPaginateResponse<ProductDAO>>;
  delete(product: ProductDAO): Promise<void>;
}
