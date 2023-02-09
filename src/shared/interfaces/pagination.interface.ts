export interface IPaginateRequest {
  page?: number;
  limit?: number;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface IPaginateResponse<T> {
  total: number;
  page: number;
  limit: number;
  results: T[];
}
