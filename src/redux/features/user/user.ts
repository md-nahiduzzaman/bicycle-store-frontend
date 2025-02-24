import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users",
      providesTags: ["User"], // 👈 ক্যাশ রিফ্রেশের জন্য
    }),

    blockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/block-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"], // Cache refresh after block/unblock
    }),
  }),
});

export const { useBlockUserMutation, useGetUserQuery } = authApi;
