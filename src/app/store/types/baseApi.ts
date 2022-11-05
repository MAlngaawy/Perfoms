import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "app/configs/dataService";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/base`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Base"],
  endpoints: ({ query, mutation }) => ({
    baseQuery: query({
      query: (params) => ({
        url: "",
        params,
      }),
      providesTags: ["Base"],
    }),
    baseMutation: mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Base"],
    }),
  }),
});

export const {} = baseApi;
