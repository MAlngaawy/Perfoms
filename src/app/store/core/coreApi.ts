import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "app/configs/dataService";

export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/core`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Core"],
  endpoints: ({ query, mutation }) => ({
    refresh: query({
      query: (params) => ({
        url: "refresh/",
        params,
      }),
      providesTags: ["Core"],
    }),
  }),
});

export const { useRefreshQuery } = coreApi;
