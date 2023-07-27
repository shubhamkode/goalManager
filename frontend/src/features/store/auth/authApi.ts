import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User } from "@/features/models/User";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/v1/api/auth",
});

export const authApi = createApi({
  baseQuery,
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    userLogin: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    userRegister: builder.mutation<
      { token: string },
      { name: string; email: string; password: string }
    >({
      query: ({ ...formData }) => ({
        url: "/",
        method: "POST",
        body: { ...formData },
      }),
    }),
    getMe: builder.query<User, { userToken: string | null }>({
      query: ({ userToken }) => {
        return {
          url: "/me",
          headers: { Authorization: `Bearer ${userToken}` },
        };
      },
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useGetMeQuery } =
  authApi;
