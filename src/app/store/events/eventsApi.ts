import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { AllEvents, Event } from "../types/events-types";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/event`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Events"],
  endpoints: ({ query, mutation }) => ({
    allEvents: query<
      AllEvents,
      { date: string; from_date: string; to_date: string; page: number }
    >({
      query: (params) => ({
        url: "all-events/",
        params,
      }),
      providesTags: ["Events"],
    }),
    event: query<Event, { id: number }>({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Events"],
    }),
  }),
});

export const { useAllEventsQuery, useEventQuery } = eventsApi;
