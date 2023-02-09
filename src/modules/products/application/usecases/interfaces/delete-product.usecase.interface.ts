import { IDeleteProductDTO } from '../dtos/delete-product.dto';

export interface IDeleteProductUseCase {
  execute(input: IDeleteProductDTO): Promise<void>;
}
