import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { z } from 'zod';
import { IUpdateStoreUseCase } from '../usecases/interfaces/update-store.usecase.interface';

export class UpdateStoreController extends BaseController {
  constructor(private readonly updateStoreUseCase: IUpdateStoreUseCase) {
    super();
  }
  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id: userId } = request.user;
    const { name } = request.body;

    const result = await this.updateStoreUseCase.execute({
      userId,
      name,
    });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'store',
      action: ['DELETE'],
      href: `/stores`,
    });

    response.addLink({
      rel: 'store',
      action: ['GET'],
      href: `/stores/${result.id}`,
    });

    response.addLink({
      rel: 'user',
      action: ['GET'],
      href: `/users`,
    });

    return { data: response.present, statusCode: HttpStatusCode._200_Ok };
  }
  buildValidator(): z.AnyZodObject {
    return z.object({
      body: z.object({
        name: z.string().optional(),
      }),
      user: z.object({
        id: z.string(),
      }),
    });
  }
}
