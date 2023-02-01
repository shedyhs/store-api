import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { ICreateStoreUseCase } from '../usecases/interfaces/create-store.usecase.interface';

export class CreateStoreController extends BaseController {
  constructor(private readonly createStoreUseCase: ICreateStoreUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { name } = request.body;
    const { id: userId } = request.user;

    const result = await this.createStoreUseCase.execute({ name, userId });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'store',
      href: `/stores/${result.id}`,
      action: ['GET'],
    });

    response.addLink({
      rel: 'store',
      href: '/stores',
      action: ['PUT', 'DELETE'],
    });

    response.addLink({
      rel: 'user',
      href: '/users',
      action: ['GET'],
    });

    return { data: response.present, statusCode: HttpStatusCode._201_Created };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      body: z.object({
        name: z.string(),
      }),
      user: z.object({
        id: z.string(),
      }),
    });
  }
}
