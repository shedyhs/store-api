import { UpdateProductProperties } from '@/modules/products/domain/products/entities/product';

export interface IUpdateProductDTO extends UpdateProductProperties {
  id: string;
  userId: string;
}
