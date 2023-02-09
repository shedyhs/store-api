import { Entity } from '@/shared/domain/entity';
import { EntityError } from '@/shared/errors/entity-error';
import { ProductDAO } from '../dao/product.dao';
import { Price } from './value-objects/price.vo';

interface ProductProperties {
  name: string;
  price: number;
  description?: string;
  isActive: boolean;
  storeId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DomainProductProperties {
  name: string;
  price: number;
  description?: string;
  storeId: string;
}

export interface UpdateProductProperties {
  name?: string;
  price?: number;
  description?: string;
}

export interface OutputProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  isActive: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends Entity {
  private _name: string;
  private _price: Price;
  private _description?: string;
  private _isActive: boolean;
  private _storeId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ProductProperties, id?: string) {
    super(id);
    this._name = props.name;
    this._price = new Price(props.price);
    this._description = props.description;
    this._isActive = props.isActive;
    this._storeId = props.storeId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this.validate();
  }

  update(props: UpdateProductProperties): void {
    if (props.name) {
      this._name = props.name;
    }

    if (props.price) {
      this._price = new Price(props.price);
    }

    if (props.description) {
      this._description = props.description;
    }

    this._updatedAt = new Date();
    this.validate();
  }

  validate(): void {
    if (!this._name) {
      this.addError({ field: 'name', messages: ['field name is required'] });
    }

    if (this._isActive === undefined || !this._isActive === null) {
      this.addError({
        field: 'isActive',
        messages: ['field isActive is required'],
      });
    }

    if (!this._storeId) {
      this.addError({
        field: 'storeId',
        messages: ['field storeId is required'],
      });
    }

    if (this._price.hasErrors()) {
      this.addError(this._price.errors);
    }

    if (this.hasError()) {
      throw new EntityError(this.errors);
    }
  }

  public static fromDAO(product: ProductDAO): Product {
    return new Product(
      {
        name: product.name,
        price: product.price,
        isActive: product.is_active,
        description: product.description,
        storeId: product.store_id,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      },
      product.id,
    );
  }

  public static fromDomain(product: DomainProductProperties): Product {
    return new Product({
      name: product.name,
      price: product.price,
      description: product.description,
      storeId: product.storeId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  toOutput(): OutputProduct {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      storeId: this.storeId,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toDAO(): ProductDAO {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      is_active: this.isActive,
      description: this.description,
      store_id: this.storeId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price.value;
  }

  get description(): string | undefined {
    return this._description;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get storeId(): string {
    return this._storeId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
