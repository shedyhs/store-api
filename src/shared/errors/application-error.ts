export namespace ApplicationErrors {
  export class NotFoundError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }

  export class UnauthorizedError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

  export class PaymentRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PaymentRequired';
    }
  }

  export class ForbiddenError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

  export class ConflictError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ConflictError';
    }
  }

  export class PreconditionFailed extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PreconditionFailed';
    }
  }

  export class ExpectationFailed extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ExpectationFailed';
    }
  }

  export class UnprocessableEntity extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnprocessableEntity';
    }
  }

  export class PreconditionRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'PreconditionRequired';
    }
  }

  export class UnavailableForLegalReasons extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'UnavailableForLegalReasons';
    }
  }
}
