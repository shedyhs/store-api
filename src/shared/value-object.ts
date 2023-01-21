type ValueObjectError = {
  field: string;
  messages: string[];
};

export abstract class ValueObject<T> {
  private _value: T;
  protected _errors: ValueObjectError;

  constructor(value: T, field: string) {
    this._value = value;
    this._errors = { field, messages: [] };
  }

  get value(): T {
    return this._value;
  }

  get errors(): ValueObjectError {
    return this._errors;
  }

  protected setValue(value: T): void {
    this._value = value;
  }

  hasErrors(): boolean {
    return this._errors.messages.length > 0;
  }

  protected addError(message: string): void {
    this._errors.messages.push(message);
  }
}
