import { faker } from '@faker-js/faker';
import { DomainUserProperties } from '../users/entities/user';

export const MockUserDomain: DomainUserProperties = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: 'Pa$$w0rd',
};
