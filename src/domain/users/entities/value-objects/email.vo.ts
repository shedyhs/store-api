import { ValueObject } from '@/shared/value-object';
import validator from 'validator';

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
