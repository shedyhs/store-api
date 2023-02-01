import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { AnyZodObject, z } from 'zod';
import { IShowStoreUseCase } from '../usecases/interfaces/show-store.usecase.interface';

export class ShowStoreController extends BaseController {
  constructor(private readonly showStoreUseCase: IShowStoreUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    const result = await this.showStoreUseCase.execute({
      id,
    });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'store',
      href: '/store',
      action: ['PUT', 'DELETE'],
    });

    response.addLink({
      rel: 'user',
      href: `/users/${result.userId}`,
      action: ['GET'],
    });

    return { data: response.present, statusCode: 200 };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      params: z.object({
        id: z.string(),
      }),
    });
  }
}
