import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL2 } from "~/app/configs/dataService";

export const chatAiApi = createApi({
  reducerPath: "chatAiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL2}/v1/`,
    prepareHeaders: BASE_HEADERS,
    
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
