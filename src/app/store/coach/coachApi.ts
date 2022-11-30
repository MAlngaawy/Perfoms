import {
  SendBulkNotifications,
  Team,
  UpdatePlayerPKM,
} from "./../types/coach-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  AllCoachesType,
  GeneratePdfDocs,
  GetMyTeams,
} from "../types/coach-types";
import { TeamPlayers } from "../types/clubManager-types";

export const coachApi = createApi({
  reducerPath: "coachApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/coach`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Attendance"],
  endpoints: ({ query, mutation }) => ({
    coaches: query<AllCoachesType, { page: number }>({
      query: (params) => ({ url: "all-coaches/", params }),
    }),
    myTeams: query<GetMyTeams, null>({
      query: () => "my-teams/",
    }),
    teamDetails: query<Team, number>({
      query: (id) => `team-details/${id}/`,
    }),
    generateDoc: mutation<GeneratePdfDocs, GeneratePdfDocs>({
      query: (body) => ({
        url: "generate-doc/",
        method: "POST",
        body,
      }),
    }),
    sendBulkNotifications: mutation<
      SendBulkNotifications,
      SendBulkNotifications
    >({
      query: (body) => ({
        url: "send-bulk-notification/",
        method: "POST",
        body,
      }),
    }),
    updatePlayerPKM: mutation<UpdatePlayerPKM, UpdatePlayerPKM>({
      query: ({ id, ...body }) => ({
        url: `update-player-pkm/${id}/`,
        method: "PATCH",
        body,
      }),
    }),
    GetTeamPlayers: query<TeamPlayers, { team_id: number; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/players`,
        params,
      }),
    }),
  }),
});

export const {
  useCoachesQuery,
  useGenerateDocMutation,
  useMyTeamsQuery,
  useSendBulkNotificationsMutation,
  useTeamDetailsQuery,
  useUpdatePlayerPKMMutation,
  useGetTeamPlayersQuery,
} = coachApi;
