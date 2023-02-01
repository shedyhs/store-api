import { StoreDAO } from '@/modules/stores/domain/stores/dao/store.dao';

export interface IStoresRepository {
  create(store: StoreDAO): Promise<void>;
  update(store: StoreDAO): Promise<void>;
  findById(id: string): Promise<StoreDAO | undefined>;
  findByUserId(userId: string): Promise<StoreDAO | undefined>;
  delete(store: StoreDAO): Promise<void>;
}
