import {
  ParentClub,
  ParentClubs,
  PlayerActions,
  PlayerAttendances,
  PlayerCoach,
  PlayerCoachTeams,
  PlayerDocuments,
  PlayerRecommendations,
  PlayerTeams,
  SportTeams,
  TeamCoaches,
  TeamEvent,
  TeamEvents,
  TeamSupervisors,
} from "./../types/parent-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  ActiveSubscription,
  AddPlayerType,
  AllParents,
  AllPlayers,
  Player,
} from "../types/parent-types";

export const parentsApi = createApi({
  reducerPath: "parentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/parent`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Parent", "Player"],
  endpoints: ({ query, mutation }) => ({
    ActiveSubscription: query<ActiveSubscription, { page?: number }>({
      query: (params) => ({
        url: "active-subscription/",
        params,
      }),
      providesTags: ["Parent"],
    }),

    addPlayer: mutation<Player, AddPlayerType>({
      query: (body) => ({
        url: "add-player/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Player"],
    }),

    playerClubs: query<ParentClubs, { page?: number }>({
      query: (params) => ({
        url: "clubs/",
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerCoach: query<PlayerCoach, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `/coaches/${id}/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerCoachTeams: query<PlayerCoachTeams, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `coaches/${id}/teams/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    myPlayers: query<AllPlayers, { page?: number }>({
      query: (params) => ({
        url: `my-players/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    onePlayer: query<AllPlayers, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `my-players/${id}/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerActions: query<PlayerActions, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `${id}/actions/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerCalender: query<PlayerAttendances, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `${id}/calender/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerClub: query<ParentClub, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `clubs/${id}/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerTeams: query<PlayerTeams, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `${id}/player-teams/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerRecommendations: query<
      PlayerRecommendations,
      { id: number; page?: number }
    >({
      query: ({ id, ...params }) => ({
        url: `${id}/recommendations/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerTeamDocs: query<
      PlayerDocuments,
      { playerId: number; teamId: number }
    >({
      query: ({ playerId, teamId, ...params }) => ({
        url: `${playerId}/${teamId}/docs/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    // playerTeamKpisMetrics: query<
    //   PlayerDocuments,
    //   { playerId: number; teamId: number }
    // >({
    //   query: ({ playerId, teamId, ...params }) => ({
    //     url: `${playerId}/${teamId}/player-kpis-metrics`,
    //     params,
    //   }),
    //   providesTags: ["Parent"],
    // }),
    playerSportTeams: query<SportTeams, { sportId: number; page?: number }>({
      query: ({ sportId, ...params }) => ({
        url: `${sportId}/player-kpis-metrics/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    teamCoaches: query<TeamCoaches, { teamId: number; page?: number }>({
      query: ({ teamId, ...params }) => ({
        url: `${teamId}/coaches/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    teamEvents: query<TeamEvents, { teamId: number; page?: number }>({
      query: ({ teamId, ...params }) => ({
        url: `${teamId}/events/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    teamEvent: query<
      TeamEvent,
      { teamId: number; eventId: number; page?: number }
    >({
      query: ({ teamId, eventId, ...params }) => ({
        url: `${teamId}/events/${eventId}/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    teamSupervisors: query<TeamSupervisors, { teamId: number; page?: number }>({
      query: ({ teamId, ...params }) => ({
        url: `${teamId}/supervisors/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
  }),
});

export const {
  useActiveSubscriptionQuery,
  useMyPlayersQuery,
  useAddPlayerMutation,
  usePlayerClubQuery,
  usePlayerCoachQuery,
  usePlayerCoachTeamsQuery,
  useOnePlayerQuery,
  usePlayerActionsQuery,
  usePlayerCalenderQuery,
  usePlayerRecommendationsQuery,
  usePlayerSportTeamsQuery,
  usePlayerTeamDocsQuery,
  usePlayerTeamsQuery,
  useTeamCoachesQuery,
  useTeamEventQuery,
  useTeamEventsQuery,
  useTeamSupervisorsQuery,
  usePlayerClubsQuery,
} = parentsApi;
