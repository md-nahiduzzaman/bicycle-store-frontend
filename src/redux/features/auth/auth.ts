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

    changePassword: builder.mutation({
      query: (passwordDetails) => ({
        url: "/auth/change-password",
        method: "POST",
        body: passwordDetails,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
} = authApi;
