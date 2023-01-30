import { describe, expect, test } from 'vitest';
import { Password } from './password.vo';

describe('Password vo unit test', () => {
  test('validate if value is valid', () => {
    const validPack = [
      'Password!2',
      'V4al!dValue',
      'Potato#1923',
      'Pot_ato#!12',
    ];

    const invalidPack = [
      '',
      'nouppercase',
      'Nonumber',
      'nosize',
      'N0specialchar',
      'Invalid',
    ];

    validPack.forEach((data) => {
      const password = new Password(data);
      expect(password.hasErrors()).toBeFalsy();
    });

    invalidPack.forEach((data) => {
      const password = new Password(data);
      expect(password.hasErrors()).toBeTruthy();
      expect(password.errors).toHaveProperty('field', 'password');
    });
  });

  test('validate if compare is working fine', () => {
    const password = new Password('Pa$$w0rd');

    expect(password.compare('Pa$$w0rd')).toBeTruthy();
    expect(password.compare('invalidPassword')).toBeFalsy();
  });
});
