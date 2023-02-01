import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { faker } from '@faker-js/faker';
import { StoreDAO } from '../stores/dao/store.dao';

export const mockStoreDAO: StoreDAO = {
  id: faker.datatype.uuid(),
  name: faker.company.name(),
  userId: mockUserDAO.id,
  created_at: faker.date.past(2),
  updated_at: faker.date.past(1),
};
