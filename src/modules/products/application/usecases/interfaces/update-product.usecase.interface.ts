import { IOutputProductDTO } from '../dtos/output-product.dto';
import { IUpdateProductDTO } from '../dtos/update-product.dto';

export interface IUpdateProductUseCase {
  execute(input: IUpdateProductDTO): Promise<IOutputProductDTO>;
}
