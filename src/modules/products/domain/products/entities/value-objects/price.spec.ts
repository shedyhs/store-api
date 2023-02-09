import { describe, expect, test } from 'vitest';
import { Price } from './price.vo';

describe('Price vo unit test ', () => {
  test('verify if prices is valid', async () => {
    const validPack = [10, 10.12, 10.12345];

    const invalidPack = [-1, -1.1234];

    validPack.forEach((data) => {
      const price = new Price(data);
      expect(price.hasErrors()).toBeFalsy();
    });

    invalidPack.forEach((data) => {
      const price = new Price(data);
      expect(price.hasErrors()).toBeTruthy();
      expect(price.errors).toHaveProperty('field', 'price');
    });
  });

  test('toCents', () => {
    const price = new Price(10.123);
    const priceInCents = price.toCents();
    expect(priceInCents).toBe(1012);
  });
});
