import { BaseController } from '@/shared/application/base-controller';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { HttpStatusCode } from '@/shared/interfaces/http-status-codes';
import { AnyZodObject, z } from 'zod';
import { IDeleteStoreUseCase } from '../usecases/interfaces/delete-store.usecase.interface';

export class DeleteStoreController extends BaseController {
  constructor(private readonly deleteStoreUseCase: IDeleteStoreUseCase) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { id: userId } = request.user;

    await this.deleteStoreUseCase.execute({ userId });

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
