export type ProductDAO = {
  id: string;
  name: string;
  price: number;
  description?: string;
  is_active: boolean;
  store_id: string;
  created_at: Date;
  updated_at: Date;
};
