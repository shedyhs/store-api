import { EntityError } from '@/shared/errors/entity-error';
import { describe, test, expect } from 'vitest';
import { mockStoreDAO } from '../../mocks/store.dao.mock';
import { mockStoreDomain } from '../../mocks/store.domain.mock';
import { Store } from './store';

describe('Store entity unit test', () => {
  test('validade constructor', async () => {
    const newStore = {
      name: 'store',
      userId: 'some-user-uuid',
    };

    let store = new Store(newStore);
    expect(store.id).toStrictEqual(expect.any(String));
    expect(store.name).toBe('store');
    expect(store.userId).toBe('some-user-uuid');
    expect(store.createdAt).toBeInstanceOf(Date);
    expect(store.updatedAt).toBeInstanceOf(Date);

    const createdAt = new Date();
    const updatedAt = new Date();
    const existentStore = {
      name: 'name',
      userId: 'user-uuid',
      createdAt,
      updatedAt,
    };

    store = new Store(existentStore, 'existent-id');
    expect(store.id).toBe('existent-id');
    expect(store.createdAt).toBe(createdAt);
    expect(store.updatedAt).toBe(updatedAt);

    const invalidPack = [{ name: '', userId: 'some-user-uuid' }];

    invalidPack.forEach((data) => {
      expect(() => Store.fromDomain(data)).toThrow(EntityError);
    });
  });

  test('update store', () => {
    const store = Store.fromDomain(mockStoreDomain);
    store.update({
      name: 'another-store-name',
    });
    expect(store.name).toBe('another-store-name');
  });

  test('fromDAO', () => {
    const store = Store.fromDAO(mockStoreDAO);
    expect(store).toBeInstanceOf(Store);
    expect(store.id).toBe(mockStoreDAO.id);
    expect(store.name).toBe(mockStoreDAO.name);
    expect(store.createdAt).toBe(mockStoreDAO.created_at);
    expect(store.updatedAt).toBe(mockStoreDAO.updated_at);
  });

  test('toDAO', () => {
    const store = Store.fromDomain(mockStoreDomain);
    const storeDAO = store.toDAO();
    expect(storeDAO.id).toBe(store.id);
    expect(storeDAO.name).toBe(store.name);
    expect(storeDAO.created_at).toBe(store.createdAt);
    expect(storeDAO.updated_at).toBe(store.updatedAt);
  });

  test('toDAO', () => {
    const store = Store.fromDomain(mockStoreDomain);
    const storeOutput = store.toOutput();
    expect(storeOutput.id).toBe(store.id);
    expect(storeOutput.name).toBe(store.name);
    expect(storeOutput.createdAt).toBe(store.createdAt);
    expect(storeOutput.updatedAt).toBe(store.updatedAt);
  });
});
