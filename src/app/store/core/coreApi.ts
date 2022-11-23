import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";

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
    teams: query({
      query: (params) => ({
        url: "teams/",
        params,
      }),
      providesTags: ["Core"],
    }),
    publicClubs: query({
      query: (params) => ({
        url: "clubs/",
        params,
      }),
      providesTags: ["Core"],
    }),
    chatToken: query({
      query: () => ({
        url: "generate_chat_token/",
      }),
    }),
  }),
});

export const {
  useRefreshQuery,
  usePublicClubsQuery,
  useTeamsQuery,
  useChatTokenQuery,
} = coreApi;
