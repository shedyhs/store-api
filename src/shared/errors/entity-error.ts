export type TypeEntityError = {
  field: string;
  messages: string[];
};

export class EntityError extends Error {
  constructor(errors: TypeEntityError[]) {
    super(JSON.stringify(errors));
  }
}
