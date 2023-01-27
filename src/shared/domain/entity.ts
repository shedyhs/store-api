import { randomUUID } from 'node:crypto';

type EntityError = { field: string; messages: string[] };

export abstract class Entity {
  protected _id: string;
  protected _errors: EntityError[];
  constructor(id?: string) {
    this._id = id ?? randomUUID();
    this._errors = [];
  }

  abstract validate(): void;

  addError(errors: EntityError) {
    this._errors.push(errors);
  }

  hasError(): boolean {
    return this._errors.length > 0;
  }

  get errors(): EntityError[] {
    return this._errors;
  }

  get id(): string {
    return this._id;
  }
}
