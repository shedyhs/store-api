import { mockStoreDAO } from '@/modules/stores/domain/mocks/store.dao.mock';
import { faker } from '@faker-js/faker';
import { ProductDAO } from '../products/dao/product.dao';

export const mockProductDAO: ProductDAO = {
  id: faker.datatype.uuid(),
  name: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  price: Number(faker.commerce.price(100, 2000, 2)),
  is_active: true,
  store_id: mockStoreDAO.id,
  created_at: faker.date.past(2),
  updated_at: faker.date.past(1),
};
