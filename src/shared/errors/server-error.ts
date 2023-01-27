export namespace ServerErrors {
  export class InternalServerError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'InternalServerError';
    }
  }

  export class NotImplemented extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotImplemented';
    }
  }

  export class BadProvider extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'BadProvider';
    }
  }

  export class ServiceUnavailable extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ServiceUnavailable';
    }
  }
  export class ProviderTimeout extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'ProviderTimeout';
    }
  }
  export class HTTPVersionNotSupported extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'HTTPVersionNotSupported';
    }
  }
  export class VariantAlsoNegotiates extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'VariantAlsoNegotiates';
    }
  }

  export class InsufficientStorage extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'InsufficientStorage';
    }
  }

  export class LoopDetected extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'LoopDetected';
    }
  }

  export class NotExtended extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NotExtended';
    }
  }

  export class NetworkAuthenticationRequired extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NetworkAuthenticationRequired';
    }
  }

  export class NetworkConnectionTimeoutError extends Error {
    constructor(message?: string) {
      super(message);
      this.name = 'NetworkConnectionTimeoutError';
    }
  }
}
