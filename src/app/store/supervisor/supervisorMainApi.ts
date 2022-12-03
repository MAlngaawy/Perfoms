import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { ClubManagerSport, Teams } from "../types/clubManager-types";
import { TeamEvents } from "../types/parent-types";
import {
  AddAction,
  AddRecommendation,
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
  }),
});

export const {
  useSuperkpisQuery,
  useSuperTeamsQuery,
  useSuperSportQuery,
  useSuperKpisQuery,
  useAddKpiMutation,
  useSuperMetricsQuery,
  useAddActionMutation,
  useAddRecommendationsMutation,
  useSuprtEventsQuery,
} = supervisorApi;
