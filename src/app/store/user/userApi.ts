import { SerializedError } from "./../index";
import {
  ChangePassword,
  NotificationsType,
  OTPVerify,
  SendOtp,
  SignupRes,
  User,
  UserDeviceId,
} from "./../types/user-types";
import { eventInstance } from "~/@main/utils/AppUtils";
import { showNotification } from "@mantine/notifications";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
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
  }) as BaseQueryFn<string | FetchArgs, unknown, SerializedError, {}>,
  tagTypes: ["Users"],
  endpoints: ({ query, mutation }) => ({
    user: query<User, any>({
      query: () => `profile/`,
      providesTags: ["Users"],
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
          Cookies.set("token", data.access);
          eventInstance.emit("Login_Success");
        } catch (error) {
          showNotification({
            title: "Auth notification",
            //@ts-ignore
            message: `${error.error.message} 🤥`,
            color: "red",
          });
        }
      },
    }),
    signup: mutation<SignupRes, UserSignup>({
      query: (body) => ({
        url: "register/",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("token", data?.data.access);
          eventInstance.emit("SignUp_Success");
        } catch (error) {
          showNotification({
            title: "Auth notification",
            //@ts-ignore
            message: `${error.error.message} 🤥`,
            color: "red",
          });
        }
      },
    }),
    notifications: query<NotificationsType, { page: number }>({
      query: (params) => ({
        url: "notifications/",
        params,
      }),
    }),
    sendOtp: mutation<SendOtp, SendOtp>({
      query: (body) => ({
        url: "send-otp/",
        method: "POST",
        body,
      }),
    }),
    changePassword: mutation<null, ChangePassword>({
      query: (body) => ({
        url: "change-password/",
        method: "PATCH",
        body,
      }),
    }),
    updateProfile: mutation<User, Partial<User>>({
      query: (body) => ({
        url: "update-profile/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    userDeviceId: mutation<UserDeviceId, UserDeviceId>({
      query: (body) => ({
        url: "user-device-id/",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: mutation<OTPVerify, OTPVerify>({
      query: (body) => ({
        url: "verify-otp/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUserQuery,
  useSigninMutation,
  useSignupMutation,
  useChangePasswordMutation,
  useNotificationsQuery,
  useSendOtpMutation,
  useUserDeviceIdMutation,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
} = userApi;
