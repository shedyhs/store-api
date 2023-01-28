import { BaseController } from '@/shared/application/base-controller';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { IDeleteUserUseCase } from '../usecases/interfaces/delete-user.usecase.interface';

export class DeleteUserController extends BaseController {
  constructor(private readonly deleteUserUseCase: IDeleteUserUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.user;
    await this.deleteUserUseCase.execute({ id });

    return { data: undefined, statusCode: HttpStatusCode._204_NoContent };
  }
  buildValidator(): AnyZodObject {
    return z.object({
      user: z.object({
        id: z.string(),
      }),
    });
  }
}
