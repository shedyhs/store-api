import { mockUserDAO } from '@/modules/users/domain/mocks/user.dao.mock';
import { faker } from '@faker-js/faker';
import { StoreDomain } from '../stores/entities/store';

export const mockStoreDomain: StoreDomain = {
  name: faker.company.name(),
  userId: mockUserDAO.id,
};
