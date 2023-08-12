import { SerializedError } from "./../index";
import {
  EventFiles,
  ParentClub,
  ParentClubs,
  PlayerActions,
  PlayerAttendances,
  PlayerCoach,
  PlayerCoachTeams,
  PlayerDocuments,
  PlayerRecommendations,
  SelectSubscription,
  SelectSubscriptionRes,
  SportTeams,
  Subscriptions,
  TeamCoaches,
  TeamEvent,
  TeamEvents,
  TeamSupervisors,
  PlayerKpis,
  PlayerSports,
  PlayerMetricScores,
  PlayerCertificate,
  PlayerCertificates,
  ActiveSubscription,
  AddPlayerType,
  AllPlayers,
  Player,
  UpdatePlayer,
} from "./../types/parent-types";
import { CoachPlayerInfo, CoachTeamInfo } from "../types/coach-types";
import { Teams } from "../types/clubManager-types";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";

export const parentsApi = createApi({
  reducerPath: "parentsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/parent`,
    prepareHeaders: BASE_HEADERS,
  }) as BaseQueryFn<string | FetchArgs, unknown, SerializedError, {}>,

  tagTypes: ["Parent", "Player", "Subscriptions"],

  endpoints: ({ query, mutation }) => ({
    ActiveSubscription: query<ActiveSubscription, { page?: number }>({
      query: (params) => ({
        url: "active-subscription/",
        params,
      }),
      providesTags: ["Subscriptions"],
    }),

    addPlayer: mutation<Player, AddPlayerType>({
      query: (body) => ({
        url: "add-player/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Player"],
    }),

    UpdatePlayer: mutation<UpdatePlayer, { player_id: string }>({
      query: ({ player_id, ...body }) => ({
        url: `update-player/${player_id}`,
        method: "PATCH",
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

    playerCoach: query<
      PlayerCoach,
      { id: number | string | undefined; page?: number }
    >({
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
      providesTags: ["Parent", "Player"],
    }),

    onePlayer: query<CoachPlayerInfo, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `${id}/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerActions: query<
      PlayerActions,
      {
        id: number | string | undefined;
        page?: number;
        month: string;
        year: string;
        team_id: number | string | undefined;
      }
    >({
      query: ({ id, team_id, ...params }) => ({
        url: `${id}/${team_id}/actions/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerCalendar: query<
      PlayerAttendances,
      {
        id: number;
        team_id: number;
        page?: number;
        month?: string;
        year?: string;
      }
    >({
      query: ({ month, year, id, team_id }) => ({
        url: `${id}/calendar/${team_id}`,
        params: { month, year },
      }),
      providesTags: ["Parent"],
    }),

    playerClub: query<ParentClub, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `${id}/club`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerTeams: query<Teams, { id: number; page?: number }>({
      query: ({ id, ...params }) => ({
        url: `${id}/player-teams/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    TeamInfo: query<CoachTeamInfo, { team_id: number; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/info`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    parentSubscriptions: query<Subscriptions, { page?: number }>({
      query: (params) => ({
        url: `subscriptions/`,
        params,
      }),
      providesTags: ["Subscriptions"],
    }),

    playerRecommendations: query<
      PlayerRecommendations,
      {
        id: number | string | undefined;
        page?: number;
        month: string;
        year: string;
        team_id: number | string | undefined;
      }
    >({
      query: ({ id, team_id, ...params }) => ({
        url: `${id}/${team_id}/recommendations/`,
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

    playerKpisMetrics: query<
      PlayerKpis,
      { player_id: number; team_id: number; month: string; year: string }
    >({
      query: ({ player_id, team_id, month, year }) => ({
        url: `${player_id}/${team_id}/player-kpis-metrics/`,
        params: { month, year },
      }),
      providesTags: ["Parent"],
    }),

    playerSportTeams: query<
      SportTeams,
      { player_id: number; team_id: number; page?: number }
    >({
      query: ({ player_id, team_id, ...params }) => ({
        url: `${player_id}/${team_id}/player-kpis-metrics/`,
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
    eventFiles: query<EventFiles, { eventId: number; page?: number }>({
      query: ({ eventId, ...params }) => ({
        url: `${eventId}/files/`,
        params,
      }),
      providesTags: ["Parent"],
    }),
    upcomingEvents: query<TeamEvents, { team_id: number; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/upcoming-events/`,
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

    clubSports: query<PlayerSports, { club_id: number; page?: number }>({
      query: ({ club_id, ...params }) => ({
        url: `${club_id}/sports/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerModerate: query<
      PlayerMetricScores,
      {
        player_id: number | string | undefined;
        page?: number;
        month: string;
        year: string;
        team_id: number | string | undefined;
      }
    >({
      query: ({ player_id, team_id, ...params }) => ({
        url: `${player_id}/${team_id}/metrics/scores/moderate`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerStrength: query<
      PlayerMetricScores,
      {
        player_id: number | string | undefined;
        page?: number;
        month: string;
        year: string;
        team_id: number | string | undefined;
      }
    >({
      query: ({ player_id, team_id, ...params }) => ({
        url: `${player_id}/${team_id}/metrics/scores/strength`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerWeakness: query<
      PlayerMetricScores,
      {
        player_id: number | string | undefined;
        page?: number;
        month: string;
        year: string;
        team_id: number | string | undefined;
      }
    >({
      query: ({ player_id, team_id, ...params }) => ({
        url: `${player_id}/${team_id}/metrics/scores/weakness`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    sportTeams: query<SportTeams, { sport_id: number; page?: number }>({
      query: ({ sport_id, ...params }) => ({
        url: `${sport_id}/sport-teams/`,
        params,
      }),
      providesTags: ["Parent"],
    }),

    playerCertificate: query<PlayerCertificate, string>({
      query: (id) => ({
        url: `/certificate/${id}`,
      }),
      providesTags: ["Parent"],
    }),

    playerCertificates: query<
      PlayerCertificates,
      { player_id: number | string | undefined; page?: number }
    >({
      query: ({ player_id }) => ({
        url: `/player-certificates/${player_id}`,
      }),
      providesTags: ["Parent"],
    }),

    selectSubscription: mutation<SelectSubscriptionRes, SelectSubscription>({
      query: (body) => ({
        url: "/select-subscription/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscriptions"],
    }),

    parentDeletePlayer: mutation<{}, { player_id: number }>({
      query: ({ player_id, ...body }) => ({
        url: `${player_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Parent", "Player"],
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
  usePlayerCalendarQuery,
  usePlayerRecommendationsQuery,
  usePlayerKpisMetricsQuery,
  usePlayerSportTeamsQuery,
  usePlayerTeamDocsQuery,
  usePlayerTeamsQuery,
  useTeamInfoQuery,
  useTeamCoachesQuery,
  useTeamEventQuery,
  useTeamEventsQuery,
  useTeamSupervisorsQuery,
  usePlayerClubsQuery,
  useParentSubscriptionsQuery,
  useEventFilesQuery,
  useUpcomingEventsQuery,
  useSelectSubscriptionMutation,
  useClubSportsQuery,
  useSportTeamsQuery,
  usePlayerModerateQuery,
  usePlayerStrengthQuery,
  usePlayerWeaknessQuery,
  usePlayerCertificateQuery,
  usePlayerCertificatesQuery,
  useParentDeletePlayerMutation,
  useUpdatePlayerMutation,
} = parentsApi;
