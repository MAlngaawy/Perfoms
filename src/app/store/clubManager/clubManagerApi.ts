import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { CoachRequests } from "../types/supervisor-types";

export const clubManagerApi = createApi({
  reducerPath: "clubManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/club-manager`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["clubManager"],
  endpoints: ({ query, mutation }) => ({
    manageCoachesRequests: query<CoachRequests, { page?: number }>({
      query: (params) => ({ url: "coaches/requests", params }),
      providesTags: ["clubManager"],
    }),

    acceptCoachRequestMutation: mutation<
      CoachRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/${coach_id}/requests/accept`,
        method: "PATCH",
        body,
      }),
    }),

    acceptCoachRequest: query<
      CoachRequests,
      { coach_id: string | number; page?: number }
    >({
      query: ({ coach_id, ...params }) => ({
        url: `coaches/${coach_id}/requests/accept`,
        params,
      }),
      providesTags: ["clubManager"],
    }),
  }),
});

export const {
  useManageCoachesRequestsQuery,
  useAcceptCoachRequestQuery,
  useAcceptCoachRequestMutationMutation,
} = clubManagerApi;
