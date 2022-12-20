import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { Sports, Teams } from "../types/clubManager-types";
import {
  AddTeamCalendar,
  CoachRequests,
  Team,
  TeamAttendance,
} from "../types/supervisor-types";

export const clubManagerApi = createApi({
  reducerPath: "clubManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/club-manager`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["clubManager", "teams", "calendar"],
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
} = clubManagerApi;
