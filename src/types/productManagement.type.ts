export interface TProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  inStock: boolean;
  imageUrl?: string;

  createdAt: string; // ISO string for date
  updatedAt: string; // ISO string for date
}

export interface TProductResponse {
  data: TProduct[];
  success: boolean;
  message: string;
}

export interface TProductState {
  products: TProduct[];
  loading: boolean;
  error: string | null;
}

export interface TProductAction {
  type: string;
  payload: TProduct[];
}
