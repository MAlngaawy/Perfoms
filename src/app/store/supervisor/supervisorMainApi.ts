import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  ClubManagerSport,
  CoachesRequests,
  TeamPlayers,
  Teams,
} from "../types/clubManager-types";
import { UpdateAttendance } from "../types/coach-types";
import { TeamCoaches, TeamEvents } from "../types/parent-types";
import { ParentClub } from "~/app/store/types/parent-types";
import {
  AddAction,
  AddRecommendation,
  CoachRequests,
  kpi,
  Kpis,
  Metrics,
} from "../types/supervisor-types";

export const supervisorApi = createApi({
  reducerPath: "supervisorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/supervisor`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["supervisor"],
  endpoints: ({ query, mutation }) => ({
    superkpis: query<Kpis, { page?: number }>({
      query: (params) => ({ url: "kpis/", params }),
    }),
    superTeams: query<Teams, { page?: number }>({
      query: (params) => ({ url: "teams/", params }),
    }),

    superTeamCoaches: query<TeamCoaches, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/coaches/`,
        params,
      }),
    }),

    superTeamPlaers: query<TeamPlayers, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/players/`,
        params,
      }),
    }),

    superClub: query<ParentClub, { pages?: number }>({
      query: (params) => "my-club/",
    }),
    superSport: query<ClubManagerSport, { page?: number }>({
      query: (params) => ({ url: "my-sport/", params }),
    }),
    superKpis: query<Kpis, { page?: number }>({
      query: (params) => ({ url: "kpis/", params }),
    }),
    superMetrics: query<Metrics, { kpi_id: string | undefined; page?: number }>(
      {
        query: ({ kpi_id, ...params }) => ({
          url: `metrics/${kpi_id}/`,
          params,
        }),
      }
    ),
    addKpi: mutation<kpi, kpi>({
      query: ({ ...body }) => ({
        url: "kpis/add-kpi/",
        method: "POST",
        body,
      }),
    }),

    addAction: mutation<AddAction, AddAction>({
      query: ({ metric_id, ...body }) => ({
        url: `add-action/${metric_id}/`,
        method: "POST",
        body,
      }),
    }),

    addRecommendations: mutation<AddRecommendation, AddRecommendation>({
      query: ({ metric_id, ...body }) => ({
        url: `add-recommendation/${metric_id}/`,
        method: "POST",
        body,
      }),
    }),

    suprtEvents: query<TeamEvents, { team_id: number; page?: number }>({
      query: ({ team_id, ...params }) => ({ url: `${team_id}/events`, params }),
    }),

    superCoachesRequests: query<CoachRequests, { page?: number }>({
      query: (params) => ({ url: "coaches/requests", params }),
      providesTags: ["supervisor"],
    }),

    superAcceptCoachRequest: mutation<
      CoachesRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/requests/${coach_id}/accept/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superDeclineCoachRequest: mutation<
      CoachesRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/requests/${coach_id}/decline`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),
  }),
});

export const {
  useSuperkpisQuery,
  useSuperTeamCoachesQuery,
  useSuperTeamPlaersQuery,
  useSuperTeamsQuery,
  useSuperSportQuery,
  useSuperKpisQuery,
  useAddKpiMutation,
  useSuperMetricsQuery,
  useAddActionMutation,
  useAddRecommendationsMutation,
  useSuprtEventsQuery,
  useSuperCoachesRequestsQuery,
  useSuperAcceptCoachRequestMutation,
  useSuperDeclineCoachRequestMutation,
  useSuperClubQuery,
} = supervisorApi;
