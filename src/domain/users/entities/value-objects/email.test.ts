import { Email } from './email.vo';

describe('Email vo unit test ', () => {
  test('verify if emails is valid', async () => {
    const validPack = ['shedyhs@gmail.com.br', 'shedyhs@gmail.com'];

    const invalidPack = [
      'shedyhs@gmailcom',
      'shedyhsgmail.com',
      'shedyhsgmailcom',
    ];

    validPack.forEach((data) => {
      const email = new Email(data);
      expect(email.hasErrors()).toBeFalsy();
    });

    invalidPack.forEach((data) => {
      const email = new Email(data);
      expect(email.hasErrors()).toBeTruthy();
      expect(email.errors).toHaveProperty('field', 'email');
    });
  });
});
