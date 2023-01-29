import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { z } from 'zod';
import { ICreateUserUseCase } from '../usecases/interfaces/create-user.usecase.interface';

export class CreateUserController extends BaseController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { email, username, password, id } = request.body;

    const result = await this.createUserUseCase.execute({
      email,
      username,
      password,
      id,
    });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      action: ['DELETE', 'GET', 'PUT'],
      href: `{baseUrl}/users/${result.id}`,
      rel: 'user',
    });

    return { data: response.present, statusCode: HttpStatusCode._200_Ok };
  }

  buildValidator(): z.AnyZodObject {
    return z.object({
      body: z.object({
        id: z.string().optional(),
        email: z.string(),
        username: z.string(),
        password: z.string(),
      }),
    });
  }
}
