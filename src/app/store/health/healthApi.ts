import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL2 } from "~/app/configs/dataService";
const TOKEN = import.meta.env.VITE_TOKEN;
export const healthApi = createApi({
  reducerPath: "healthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL2}/v1/health`,
    prepareHeaders: (headers: any, api: any) => {
      headers.set("Authorization", `Bearer ${TOKEN}`);
      return headers;
    },
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
      query: ({dataType,Date}) => ({
       
        url:`/google/fit-data/${dataType}?date=${Date}`
      }),
    }),
    fitDataActivity: mutation({
      query: ({dataType,Date,type}) => ({
       
        url:`/google/${dataType}?date=${Date}${type?"&type=bars":""}`
      }),
    }),
  }),
});

export const { useGetUrlGoogleMutation, useAuthCallbackMutation,useFitDataMutation ,useFitDataActivityMutation} = healthApi;
