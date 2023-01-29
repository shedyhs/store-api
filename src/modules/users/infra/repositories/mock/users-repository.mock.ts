import { UserDAO } from '@/modules/users/domain/users/dao/user.dao';
import { IUsersRepository } from '../interfaces/users-repository.interface';

export class MockUsersRepository implements IUsersRepository {
  private users: UserDAO[] = [];

  async create(user: UserDAO): Promise<void> {
    this.users.push(user);
  }

  async update(user: UserDAO): Promise<void> {
    const indexOfUser = this.users.findIndex(
      (foundUser) => foundUser.id === user.id,
    );
    this.users[indexOfUser] = user;
  }

  async findById(id: string): Promise<UserDAO | undefined> {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) {
      return undefined;
    }
    return foundUser;
  }

  async findByEmail(email: string): Promise<UserDAO | undefined> {
    const foundUser = this.users.find((user) => user.email === email);
    if (!foundUser) {
      return undefined;
    }
    return foundUser;
  }

  async delete(user: UserDAO): Promise<void> {
    const foundUser = this.users.find((usr) => usr.id === user.id);
    const index = this.users.indexOf(foundUser as UserDAO);
    this.users.splice(index, 1);
  }
}
