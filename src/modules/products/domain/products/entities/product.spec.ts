import { EntityError } from '@/shared/errors/entity-error';
import { describe, test, expect } from 'vitest';
import { mockProductDAO } from '../../mocks/product.dao.mock';
import { mockProductDomain } from '../../mocks/product.domain.mock';
import { Product } from './product';

describe('Product entity unit test', () => {
  test('constructor', () => {
    let product = new Product({
      name: 'name',
      price: 10,
      storeId: 'store-id',
      description: 'description',
      isActive: true,
    });

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toStrictEqual(expect.any(String));
    expect(product.name).toBe('name');
    expect(product.price).toBe(10);
    expect(product.storeId).toBe('store-id');
    expect(product.description).toBe('description');
    expect(product.isActive).toBe(true);
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.updatedAt).toBeInstanceOf(Date);

    product = new Product(
      {
        name: 'name',
        price: 10,
        storeId: 'store-id',
        description: 'description',
        isActive: true,
      },
      'store-id',
    );

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe('store-id');

    expect(() => new Product({ price: -1 } as any)).toThrow(EntityError);
  });

  test('update', () => {
    const product = Product.fromDomain(mockProductDomain);
    const beforeUpdate = product.updatedAt;
    product.update({
      name: 'another-name',
      price: 123.12,
      description: 'another description',
    });

    expect(product.name).toBe('another-name');
    expect(product.price).toBe(123.12);
    expect(product.description).toBe('another description');
    expect(product.updatedAt.getTime()).toBeGreaterThanOrEqual(
      beforeUpdate.getTime(),
    );
  });

  test('fromDomain', () => {
    const product = Product.fromDomain(mockProductDomain);
    expect(product).toBeInstanceOf(Product);
    expect(product.name).toBe(mockProductDomain.name);
    expect(product.description).toBe(mockProductDomain.description);
    expect(product.price).toBe(mockProductDomain.price);
  });

  test('fromDAO', () => {
    const product = Product.fromDAO(mockProductDAO);
    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(mockProductDAO.id);
    expect(product.name).toBe(mockProductDAO.name);
    expect(product.description).toBe(mockProductDAO.description);
    expect(product.price).toBe(mockProductDAO.price);
    expect(product.isActive).toBe(mockProductDAO.is_active);
    expect(product.storeId).toBe(mockProductDAO.store_id);
    expect(product.createdAt).toBe(mockProductDAO.created_at);
    expect(product.updatedAt).toBe(mockProductDAO.updated_at);
  });

  test('toDAO', () => {
    const product = Product.fromDomain(mockProductDomain);
    const productDAO = product.toDAO();
    expect(product).toBeInstanceOf(Product);
    expect(productDAO.id).toBe(product.id);
    expect(productDAO.name).toBe(product.name);
    expect(productDAO.description).toBe(product.description);
    expect(productDAO.price).toBe(product.price);
    expect(productDAO.is_active).toBe(product.isActive);
    expect(productDAO.store_id).toBe(product.storeId);
    expect(productDAO.created_at).toBe(product.createdAt);
    expect(productDAO.updated_at).toBe(product.updatedAt);
  });

  test('toOutput', () => {
    const product = Product.fromDomain(mockProductDomain);
    const productOutput = product.toOutput();
    expect(product).toBeInstanceOf(Product);
    expect(productOutput.id).toBe(product.id);
    expect(productOutput.name).toBe(product.name);
    expect(productOutput.description).toBe(product.description);
    expect(productOutput.price).toBe(product.price);
    expect(productOutput.isActive).toBe(product.isActive);
    expect(productOutput.storeId).toBe(product.storeId);
    expect(productOutput.createdAt).toBe(product.createdAt);
    expect(productOutput.updatedAt).toBe(product.updatedAt);
  });
});
