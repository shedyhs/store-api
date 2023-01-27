import { ValueObject } from '@/shared/domain/value-object';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

export class Password extends ValueObject<string> {
  private salts = 8;
  private passwordRules = {
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  };

  constructor(password: string, hashed = false) {
    super(password, 'password');
    this.validate();
    if (!hashed) {
      this.setValue(this.hashPassword(password));
    }
  }

  validate() {
    if (this.value.length < this.passwordRules.minLength) {
      this.addError(
        `Password must have at least ${this.passwordRules.minLength} characters`,
      );
    }
    const hasNumber = /\d/;
    if (!this.value.match(hasNumber)) {
      this.addError('Password must have at least one number');
    }
    const hasSpecialCharacter = /([\W_])+/;
    if (!this.value.match(hasSpecialCharacter)) {
      this.addError('Password must have at least one special character');
    }
    const hasLowercase = /[a-z]/;
    if (!this.value.match(hasLowercase)) {
      this.addError('Password must have at least one lowercase letter');
    }
    const hasUppercase = /[A-Z]/;
    if (!this.value.match(hasUppercase)) {
      this.addError('Password must have at least one uppercase letter');
    }

    if (!validator.isStrongPassword(this.value, this.passwordRules)) {
      this.addError('Password is too weak');
    }
  }

  private hashPassword(password: string): string {
    return bcryptjs.hashSync(password, this.salts);
  }

  public compare(password: string): boolean {
    return bcryptjs.compareSync(password, this.value);
  }
}
