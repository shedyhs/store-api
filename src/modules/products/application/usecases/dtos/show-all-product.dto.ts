import { IPaginateRequest } from '@/shared/interfaces/pagination.interface';

export interface IShowAllProductsDTO extends IPaginateRequest {
  storeId: string;
}
