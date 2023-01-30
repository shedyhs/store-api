import { EntityError } from '@/shared/errors/entity-error';
import { describe, test, expect } from 'vitest';
import { MockUserDAO } from '../../mocks/user.dao.mock';
import { MockUserDomain } from '../../mocks/user.domain.mock';
import { User } from './user';
import { Password } from './value-objects/password.vo';

describe('User entity unit test', () => {
  test('validade constructor', async () => {
    const newUser = {
      email: 'email@mail.com',
      username: 'shedyhs',
      password: new Password('Pa$$w0rd'),
    };

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
      username: 'username',
      password: new Password('Pa$$w0rd'),
      createdAt,
      updatedAt,
    };

    user = new User(existentUser, 'existent-id');
    expect(user.id).toBe('existent-id');
    expect(user.createdAt).toBe(createdAt);
    expect(user.updatedAt).toBe(updatedAt);

    const invalidPack = [
      { email: 'email@mail.com', username: 'shedyhs', password: 'Passw0rd' },
      { email: 'emailmail.com', username: 'shedyhs', password: 'Pa$$w0rd' },
      { email: 'emailmail.com', username: '', password: 'Pa$$w0rd' },
    ];

    invalidPack.forEach((data) => {
      expect(() => User.fromDomain(data)).toThrow(EntityError);
    });
  });

  test('update user', () => {
    const user = new User({
      email: 'email@mail.com',
      username: 'another-username',
      password: new Password('Pa$$w0rd'),
    });
    user.update({
      email: 'another@email.com',
      username: 'another-username',
      password: 'Newpa$$w0rd',
    });
    expect(user.email).toBe('another@email.com');
    expect(user.username).toBe('another-username');
    expect(user.password.compare('Newpa$$w0rd'));
  });

  test('fromDAO', () => {
    const user = User.fromDAO(MockUserDAO);
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(MockUserDAO.id);
    expect(user.email).toBe(MockUserDAO.email);
    expect(user.username).toBe(MockUserDAO.username);
    expect(user.password.value).toBe(MockUserDAO.password);
    expect(user.createdAt).toBe(MockUserDAO.created_at);
    expect(user.updatedAt).toBe(MockUserDAO.updated_at);
  });

  test('toDAO', () => {
    const user = User.fromDomain(MockUserDomain);
    const userDAO = user.toDAO();
    expect(userDAO.id).toBe(user.id);
    expect(userDAO.email).toBe(user.email);
    expect(userDAO.username).toBe(user.username);
    expect(userDAO.password).toBe(user.password.value);
    expect(userDAO.created_at).toBe(user.createdAt);
    expect(userDAO.updated_at).toBe(user.updatedAt);
  });

  test('toDAO', () => {
    const user = User.fromDomain(MockUserDomain);
    const userOutput = user.toOutput();
    expect(userOutput.id).toBe(user.id);
    expect(userOutput.email).toBe(user.email);
    expect(userOutput.username).toBe(user.username);
    expect(userOutput).not.toHaveProperty('password');
    expect(userOutput.createdAt).toBe(user.createdAt);
    expect(userOutput.updatedAt).toBe(user.updatedAt);
  });
});
