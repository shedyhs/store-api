import { User } from '@/modules/users/domain/users/entities/user';

export interface IUsersRepository {
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(user: User): Promise<void>;
}
