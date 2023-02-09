import { BaseController } from '@/shared/application/base-controller';
import { ResponsePresenter } from '@/shared/application/response-presenter';
import { HttpRequest, HttpResponse } from '@/shared/interfaces/http';
import { AnyZodObject, z } from 'zod';
import { IShowAllProductsUseCase } from '../usecases/interfaces/show-all-products.usecase.interface';

export class ShowAllProductsController extends BaseController {
  constructor(
    private readonly showAllProductsUseCase: IShowAllProductsUseCase,
  ) {
    super();
  }

  async perform(request: HttpRequest): Promise<HttpResponse> {
    const { limit, page, sortField, sortOrder, fieldFilter, valueFilter } =
      request.query;
    const { storeId } = request.params;

    const result = await this.showAllProductsUseCase.execute({
      fieldFilter,
      valueFilter,
      limit,
      page,
      sortField,
      sortOrder,
      storeId,
    });

    const response = new ResponsePresenter(request, result);
    response.addLink({
      rel: 'store',
      href: `/stores/${storeId}`,
      action: ['GET'],
    });

    return { data: response.present, statusCode: 200 };
  }

  buildValidator(): AnyZodObject {
    return z.object({
      query: z
        .object({
          limit: z.string().regex(/ˆ\d+?/).optional(),
          page: z.string().regex(/ˆ\d+?/).optional(),
          sortField: z.string().optional(),
          sortOrder: z.enum(['ASC', 'DESC']).optional(),
          filter: z.string().optional(),
        })
        .optional(),
      params: z.object({
        storeId: z.string(),
      }),
    });
  }
}
