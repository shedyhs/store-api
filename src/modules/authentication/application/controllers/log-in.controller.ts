import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { ILogInUseCase } from '../usecases/interfaces/log-in.usecase.interface';

export class LogInController extends BaseController {
  constructor(private readonly logInUseCase: ILogInUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;

    const result = await this.logInUseCase.execute({ email, password });

    const response = new ResponsePresenter(request, result);

    response.addLink({
      rel: 'user',
      href: `/users/${result.user.id}`,
      action: ['GET'],
    });

    return { data: response.present, statusCode: HttpStatusCode._201_Created };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
    });
  }
}
