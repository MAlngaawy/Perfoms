import { eventInstance } from "@main/utils/AppUtils";
import { showNotification } from "@mantine/notifications";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "app/configs/dataService";
import Cookies from "js-cookie";
import {
  LoginResponse,
  LoginUserBody,
  ProfileResponse,
  UserSignup,
} from "../types/user-types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user-generals`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Users"],
  endpoints: ({ query, mutation }) => ({
    user: query<ProfileResponse, any>({
      query: () => `profile/`,
    }),
    signin: mutation<LoginResponse, LoginUserBody>({
      query: (body) => ({
        url: "login/",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("token", data?.data.access);
          eventInstance.emit("Login_Success");
        } catch (error) {
          showNotification({
            title: "Auth notification",
            //@ts-ignore
            message: `${error.error.data.message} 🤥`,
            color: "red",
          });
        }
      },
    }),
    signup: mutation<UserSignup, UserSignup>({
      query: (body) => ({
        url: "register/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUserQuery, useSigninMutation, useSignupMutation } = userApi;
