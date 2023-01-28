import { UserDAO } from '@/modules/users/domain/users/dao/user.dao';
import { User } from '@/modules/users/domain/users/entities/user';
import { IUsersRepository } from '../interfaces/users-repository.interface';

export class MockUsersRepository implements IUsersRepository {
  private users: UserDAO[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user.toDAO());
  }

  async update(user: User): Promise<void> {
    const indexOfUser = this.users.findIndex(
      (foundUser) => foundUser.id === user.id,
    );
    this.users[indexOfUser] = user.toDAO();
  }

  async findById(id: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) {
      return undefined;
    }
    return User.toApplication(foundUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const foundUser = this.users.find((user) => user.email === email);
    if (!foundUser) {
      return undefined;
    }
    return new User(
      {
        email: foundUser.email,
        password: foundUser.password,
        username: foundUser.username,
        createdAt: foundUser.created_at,
        updatedAt: foundUser.updated_at,
      },
      foundUser.id,
    );
  }

  async delete(user: User): Promise<void> {
    const foundUser = this.users.find((usr) => usr.id === user.id);
    const index = this.users.indexOf(foundUser as UserDAO);
    this.users.splice(index, 1);
  }
}
