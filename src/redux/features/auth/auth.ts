import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    register: builder.mutation({
      query: (userDetails) => ({
        url: "/auth/register",
        method: "POST",
        body: userDetails,
      }),
    }),

    updatePassword: builder.mutation({
      query: (passwordDetails) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body: passwordDetails,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
} = authApi;
