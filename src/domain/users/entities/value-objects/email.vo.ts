import validator from 'validator';
import { ValueObject } from '@/shared/value-object';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value, 'email');
    this.validate();
  }

  validate() {
    if (!validator.isEmail(this.value)) {
      this.addError('Email is not valid');
    }
  }
}
