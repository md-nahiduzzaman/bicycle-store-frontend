import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),

    getOrders: builder.query({
      query: () => "/orders",
    }),

    // verifyOrder: builder.query({
    //   query: (order_id) => ({
    //     url: "/order/verify",
    //     params: { order_id },
    //     method: "GET",
    //   }),
    // }),

    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  // useVerifyOrderQuery,
  useDeleteOrderMutation,
} = orderApi;
