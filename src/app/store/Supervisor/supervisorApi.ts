import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { ClubManagerSport, Teams } from "../types/clubManager-types";
import { kpi, Kpis, Metrics } from "../types/supervisor-types";

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
  }),
});

export const {
  useSuperkpisQuery,
  useSuperTeamsQuery,
  useSuperSportQuery,
  useSuperKpisQuery,
  useAddKpiMutation,
  useSuperMetricsQuery,
} = supervisorApi;
