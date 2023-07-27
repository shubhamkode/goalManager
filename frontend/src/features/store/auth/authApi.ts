import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/v1/api/auth",
  prepareHeaders(headers, api) {
    console.log({ headers, api });
  },
});

export const authApi = createApi({
  baseQuery,
  reducerPath: "authApi",
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: ({}) => ({ url: "/login", method: "POST", body: "" }),
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
