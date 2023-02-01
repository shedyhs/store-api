import { BaseController } from '@/shared/application/base-controller';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { ILogOutUseCase } from '../usecases/interfaces/log-out-usecase.interface';

export class LogOutController extends BaseController {
  constructor(private readonly logOutUseCase: ILogOutUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id: userId } = request.user;
    const { refreshToken } = request.body;

    await this.logOutUseCase.execute({ userId, refreshToken });

    return { data: undefined, statusCode: HttpStatusCode._204_NoContent };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      body: z.object({
        refreshToken: z.string(),
      }),
      user: z.object({
        id: z.string(),
      }),
    });
  }
}
