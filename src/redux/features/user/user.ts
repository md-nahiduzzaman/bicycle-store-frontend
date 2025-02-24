import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users",
      providesTags: ["Customer"],
    }),

    blockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/block-user/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const { useBlockUserMutation, useGetUserQuery } = authApi;
