import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { z } from 'zod';
import { IUpdateUserUseCase } from '../usecases/interfaces/update-user.usecase.interface';

export class UpdateUserController extends BaseController {
  constructor(private readonly updateUserUseCase: IUpdateUserUseCase) {
    super();
  }
  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user;
    const { email, username, password } = request.body;

    const result = await this.updateUserUseCase.execute({
      id,
      email,
      password,
      username,
    });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'user',
      action: ['GET', 'DELETE'],
      href: `/users`,
    });

    return { data: response.present, statusCode: HttpStatusCode._200_Ok };
  }
  buildValidator(): z.AnyZodObject {
    return z.object({
      body: z.object({
        email: z.string().optional(),
        password: z.string().optional(),
        username: z.string().optional(),
      }),
      user: z.object({
        id: z.string(),
      }),
    });
  }
}
