import { StoreDAO } from '@/modules/stores/domain/stores/dao/store.dao';
import { IStoresRepository } from '../interfaces/stores-repository.interface';

export class MockStoresRepository implements IStoresRepository {
  private stores: StoreDAO[] = [];

  async create(store: StoreDAO): Promise<void> {
    this.stores.push(store);
  }

  async update(store: StoreDAO): Promise<void> {
    const indexOfStore = this.stores.findIndex(
      (foundStore) => foundStore.id === store.id,
    );
    this.stores[indexOfStore] = store;
  }

  async findById(id: string): Promise<StoreDAO | undefined> {
    const foundStore = this.stores.find((store) => store.id === id);
    if (!foundStore) {
      return undefined;
    }
    return foundStore;
  }

  async findByUserId(userId: string): Promise<StoreDAO | undefined> {
    const foundStore = this.stores.find((store) => store.userId === userId);
    if (!foundStore) {
      return undefined;
    }
    return foundStore;
  }

  async delete(store: StoreDAO): Promise<void> {
    const foundStore = this.stores.find((usr) => usr.id === store.id);
    const index = this.stores.indexOf(foundStore as StoreDAO);
    this.stores.splice(index, 1);
  }
}
