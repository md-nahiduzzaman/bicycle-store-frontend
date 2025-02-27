/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
    }),

    // Get products with filters and search term
    getProducts: builder.query({
      query: ({
        searchTerm = "",
        filters = { type: "all", brand: "all", inStock: "all" },
      }: {
        searchTerm?: string;
        filters?: { type: string; brand: string; inStock: string };
      }) => {
        const queryParams = new URLSearchParams();

        if (searchTerm) {
          queryParams.append("searchTerm", searchTerm);
        }

        if (filters.brand && filters.brand !== "all") {
          queryParams.append("brand", filters.brand);
        }
        if (filters.type && filters.type !== "all") {
          queryParams.append("type", filters.type);
        }
        if (filters.inStock && filters.inStock !== "all") {
          queryParams.append("inStock", filters.inStock);
        }

        return `/products?${queryParams.toString()}`;
      },
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...productInfo }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productInfo,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
