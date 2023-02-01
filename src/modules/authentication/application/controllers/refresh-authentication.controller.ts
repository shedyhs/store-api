import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { IRefreshAuthenticationUseCase } from '../usecases/interfaces/refresh-authentication.usecase.interface';

export class RefreshAuthenticationController extends BaseController {
  constructor(
    private readonly refreshAuthenticationUseCase: IRefreshAuthenticationUseCase,
  ) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { Authorization: accessToken } = request.headers;
    const { refreshToken } = request.body;

    const result = await this.refreshAuthenticationUseCase.execute({
      accessToken,
      refreshToken,
    });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'user',
      href: `/users/${result.user.id}`,
      action: ['GET'],
    });

    return {
      data: response.present,
      statusCode: HttpStatusCode._200_Ok,
    };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      body: z.object({
        refreshToken: z.string(),
      }),
      headers: z.object({
        Authorization: z.string(),
      }),
    });
  }
}
