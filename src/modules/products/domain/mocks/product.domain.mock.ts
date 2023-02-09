import { DomainProductProperties } from '../products/entities/product';
import { mockProductDAO } from './product.dao.mock';

export const mockProductDomain: DomainProductProperties = {
  name: mockProductDAO.name,
  price: mockProductDAO.price,
  storeId: mockProductDAO.store_id,
};
