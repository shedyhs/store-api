import { Entity } from '@/shared/domain/entity';
import { EntityError } from '@/shared/errors/entity-error';
import { PartialObject } from 'lodash';
import { StoreDAO } from '../dao/store.dao';

export interface StoreProperties {
  name: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UpdateStoreProperties
  extends PartialObject<
    Omit<StoreProperties, 'userId' | 'createdAt' | 'updatedAt'>
  > {}

export interface OutputStore {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreDomain {
  name: string;
  userId: string;
}

export class Store extends Entity {
  private _name: string;
  private _userId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: StoreProperties, id?: string) {
    super(id);
    this._name = props.name;
    this._userId = props.userId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this.validate();
  }

  validate(): void {
    if (!this._name) {
      this.addError({ field: 'name', messages: ['Required at name'] });
    }
    if (this.hasError()) {
      throw new EntityError(this.errors);
    }
  }

  update(props: UpdateStoreProperties): void {
    if (props.name) {
      this._name = props.name;
    }
    this._updatedAt = new Date();
  }

  toOutput(): OutputStore {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toDAO(): StoreDAO {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  public static fromDAO(store: StoreDAO): Store {
    return new Store(
      {
        name: store.name,
        userId: store.userId,
        createdAt: store.created_at,
        updatedAt: store.updated_at,
      },
      store.id,
    );
  }

  public static fromDomain(store: StoreDomain): Store {
    return new Store({
      name: store.name,
      userId: store.userId,
    });
  }

  get name(): string {
    return this._name;
  }

  get userId(): string {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
}
