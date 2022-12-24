import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  ClubManagerSport,
  CoachesRequests,
  TeamPlayers,
  Teams,
} from "../types/clubManager-types";
import {
  EventFiles,
  PlayerAttendances,
  PlayerKpis,
  PlayerMetricScores,
  PlayerRecommendations,
  TeamCoaches,
  TeamEvents,
} from "../types/parent-types";
import { ParentClub } from "~/app/store/types/parent-types";
import {
  AddAction,
  AddEvent,
  AddRecommendation,
  AddTeamCalendar,
  Coaches,
  CoachRequests,
  kpi,
  Kpis,
  Metrics,
  Pillars,
  SuperVisorPlayers,
  SuperVisorTeamInfo,
  Team,
  TeamAttendance,
  TeamCoach,
  TeamPlayer,
} from "../types/supervisor-types";
import { Event } from "../types/events-types";
import {
  CoachPlayerInfo,
  PlayerMonthsAttendancesStatistics,
  PlayerParent,
  TeamKpiPlayersStatistics,
  TeamPlayersAttendStatistics,
  TeamsStatistics,
  TeamStatistics,
} from "../types/coach-types";

export const supervisorApi = createApi({
  reducerPath: "supervisorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/supervisor`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["supervisor", "calendar"],
  endpoints: ({ query, mutation }) => ({
    superkpis: query<Kpis, { page?: number }>({
      query: (params) => ({ url: "kpis/", params }),
    }),
    superTeams: query<Teams, { page?: number }>({
      query: (params) => ({ url: "teams/", params }),
      providesTags: ["supervisor"],
    }),

    superTeamCoaches: query<TeamCoaches, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/coaches/`,
        params,
      }),
      providesTags: ["supervisor"],
    }),

    superTeamEvents: query<TeamEvents, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/events/`,
        params,
      }),
      providesTags: ["supervisor"],
    }),

    superTeamPlaers: query<TeamPlayers, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `${team_id}/players/`,
        params,
      }),
      providesTags: ["supervisor"],
    }),

    superPlayers: query<SuperVisorPlayers, { page?: number }>({
      query: (params) => ({
        url: `players/`,
        params,
      }),
      providesTags: ["supervisor"],
    }),

    superTeamInfo: query<
      SuperVisorTeamInfo,
      { team_id: string | undefined; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/`,
        params,
      }),
    }),

    superClub: query<ParentClub, { pages?: number }>({
      query: (params) => "my-club/",
    }),
    superSport: query<ClubManagerSport, { page?: number }>({
      query: (params) => ({ url: "my-sport/", params }),
    }),
    superKpis: query<Kpis, { page?: number }>({
      query: (params) => ({ url: "kpis/", params }),
    }),
    superPillars: query<
      Pillars,
      { sport_id: number | string | undefined; page?: number }
    >({
      query: ({ sport_id, ...params }) => ({
        url: `sports/${sport_id}/pillars/`,
        params,
      }),
    }),
    superMetrics: query<Metrics, { kpi_id: string | undefined; page?: number }>(
      {
        query: ({ kpi_id, ...params }) => ({
          url: `metrics/${kpi_id}/`,
          params,
        }),
      }
    ),
    addKpi: mutation<kpi, kpi>({
      query: ({ ...body }) => ({
        url: "kpis/add-kpi/",
        method: "POST",
        body,
      }),
    }),

    addAction: mutation<AddAction, AddAction>({
      query: ({ metric_id, ...body }) => ({
        url: `add-action/${metric_id}/`,
        method: "POST",
        body,
      }),
    }),

    addRecommendations: mutation<AddRecommendation, AddRecommendation>({
      query: ({ metric_id, ...body }) => ({
        url: `add-recommendation/${metric_id}/`,
        method: "POST",
        body,
      }),
    }),

    suprtEvents: query<TeamEvents, { team_id: number; page?: number }>({
      query: ({ team_id, ...params }) => ({ url: `${team_id}/events`, params }),
      providesTags: ["supervisor"],
    }),

    suprtEventFiles: query<EventFiles, { event_id: number; page?: number }>({
      query: ({ event_id, ...params }) => ({
        url: `/${event_id}/files`,
        params,
      }),
    }),

    superCoachesRequests: query<CoachRequests, { page?: number }>({
      query: (params) => ({ url: "coaches/requests", params }),
      providesTags: ["supervisor"],
    }),

    superAllCoaches: query<Coaches, { page?: number }>({
      query: (params) => ({ url: "coaches/", params }),
      providesTags: ["supervisor"],
    }),

    superTeamAttendance: query<
      TeamAttendance,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/attendance/`,
        params,
      }),
      providesTags: ["calendar"],
    }),

    superAddTeamCalendar: mutation<AddTeamCalendar, {}>({
      query: (body) => ({
        url: `add-team-calender/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["calendar"],
    }),

    superAcceptCoachRequest: mutation<
      CoachesRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/requests/${coach_id}/accept/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superDeclineCoachRequest: mutation<
      CoachesRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/requests/${coach_id}/decline`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superRemoveTeamCoach: mutation<TeamCoach, {}>({
      query: ({ ...body }) => ({
        url: `remove-team-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superAddTeamCoaches: mutation<TeamCoach, {}>({
      query: ({ ...body }) => ({
        url: `add-team-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superAddEvent: mutation<AddEvent, {}>({
      query: ({ ...body }) => ({
        url: `add-event/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superEditEvent: mutation<AddEvent, { event_id: number }>({
      query: ({ event_id, ...body }) => ({
        url: `events/${event_id}/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superDeleteEvent: mutation<{}, { event_id: number }>({
      query: ({ event_id, ...body }) => ({
        url: `events/${event_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superDeleteTeam: mutation<{}, { team_id: number }>({
      query: ({ team_id, ...body }) => ({
        url: `teams/${team_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superAddTeamPlayer: mutation<TeamPlayer, {}>({
      query: ({ ...body }) => ({
        url: `add-team-player/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superAddNewTeam: mutation<Team, {}>({
      query: ({ ...body }) => ({
        url: `add-team/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    superRemoveTeamPlayer: mutation<TeamPlayer, {}>({
      query: ({ ...body }) => ({
        url: `remove-team-player/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["supervisor"],
    }),

    getSuperPlayerInfo: query<
      CoachPlayerInfo,
      { player_id: string | number | undefined; page?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `player-info/${player_id}/`,
        params,
      }),
    }),

    getSuperParentInfo: query<
      PlayerParent,
      { player_id: string | undefined; page?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `parent-info/${player_id}/`,
        params,
      }),
    }),

    superSportStatistics: query<TeamStatistics, { page?: number }>({
      query: (params) => ({
        url: `statistics/my-sport/`,
      }),
    }),

    superTeamsStatistics: query<
      TeamsStatistics,
      { sport_id: number | undefined; pages?: number }
    >({
      query: ({ sport_id, ...params }) => ({
        url: `statistics/sports/teams/${sport_id}`,
        params,
      }),
    }),

    superTeamKpisStatistics: query<
      TeamsStatistics,
      {
        sport_id: number | undefined;
        team_id: string | undefined;
        pages?: number;
      }
    >({
      query: ({ sport_id, team_id, ...params }) => ({
        url: `statistics/sports/teams/kpis/${sport_id}/${team_id}`,
        params,
      }),
    }),

    superTeamKpiPlayersStatistics: query<
      TeamKpiPlayersStatistics,
      {
        kpi_id: string | undefined;
        team_id: string | undefined;
        pages?: number;
      }
    >({
      query: ({ kpi_id, team_id, ...params }) => ({
        url: `statistics/kpis/${kpi_id}/${team_id}/`,
        params,
      }),
    }),

    superTeamAttendPlayersStatistics: query<
      TeamPlayersAttendStatistics,
      {
        sport_id: number | undefined;
        team_id: string | undefined;
        pages?: number;
      }
    >({
      query: ({ sport_id, team_id, ...params }) => ({
        url: `statistics/attends/${sport_id}/${team_id}/`,
        params,
      }),
    }),

    superPlayerKpiStatistics: query<
      TeamsStatistics,
      { player_id: string | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/player-kpis/${player_id}`,
        params,
      }),
    }),

    superPlayersAttendStatistics: query<
      PlayerMonthsAttendancesStatistics,
      { player_id: string | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/calender-detailed/${player_id}/`,
        params,
      }),
    }),

    superPlayerKpisMetricsStatistics: query<
      PlayerKpis,
      {
        player_id: string | undefined;
        date_from: string;
        date_to: string;
        pages?: number;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/player-kpis-metrics`,
        params,
      }),
    }),

    superPlayerKpisMetricsModerateScore: query<
      PlayerMetricScores,
      { player_id: string | number | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/metrics/scores/moderate`,
        params,
      }),
    }),

    superPlayerKpisMetricsStrengthScore: query<
      PlayerMetricScores,
      { player_id: string | number | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/metrics/scores/strength`,
        params,
      }),
    }),

    superPlayerKpisMetricsWeaknessScore: query<
      PlayerMetricScores,
      { player_id: string | number | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/metrics/scores/weakness`,
        params,
      }),
    }),

    superPlayerRecommendations: query<
      PlayerRecommendations,
      { player_id: string | number | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/recommendations`,
        params,
      }),
    }),

    superPlayerActions: query<
      PlayerRecommendations,
      { player_id: string | number | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/actions`,
        params,
      }),
    }),

    superPlayerCalendar: query<
      PlayerAttendances,
      { player_id: string | number | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/calendar`,
        params,
      }),
    }),
  }),
});

export const {
  useSuperkpisQuery,
  useSuperTeamCoachesQuery,
  useSuperTeamEventsQuery,
  useSuperTeamPlaersQuery,
  useSuperTeamsQuery,
  useSuperTeamInfoQuery,
  useSuperSportQuery,
  useSuperKpisQuery,
  useSuperPillarsQuery,
  useAddKpiMutation,
  useSuperMetricsQuery,
  useAddActionMutation,
  useAddRecommendationsMutation,
  useSuprtEventsQuery,
  useSuprtEventFilesQuery,
  useSuperCoachesRequestsQuery,
  useSuperAcceptCoachRequestMutation,
  useSuperDeclineCoachRequestMutation,
  useSuperClubQuery,
  useSuperPlayersQuery,
  useSuperTeamAttendanceQuery,
  useSuperAddTeamCalendarMutation,
  useSuperRemoveTeamCoachMutation,
  useSuperAddTeamCoachesMutation,
  useSuperAllCoachesQuery,
  useSuperAddEventMutation,
  useSuperDeleteEventMutation,
  useSuperDeleteTeamMutation,
  useSuperEditEventMutation,
  useSuperAddTeamPlayerMutation,
  useSuperRemoveTeamPlayerMutation,
  useGetSuperParentInfoQuery,
  useGetSuperPlayerInfoQuery,
  useSuperSportStatisticsQuery,
  useSuperTeamsStatisticsQuery,
  useSuperTeamKpisStatisticsQuery,
  useSuperTeamKpiPlayersStatisticsQuery,
  useSuperTeamAttendPlayersStatisticsQuery,
  useSuperPlayerKpiStatisticsQuery,
  useSuperPlayersAttendStatisticsQuery,
  useSuperPlayerKpisMetricsStatisticsQuery,
  useSuperPlayerKpisMetricsModerateScoreQuery,
  useSuperPlayerKpisMetricsStrengthScoreQuery,
  useSuperPlayerKpisMetricsWeaknessScoreQuery,
  useSuperPlayerActionsQuery,
  useSuperPlayerRecommendationsQuery,
  useSuperPlayerCalendarQuery,
  useSuperAddNewTeamMutation,
} = supervisorApi;
