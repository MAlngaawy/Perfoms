import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { Kpis } from "../types/supervisor-types";

export const supervisorApi = createApi({
  reducerPath: "supervisorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/supervisor`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["supervisor"],
  endpoints: ({ query, mutation }) => ({
    kpis: query<Kpis, { page?: number }>({
      query: (params) => ({ url: "kpis/", params }),
    }),
  }),
});

export const { useKpisQuery } = supervisorApi;
