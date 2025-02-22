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

    getProducts: builder.query({
      query: () => "/products",
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
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} = productApi;
