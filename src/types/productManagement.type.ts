export interface TProduct {
  _id: string;
  name: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  inStock: boolean;
  img?: string;

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

export interface TFilters {
  searchTerm?: string;
  priceRange?: string; // e.g., "0-100", "100-500"
  model?: string;
  brand?: string;
  category?: string;
  availability?: string; // e.g., "in_stock", "out_of_stock"
}
