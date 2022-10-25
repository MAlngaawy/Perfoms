import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "app/configs/dataService";
import { User, UserSignup } from "../types/user-types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: ({ query, mutation }) => ({
    user: query<User, any>({
      query: () => `auth`,
    }),
    signup: mutation<UserSignup, UserSignup>({
      query: (body) => ({
        url: "/user-generals/register/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUserQuery ,useSignupMutation} = userApi;
