import { ValueObject } from '@/shared/domain/value-object';

export class Price extends ValueObject<number> {
  constructor(value: number) {
    value = Number(value.toFixed(2));
    super(value, 'price');
    this.validate();
  }

  toCents(): number {
    return Number((this.value * 100).toFixed(0));
  }

  validate() {
    if (this.value < 0) {
      this.addError('price must be greater or equal to 0');
    }
  }
}
