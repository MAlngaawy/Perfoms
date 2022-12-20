import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { Sports, Teams } from "../types/clubManager-types";
import { TeamCoaches } from "../types/parent-types";
import {
  AddTeamCalendar,
  Coaches,
  CoachRequests,
  Team,
  TeamAttendance,
  TeamCoach,
} from "../types/supervisor-types";

export const clubManagerApi = createApi({
  reducerPath: "clubManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/club-manager`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["clubManager", "teams", "calendar", "coaches"],
  endpoints: ({ query, mutation }) => ({
    manageCoachesRequests: query<CoachRequests, { page?: number }>({
      query: (params) => ({ url: "coaches/requests", params }),
      providesTags: ["clubManager"],
    }),

    adminSports: query<Sports, { page?: number }>({
      query: (params) => ({ url: "sports/", params }),
      providesTags: ["clubManager"],
    }),

    adminTeams: query<Teams, { page?: number }>({
      query: (params) => ({ url: "teams/", params }),
      providesTags: ["teams"],
    }),

    adminDeleteTeam: mutation<{}, { team_id: number }>({
      query: ({ team_id, ...body }) => ({
        url: `teams/${team_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["teams"],
    }),

    adminAddNewTeam: mutation<Team, { sport_id: number | string | undefined }>({
      query: ({ sport_id, ...body }) => ({
        url: `teams/${sport_id}/add-team/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["teams"],
    }),

    adminTeamAttendance: query<
      TeamAttendance,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/attendance/`,
        params,
      }),
      providesTags: ["calendar"],
    }),

    adminAddTeamCalendar: mutation<AddTeamCalendar, {}>({
      query: (body) => ({
        url: `teams/add-team-calender/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["calendar"],
    }),

    adminTeamCoaches: query<TeamCoaches, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/coaches/`,
        params,
      }),
      providesTags: ["coaches"],
    }),

    adminRemoveTeamCoach: mutation<TeamCoach, {}>({
      query: ({ ...body }) => ({
        url: `teams/remove-team-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["coaches"],
    }),

    adminAllCoaches: query<Coaches, { page?: number }>({
      query: (params) => ({ url: "users/coaches/", params }),
      providesTags: ["coaches"],
    }),

    adminAddTeamCoaches: mutation<TeamCoach, {}>({
      query: ({ ...body }) => ({
        url: `teams/add-team-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["coaches"],
    }),
  }),
});

export const {
  useManageCoachesRequestsQuery,
  useAdminSportsQuery,
  useAdminTeamsQuery,
  useAdminDeleteTeamMutation,
  useAdminAddNewTeamMutation,
  useAdminTeamAttendanceQuery,
  useAdminAddTeamCalendarMutation,
  useAdminTeamCoachesQuery,
  useAdminRemoveTeamCoachMutation,
  useAdminAllCoachesQuery,
  useAdminAddTeamCoachesMutation,
} = clubManagerApi;
