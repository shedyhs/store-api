import { UpdateStoreProperties } from '@/modules/stores/domain/stores/entities/store';

export interface IUpdateStoreDTO extends UpdateStoreProperties {
  userId: string;
}
