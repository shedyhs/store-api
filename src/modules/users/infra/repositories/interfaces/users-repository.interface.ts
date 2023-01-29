import { UserDAO } from '@/modules/users/domain/users/dao/user.dao';

export interface IUsersRepository {
  create(user: UserDAO): Promise<void>;
  update(user: UserDAO): Promise<void>;
  findById(id: string): Promise<UserDAO | undefined>;
  findByEmail(email: string): Promise<UserDAO | undefined>;
  delete(user: UserDAO): Promise<void>;
}
