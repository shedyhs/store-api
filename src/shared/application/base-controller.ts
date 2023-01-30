import { AnyZodObject } from 'zod';
import { DomainError } from '../errors/domain-error';
import { HttpRequest, HttpResponse } from '../interfaces/http';
import { HttpStatusCode } from '../interfaces/http-status-codes';
import { ServerErrors } from '../errors/server-error';
import { ApplicationErrors } from '../errors/application-error';

export abstract class BaseController {
  abstract perform(request: HttpRequest): Promise<HttpResponse>;

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validate(request);
      if (error) {
        return error;
      }
      const response = await this.perform(request);
      return response;
    } catch (err) {
      const error = err as Error;

      switch (error.constructor) {
        case DomainError:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._400_BadRequest,
          };
        case ApplicationErrors.UnauthorizedError:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._401_Unauthorized,
          };
        case ApplicationErrors.PaymentRequired:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._402_PaymentRequired,
          };
        case ApplicationErrors.ForbiddenError:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._403_Forbidden,
          };
        case ApplicationErrors.NotFoundError:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._404_NotFound,
          };
        case ApplicationErrors.ConflictError:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._409_Conflict,
          };
        case ApplicationErrors.PreconditionFailed:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._412_PreconditionFailed,
          };
        case ApplicationErrors.ExpectationFailed:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._417_ExpectationFailed,
          };
        case ApplicationErrors.UnprocessableEntity:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._422_UnprocessableEntity,
          };
        case ApplicationErrors.PreconditionRequired:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._428_PreconditionRequired,
          };
        case ApplicationErrors.UnavailableForLegalReasons:
          return {
            data: { error: error.message },
            statusCode: HttpStatusCode._451_UnavailableForLegalReasons,
          };

        case ServerErrors.NotImplemented:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._500_InternalServerError,
          };
        case ServerErrors.BadProvider:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._502_BadProvider,
          };
        case ServerErrors.ServiceUnavailable:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._503_ServiceUnavailable,
          };
        case ServerErrors.ProviderTimeout:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._504_ProviderTimeout,
          };
        case ServerErrors.HTTPVersionNotSupported:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._505_HttpVersionNotSupported,
          };
        case ServerErrors.VariantAlsoNegotiates:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._506_VariantAlsoNegotiates,
          };
        case ServerErrors.InsufficientStorage:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._507_InsufficientStorage,
          };
        case ServerErrors.NetworkAuthenticationRequired:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._511_NetworkAuthenticationRequired,
          };
        case ServerErrors.NetworkConnectionTimeoutError:
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._599_NetworkConnectionTimeoutError,
          };
        default:
          // eslint-disable-next-line no-console
          console.error(error);
          return {
            data: { error: 'Internal Server Error' },
            statusCode: HttpStatusCode._500_InternalServerError,
          };
      }
    }
  }

  abstract buildValidator(): AnyZodObject;

  validate(request: HttpRequest): HttpResponse | undefined {
    const schema = this.buildValidator();
    const validation = schema.safeParse(request);
    const errors: string[] = [];
    if (!validation.success) {
      validation.error.issues.map((issue) =>
        errors.push(`${issue.message} at ${issue.path.join('.')}`),
      );
      return {
        data: { errors },
        statusCode: HttpStatusCode._400_BadRequest,
      };
    }
    return undefined;
  }
}
