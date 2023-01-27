import { User } from '@/modules/users/domain/users/entities/user';

export interface IUsersRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  delete(user: User): Promise<void>;
}
