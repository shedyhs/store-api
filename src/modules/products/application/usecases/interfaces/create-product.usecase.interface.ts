import { ICreateProductDTO } from '../dtos/create-product.dto';
import { IOutputProductDTO } from '../dtos/output-product.dto';

export interface ICreateProductUseCase {
  execute(input: ICreateProductDTO): Promise<IOutputProductDTO>;
}
