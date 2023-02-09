import {
  FilterProduct,
  ProductDAO,
} from '@/modules/products/domain/products/dao/product.dao';
import { BaseRepository } from '@/shared/infra/base-repository';
import {
  IPaginateRequest,
  IPaginateResponse,
} from '@/shared/interfaces/pagination.interface';
import { IProductsRepository } from '../interfaces/products-repository.interface';

export class MockProductsRepository
  extends BaseRepository
  implements IProductsRepository {
  private products: ProductDAO[] = [];

  async create(product: ProductDAO): Promise<void> {
    this.products.push(product);
  }

  async update(product: ProductDAO): Promise<void> {
    const indexOfProduct = this.products.findIndex(
      (foundProduct) => foundProduct.id === product.id,
    );
    this.products[indexOfProduct] = product;
  }

  async findById(id: string): Promise<ProductDAO | undefined> {
    const foundProduct = this.products.find((product) => product.id === id);
    if (!foundProduct) {
      return undefined;
    }
    return foundProduct;
  }

  async findAllProducts(
    filters: IPaginateRequest,
  ): Promise<IPaginateResponse<ProductDAO>> {
    let foundProducts: ProductDAO[] = [];

  }


  if(filter.sort) {
    filteredData.sort((a, b) => {
      if (a[filter.sort.field] < b[filter.sort.field]) {
        return filter.sort.order === "desc" ? 1 : -1;
      } else if (a[filter.sort.field] > b[filter.sort.field]) {
        return filter.sort.order === "desc" ? -1 : 1;
      } else {
        return 0;
      }
    });
  }



  async delete(product: ProductDAO): Promise<void> {
    const foundProduct = this.products.find((usr) => usr.id === product.id);
    const index = this.products.indexOf(foundProduct as ProductDAO);
    this.products.splice(index, 1);
  }
}
