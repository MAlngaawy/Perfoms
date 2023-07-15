import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL2 } from "~/app/configs/dataService";

export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL2}/v1/health`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Health"],
  endpoints: ({ query, mutation }) => ({
    getUrlGoogle: mutation({
      query: (id) => ({
        url: `/google/authorize`,
      }),
    }),
    authCallback: mutation({
      query: ({code}) => ({
        url: `/google/auth-callback?code=${code}`,
      }),
    }),
    fitData: mutation({
      query: ({dataType,Date,playerId}) => ({
       
        url:`/google/fit-data/${dataType}?date=${Date}&playerId=${playerId}`
      }),
    }),
    fitDataActivity: mutation({
      query: ({dataType,Date,type,playerId}) => ({
       
        url:`/google/${dataType}?date=${Date}${type?"&type=bars":""}&playerId=${playerId}`
      }),
    }),
  }),
});

export const { useGetUrlGoogleMutation, useAuthCallbackMutation,useFitDataMutation ,useFitDataActivityMutation} = healthApi;
