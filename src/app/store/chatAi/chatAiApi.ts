import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { AllEvents, Event } from "../types/events-types";

export const chatAiApi = createApi({
  reducerPath: "chatAiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://health.performs.app/v1/`,
    prepareHeaders: (headers: any, api: any) => {
   
        headers.set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDAiLCJpYXQiOjE2ODM5Mjk2NjQsImV4cCI6MTY4NjUyMTY2NH0.tlURwDVf9DD3G0RKRTn9wfFvlMD7Uq6br6sacekOb8M`);
      return headers;
    }
    
  }),
  tagTypes: ["chatAi"],
  endpoints: ({ query, mutation }) => ({
    chat: mutation({
      query: (body) => ({
        url: "ai/chat/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["chatAi"],
    }),
  }),
});

export const { useChatMutation } = chatAiApi;
