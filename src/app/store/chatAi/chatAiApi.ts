import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL2 } from "~/app/configs/dataService";
const TOKEN = import.meta.env.VITE_TOKEN;
export const chatAiApi = createApi({
  reducerPath: "chatAiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL2}/v1/`,
    prepareHeaders: (headers: any, api: any) => {
      headers.set("Authorization", `Bearer ${TOKEN}`);
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
