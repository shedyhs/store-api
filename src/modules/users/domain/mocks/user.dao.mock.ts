import { faker } from '@faker-js/faker';
import { UserDAO } from '../users/dao/user.dao';
import { Password } from '../users/entities/value-objects/password.vo';

export const MockUserDAO: UserDAO = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: new Password('Pa$$w0rd').value,
  created_at: faker.date.past(2),
  updated_at: faker.date.past(1),
};
