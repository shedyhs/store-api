import { EntityError } from '@/shared/entity-error';
import { User } from './user';

describe('User entity unit test', () => {
  test('validade constructor', async () => {
    const newUser = { email: 'email@mail.com', password: 'Pa$$w0rd' };

    let user = new User(newUser);
    expect(user.id).toStrictEqual(expect.any(String));
    expect(user.email).toBe('email@mail.com');
    expect(user.password.compare('Pa$$w0rd')).toBeTruthy();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);

    const createdAt = new Date();
    const updatedAt = new Date();
    const existentUser = {
      email: 'email@mail.com',
      password: 'Pa$$w0rd',
      createdAt,
      updatedAt,
    };

    user = new User(existentUser, 'existent-id');
    expect(user.id).toBe('existent-id');
    expect(user.createdAt).toBe(createdAt);
    expect(user.updatedAt).toBe(updatedAt);

    const invalidPack = [
      { email: 'email@mail.com', password: 'Passw0rd' },
      { email: 'emailmail.com', password: 'Pa$$w0rd' },
    ];

    invalidPack.forEach((data) => {
      expect(() => new User(data)).toThrow(EntityError);
    });
  });

  test('update user', () => {
    const user = new User({ email: 'email@mail.com', password: 'Pa$$w0rd' });
    user.update({ email: 'another@email.com', password: 'Newpa$$w0rd' });
    expect(user.email).toBe('another@email.com');
    expect(user.password.compare('Newpa$$w0rd'));
  });
});
