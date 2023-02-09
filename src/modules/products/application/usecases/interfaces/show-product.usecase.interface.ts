import { IOutputProductDTO } from '../dtos/output-product.dto';
import { IShowProductDTO } from '../dtos/show-product.dto';

export interface IShowProductUseCase {
  execute(input: IShowProductDTO): Promise<IOutputProductDTO>;
}
