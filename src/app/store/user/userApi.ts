import { SerializedError } from "./../index";
import {
  AddEducation,
  AddExperince,
  ChangePassword,
  Education,
  Educations,
  NotificationsType,
  OTPVerify,
  SendOtp,
  SignupRes,
  User,
  UserDeviceId,
  UserExperinces,
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
import { ReactNode } from "react";
import { Kpis, Metrics, Pillars } from "../types/supervisor-types";
import { Sports } from "../types/clubManager-types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user-generals`,
    prepareHeaders: BASE_HEADERS,
  }) as BaseQueryFn<string | FetchArgs, unknown, SerializedError, {}>,
  tagTypes: ["Users", "education", "experiences"],
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
          console.log(error);
          //@ts-ignore
          if (error.error.status === 409)
            return window.location.replace(
              //@ts-ignore
              `/verify-otp?userid=${error.error.data.id}`
            );
          showNotification({
            title: "Login Error",
            //@ts-ignore
            message: error.error.data,
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.red[6],
                borderColor: theme.colors.red[6],

                "&::before": { backgroundColor: theme.white },
              },

              title: { color: theme.white },
              description: { color: theme.white },
            }),
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
          eventInstance.emit("SignUp_Success");
        } catch (error: any) {
          showNotification({
            title: "Login Error",
            //@ts-ignore
            message: error.error.data.message,
            styles: (theme) => ({
              root: {
                backgroundColor: theme.colors.red[6],
                borderColor: theme.colors.red[6],

                "&::before": { backgroundColor: theme.white },
              },

              title: { color: theme.white },
              description: { color: theme.white },
            }),
          });
        }
      },
    }),
    notifications: query<NotificationsType, { page?: number }>({
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

    // Fetch Some general data to use in bread crumbs
    generalKpis: query<Kpis, { page?: number }>({
      query: (params) => ({
        url: "kpis/",
      }),
    }),
    generalMetrics: query<Metrics, { page?: number }>({
      query: (params) => ({
        url: "metrics/",
      }),
    }),
    generalPillars: query<Pillars, { page?: number }>({
      query: (params) => ({
        url: "pillars/",
      }),
    }),
    generalSports: query<Sports, { page?: number }>({
      query: (params) => ({
        url: "sports/",
      }),
    }),
    generalTeams: query<Sports, { page?: number }>({
      query: (params) => ({
        url: "teams/",
      }),
    }),

    verifyOtp: mutation<OTPVerify, OTPVerify>({
      query: (body) => ({
        url: "verify-otp/",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //@ts-ignore
          Cookies.set("token", data.access);
          eventInstance.emit("Login_Success");
        } catch (error) {
          showNotification({
            title: "Auth notification",
            //@ts-ignore
            message: `${error.error.data.data} 🤥`,
            color: "red",
          });
        }
      },
    }),

    // Users Profile
    /**Education */
    getUserEducations: query<Educations, {}>({
      query: (params) => ({
        url: "educations",
        params,
      }),
      providesTags: ["education"],
    }),

    addUserEducation: mutation<AddEducation, AddEducation>({
      query: (body) => ({
        url: "educations/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["education"],
    }),

    deleteUserEducation: mutation<Education, { id: number }>({
      query: ({ id, ...params }) => ({
        url: `educations/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["education"],
    }),

    /**Experinces */
    getUserExperiences: query<UserExperinces, {}>({
      query: (params) => ({
        url: "experiances/",
        params,
      }),
      providesTags: ["experiences"],
    }),

    addUserExperiences: mutation<AddExperince, {}>({
      query: (body) => ({
        url: "experiances/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["experiences"],
    }),

    deleteExperiences: mutation<AddExperince, { id: number }>({
      query: ({ id, ...params }) => ({
        url: `experiances/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["experiences"],
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
  useGeneralKpisQuery,
  useGeneralMetricsQuery,
  useGeneralPillarsQuery,
  useGeneralSportsQuery,
  useGeneralTeamsQuery,
  useGetUserEducationsQuery,
  useAddUserEducationMutation,
  useDeleteUserEducationMutation,
  useGetUserExperiencesQuery,
  useAddUserExperiencesMutation,
  useDeleteExperiencesMutation,
} = userApi;
