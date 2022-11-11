import { AllPlayerCoaches } from "./../types/parent-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  AddPlayerType,
  AllClubs,
  AllParents,
  AllPlayers,
  DocumentTypes,
  Player,
} from "../types/parent-types";

export const parentsApi = createApi({
  reducerPath: "parentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/parent`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Parent"],
  endpoints: ({ query, mutation }) => ({
    myPlayers: query<AllPlayers, { page?: number }>({
      query: (params) => ({
        url: "my-players/",
        params,
      }),
      providesTags: ["Parent"],
    }),
    onePlayer: query<AllPlayers, number>({
      query: (id) => ({
        url: `my-players/${id}`,
      }),
      providesTags: ["Parent"],
    }),
    playerCoaches: query<AllPlayerCoaches, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `/all-coaches/${id}`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    allParents: query<AllParents, { page: number }>({
      query: (params) => ({
        url: "all-parents/",
        params,
      }),
      providesTags: ["Parent"],
    }),
    allClubs: query<AllClubs, { page: number }>({
      query: (params) => ({
        url: "clubs/",
        params,
      }),
      providesTags: ["Parent"],
    }),
    club: query<AllClubs, { id: number }>({
      query: (id) => ({
        url: `clubs/${id}/`,
      }),
      providesTags: ["Parent"],
    }),
    playerDocs: query<DocumentTypes, { player_id: number }>({
      query: (id) => ({
        url: `clubs/${id}/`,
      }),
      providesTags: ["Parent"],
    }),
    addPlayer: mutation<Player, AddPlayerType>({
      query: (body) => ({
        url: "add-player/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Parent"],
    }),
  }),
});

export const {
  useAllClubsQuery,
  useAllParentsQuery,
  useAddPlayerMutation,
  useMyPlayersQuery,
  useOnePlayerQuery,
  useClubQuery,
  usePlayerCoachesQuery,
} = parentsApi;