import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (userInfo) => ({
        url: "/products",
        method: "POST",
        body: userInfo,
      }),
    }),

    // Get products with filters and search term
    getProducts: builder.query({
      query: ({
        searchTerm = "",
        filters = {},
      }: {
        searchTerm?: string;
        filters?: any;
      }) => {
        let queryParams = "";

        if (searchTerm) {
          queryParams += `searchTerm=${searchTerm}&`;
        }

        if (filters) {
          if (filters.priceRange) {
            queryParams += `priceRange=${filters.priceRange}&`;
          }
          if (filters.model) {
            queryParams += `model=${filters.model}&`;
          }
          if (filters.brand && filters.brand !== "all") {
            queryParams += `brand=${filters.brand}&`;
          }
          if (filters.category && filters.category !== "all") {
            queryParams += `category=${filters.category}&`;
          }
          if (filters.inStock && filters.inStock !== "all") {
            queryParams += `inStock=${filters.inStock}&`;
          }
        }

        if (queryParams.endsWith("&")) {
          queryParams = queryParams.slice(0, -1);
        }

        return `/products?${queryParams}`;
      },
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...userInfo }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: userInfo,
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
