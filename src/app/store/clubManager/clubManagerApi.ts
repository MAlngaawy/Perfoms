import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  AddEvent,
  Sports,
  TeamPlayers,
  Teams,
} from "../types/clubManager-types";
import { ParentClub, TeamCoaches } from "../types/parent-types";
import { TeamEvents } from "~/app/store/types/parent-types";
import {
  AddTeamCalendar,
  Coaches,
  CoachRequests,
  SuperVisorTeamInfo,
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
  tagTypes: [
    "clubManager",
    "teams",
    "calendar",
    "coaches",
    "events",
    "players",
  ],
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

    adminTeamEvents: query<TeamEvents, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/events/`,
        params,
      }),
      providesTags: ["events"],
    }),

    adminAddEvent: mutation<AddEvent, {}>({
      query: ({ ...body }) => ({
        url: `teams/events/add-event/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["events"],
    }),

    adminTeamInfo: query<
      SuperVisorTeamInfo,
      { team_id: string | undefined; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/`,
        params,
      }),
    }),

    adminTeamPlaers: query<TeamPlayers, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/players/`,
        params,
      }),
      providesTags: ["players"],
    }),

    adminClub: query<ParentClub, { pages?: number }>({
      query: (params) => "my-club/",
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
  useAdminTeamEventsQuery,
  useAdminAddEventMutation,
  useAdminTeamInfoQuery,
  useAdminTeamPlaersQuery,
  useAdminClubQuery,
} = clubManagerApi;
