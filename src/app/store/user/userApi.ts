import { SerializedError } from "./../index";
import {
  Achievement,
  AddAchievements,
  AddCourse,
  AddEducation,
  AddExperince,
  AddQualification,
  ChangePassword,
  ClubTeams,
  Course,
  Courses,
  Education,
  Educations,
  NotificationsType,
  OTPVerify,
  playerEvents,
  Qualification,
  Qualifications,
  ResetPassword,
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
import { Sports, Teams } from "../types/clubManager-types";
import { UserAchievements } from "~/app/store/types/user-types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/user-generals`,
    prepareHeaders: BASE_HEADERS,
  }) as BaseQueryFn<string | FetchArgs, unknown, SerializedError, {}>,
  tagTypes: [
    "Users",
    "education",
    "experiences",
    "courses",
    "qualifications",
    "achievements",
    "kpis",
    "player",
  ],
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

    readNotifications: query<{}, { page?: number }>({
      query: (params) => ({
        url: "read-notifications/",
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
    clubTeams: query<ClubTeams, { club_id: number | string; page?: number }>({
      query: ({ club_id, ...params }) => ({
        url: `club-teams/${club_id}`,
      }),
    }),
    //OTP verify
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
          // eventInstance.emit("Login_Success");
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

    getCoachEducations: query<
      Educations,
      { coach_id: number | string | undefined }
    >({
      query: ({ coach_id, ...params }) => ({
        url: `${coach_id}/educations`,
      }),
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

    getCoachExperiences: query<
      UserExperinces,
      { coach_id: number | string | undefined }
    >({
      query: ({ coach_id, ...params }) => ({
        url: `${coach_id}/experiances`,
      }),
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

    getUserCourses: query<Courses, { page?: number }>({
      query: (params) => ({
        url: "courses/",
      }),
      providesTags: ["courses"],
    }),

    getCoachCourses: query<Courses, { coach_id: number | string | undefined }>({
      query: ({ coach_id, ...params }) => ({
        url: `${coach_id}/courses`,
      }),
    }),

    addUserCourses: mutation<AddCourse, {}>({
      query: (body) => ({
        url: "courses/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["courses"],
    }),

    deleteCourse: mutation<Course, { id: number }>({
      query: ({ id }) => ({
        url: `courses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["courses"],
    }),

    getUserQualifications: query<Qualifications, { page?: number }>({
      query: (params) => ({
        url: "qualifications/",
      }),
      providesTags: ["qualifications"],
    }),

    getCoachQualifications: query<
      Qualifications,
      { coach_id: number | string | undefined }
    >({
      query: ({ coach_id, ...params }) => ({
        url: `${coach_id}/qualifications`,
      }),
    }),

    addUserQualifications: mutation<AddQualification, {}>({
      query: (body) => ({
        url: "qualifications/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["qualifications"],
    }),

    deleteQualifications: mutation<Qualification, { id: number }>({
      query: ({ id }) => ({
        url: `qualifications/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["qualifications"],
    }),

    /**Handle User Achievements */

    getUserAchievements: query<UserAchievements, { page?: number }>({
      query: (params) => ({
        url: "achievements/",
      }),
      providesTags: ["achievements"],
    }),

    getCoachAchievements: query<
      UserAchievements,
      { coach_id: number | string | undefined }
    >({
      query: ({ coach_id, ...params }) => ({
        url: `${coach_id}/achievements`,
      }),
    }),

    addUserAchievements: mutation<AddAchievements, {}>({
      query: (body) => ({
        url: "achievements/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["achievements"],
    }),

    deleteAchievements: mutation<Achievement, { id: number }>({
      query: ({ id }) => ({
        url: `achievements/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["achievements"],
    }),

    resetPassword: mutation<ResetPassword, ResetPassword>({
      query: (body) => ({
        url: "reset-password/",
        method: "PATCH",
        body,
      }),
    }),

    playerEvents: query<playerEvents, { player_id: string | undefined }>({
      query: ({ player_id }) => ({
        url: `player-events/${player_id}/`,
      }),
    }),

    playerEducation: query<Educations, { player_id: string | undefined }>({
      query: ({ player_id }) => ({
        url: `player-educations/${player_id}/`,
      }),
      providesTags: ["player"],
    }),

    addPlayerEducation: mutation<
      AddEducation,
      { player_id: number | undefined }
    >({
      query: ({ player_id, ...body }) => ({
        url: `player-educations/${player_id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["player"],
    }),
  }),
});

export const {
  useUserQuery,
  useSigninMutation,
  useSignupMutation,
  useChangePasswordMutation,
  useNotificationsQuery,
  useReadNotificationsQuery,
  useSendOtpMutation,
  useUserDeviceIdMutation,
  useUpdateProfileMutation,
  useVerifyOtpMutation,
  useGeneralKpisQuery,
  useGeneralMetricsQuery,
  useGeneralPillarsQuery,
  useGeneralSportsQuery,
  useGeneralTeamsQuery,
  useClubTeamsQuery,
  useGetUserEducationsQuery,
  useGetCoachEducationsQuery,
  useAddUserEducationMutation,
  useDeleteUserEducationMutation,
  useGetUserExperiencesQuery,
  useGetCoachExperiencesQuery,
  useAddUserExperiencesMutation,
  useDeleteExperiencesMutation,
  useGetUserCoursesQuery,
  useGetCoachCoursesQuery,
  useAddUserCoursesMutation,
  useDeleteCourseMutation,
  useGetUserQualificationsQuery,
  useGetCoachQualificationsQuery,
  useAddUserQualificationsMutation,
  useDeleteQualificationsMutation,
  useGetUserAchievementsQuery,
  useGetCoachAchievementsQuery,
  useAddUserAchievementsMutation,
  useDeleteAchievementsMutation,
  useResetPasswordMutation,
  usePlayerEventsQuery,
  usePlayerEducationQuery,
  useAddPlayerEducationMutation,
} = userApi;
