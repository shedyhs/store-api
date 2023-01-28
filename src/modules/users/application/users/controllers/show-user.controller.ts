import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { IShowUserUseCase } from '../usecases/interfaces/show-user.usecase.interface';

export class ShowUserController extends BaseController {
  constructor(private readonly showUserUseCase: IShowUserUseCase) {
    super();
  }
  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user;
    const result = await this.showUserUseCase.execute({ id });
    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'users',
      action: ['DELETE', 'PUT'],
      href: `/user/${result.id}`,
    });

    return { data: response.present, statusCode: HttpStatusCode._200_Ok };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      user: z.object({
        id: z.string(),
      }),
    });
  }
}
