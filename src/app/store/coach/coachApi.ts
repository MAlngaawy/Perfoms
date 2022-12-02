import {
  CoachPlayerInfo,
  CoachTeamAttendance,
  CoachTeamPerformance,
  PlayerParent,
  SendBulkNotifications,
  sendNotifications,
  Team,
  TeamAttendanceDays,
  TeamPerformanceMetrics,
  UpdatePlayerPKM,
} from "./../types/coach-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  AllCoachesType,
  GeneratePdfDocs,
  GetMyTeams,
} from "../types/coach-types";
import { TeamPlayers } from "../types/clubManager-types";
import { Attendance, UpdateAttendance } from "../types/attendance-types";

export const coachApi = createApi({
  reducerPath: "coachApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/coach`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Attendance", "performances"],
  endpoints: ({ query, mutation }) => ({
    coaches: query<AllCoachesType, { page: number }>({
      query: (params) => ({ url: "all-coaches/", params }),
    }),
    myTeams: query<GetMyTeams, null>({
      query: () => "my-teams/",
    }),
    teamDetails: query<Team, number>({
      query: (id) => `team-details/${id}/`,
    }),
    generateDoc: mutation<GeneratePdfDocs, GeneratePdfDocs>({
      query: (body) => ({
        url: "generate-doc/",
        method: "POST",
        body,
      }),
    }),
    sendBulkNotifications: mutation<
      SendBulkNotifications,
      SendBulkNotifications
    >({
      query: (body) => ({
        url: "send-bulk-notification/",
        method: "POST",
        body,
      }),
    }),

    sendNotifications: mutation<sendNotifications, sendNotifications>({
      query: (body) => ({
        url: "send-notification/",
        method: "POST",
        body,
      }),
    }),

    updatePlayerPKM: mutation<UpdatePlayerPKM, UpdatePlayerPKM>({
      query: ({ id, team_id, ...body }) => ({
        url: `update-player-pkm/${id}/${team_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["performances"],
    }),
    GetTeamPlayers: query<TeamPlayers, { team_id: number; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/players`,
        params,
      }),
    }),

    getPlayerInfo: query<
      CoachPlayerInfo,
      { player_id: string | undefined; page?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `player-info/${player_id}/`,
        params,
      }),
    }),

    getParentInfo: query<
      PlayerParent,
      { player_id: string | undefined; page?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `parent-info/${player_id}/`,
        params,
      }),
    }),

    GetTeamAttendance: query<
      CoachTeamAttendance,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-attendance/${team_id}`,
        params,
      }),
      providesTags: ["Attendance"],
    }),
    coachUpdateAttendance: mutation<Attendance, UpdateAttendance>({
      query: ({ id, ...body }) => ({
        url: `update-attendance-day/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    getTeamPerformances: query<
      CoachTeamPerformance,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-performance/${team_id}`,
        params,
      }),
      providesTags: ["performances"],
    }),

    teamAttendanceDays: query<
      TeamAttendanceDays,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-attendance-days/${team_id}`,
        params,
      }),
    }),

    teamPerformanceMetrics: query<
      TeamPerformanceMetrics,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-performance-metrics/${team_id}`,
        params,
      }),
    }),
  }),
});

//CoachTeamPerformance

export const {
  useCoachesQuery,
  useGenerateDocMutation,
  useMyTeamsQuery,
  useSendBulkNotificationsMutation,
  useSendNotificationsMutation,
  useTeamDetailsQuery,
  useUpdatePlayerPKMMutation,
  useGetTeamPlayersQuery,
  useGetTeamAttendanceQuery,
  useCoachUpdateAttendanceMutation,
  useGetTeamPerformancesQuery,
  useGetPlayerInfoQuery,
  useGetParentInfoQuery,
  useTeamAttendanceDaysQuery,
  useTeamPerformanceMetricsQuery,
} = coachApi;
