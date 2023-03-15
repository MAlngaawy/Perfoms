import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  ClubManagerSport,
  CoachesRequests,
  MetricNotes,
  TeamPlayers,
  Teams,
  UpdateNote,
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
  CoachTeamAttendance,
  CoachTeamPerformance,
  PlayerMonthsAttendancesStatistics,
  PlayerParent,
  TeamAttendanceDays,
  TeamKpiPlayersStatistics,
  TeamPerformanceMetrics,
  TeamPlayersAttendStatistics,
  TeamsStatistics,
  TeamStatistics,
  UpdatePlayerPKM,
} from "../types/coach-types";
import { YearPicker } from "@mantine/dates/lib/components/CalendarBase/YearPicker/YearPicker";
import { Attendance, UpdateAttendance } from "../types/attendance-types";

export const supervisorApi = createApi({
  reducerPath: "supervisorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/supervisor`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: [
    "supervisor",
    "calendar",
    "metrics",
    "kpis",
    "Attendance",
    "performances",
    "actions",
    "recommendations",
  ],
  endpoints: ({ query, mutation }) => ({
    superKpis: query<
      Kpis,
      { pillar_id: string | number | undefined; page?: number }
    >({
      query: ({ pillar_id, ...params }) => ({
        url: `${pillar_id}/kpis/`,
        params,
      }),
      providesTags: ["kpis"],
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

    superPillars: query<
      Pillars,
      { sport_id: number | string | undefined; page?: number }
    >({
      query: ({ sport_id, ...params }) => ({
        url: `sports/${sport_id}/pillars/`,
        params,
      }),
    }),

    superDeletePillar: mutation<{}, { pillar_id: string | number | undefined }>(
      {
        query: ({ pillar_id, ...params }) => ({
          url: `sports/pillars/${pillar_id}/delete`,
          method: "DELETE",
        }),
      }
    ),

    superMetrics: query<Metrics, { kpi_id: string | undefined; page?: number }>(
      {
        query: ({ kpi_id, ...params }) => ({
          url: `metrics/${kpi_id}/`,
          params,
        }),
        providesTags: ["metrics"],
      }
    ),

    addKpi: mutation<kpi, kpi>({
      query: ({ ...body }) => ({
        url: "kpis/add-kpi/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["kpis"],
    }),

    superAddAction: mutation<AddAction, AddAction>({
      query: ({ metric_id, ...body }) => ({
        url: `add-action/${metric_id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["actions"],
    }),

    superAddRecommendations: mutation<AddRecommendation, AddRecommendation>({
      query: ({ metric_id, ...body }) => ({
        url: `add-recommendation/${metric_id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["recommendations"],
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
      { team_id: number; year: string; month: string; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/attendance/`,
        params,
      }),
      providesTags: ["calendar"],
    }),

    superAddTeamCalendar: mutation<AddTeamCalendar, {}>({
      query: (body) => ({
        url: `add-team-calendar/`,
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
        team_id: number | string | undefined;
        pages?: number;
      }
    >({
      query: ({ team_id, ...params }) => ({
        url: `statistics/sports/teams/kpis/${team_id}`,
        params,
      }),
    }),
    //!/**************** */
    superTeamKpiPlayersStatistics: query<
      TeamKpiPlayersStatistics,
      {
        kpi_id: string | number | undefined;
        team_id: string | number | undefined;
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
        sport_id: number | string | undefined;
        team_id: number | string | undefined;
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
      {
        player_id: string | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
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
        url: `statistics/calendar-detailed/${player_id}/`,
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
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/metrics/scores/moderate`,
        params,
      }),
    }),

    superPlayerKpisMetricsStrengthScore: query<
      PlayerMetricScores,
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/metrics/scores/strength`,
        params,
      }),
    }),

    superPlayerKpisMetricsWeaknessScore: query<
      PlayerMetricScores,
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/metrics/scores/weakness`,
        params,
      }),
    }),

    superPlayerRecommendations: query<
      PlayerRecommendations,
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/recommendations`,
        params,
      }),
    }),

    superPlayerActions: query<
      PlayerRecommendations,
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/actions`,
        params,
      }),
    }),

    superPlayerCalendar: query<
      PlayerAttendances,
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string;
        date_to: string;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/calendar`,
        params,
      }),
    }),

    superDeleteKpi: mutation<
      { kpi_id: number },
      { kpi_id: number | string | undefined }
    >({
      query: ({ kpi_id, ...params }) => ({
        url: `kpis/${kpi_id}/delete/`,
        params,
        method: "DELETE",
      }),
    }),

    superDeleteMetric: mutation<{}, { metric_id: string }>({
      query: ({ metric_id, ...body }) => ({
        url: `metrics/${metric_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["metrics"],
    }),

    // Attedance and reports
    superTeamAttendanceDays: query<
      TeamAttendanceDays,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-attendance-days/${team_id}`,
        params,
      }),
    }),

    superGetTeamAttendance: query<
      CoachTeamAttendance,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-attendance/${team_id}`,
        params,
      }),
      providesTags: ["Attendance"],
    }),

    superUpdateAttendance: mutation<Attendance, UpdateAttendance>({
      query: ({ id, ...body }) => ({
        url: `update-attendance-day/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    superGetTeamPerformances: query<
      CoachTeamPerformance,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-performance/${team_id}`,
        params,
      }),
      providesTags: ["performances"],
    }),

    superTeamPerformanceMetrics: query<
      TeamPerformanceMetrics,
      { team_id: number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `team-performance-metrics/${team_id}`,
        params,
      }),
    }),

    superUpdatePlayerPKM: mutation<UpdatePlayerPKM, UpdatePlayerPKM>({
      query: ({ id, team_id, ...body }) => ({
        url: `update-player-pkm/${id}/${team_id}/`,
        method: "PATCH",
        body,
      }),
    }),

    //Actions and Recomm

    superGetMetricActions: query<MetricNotes, { metric_id: number }>({
      query: ({ metric_id, ...params }) => ({
        url: `metric-actions/${metric_id}`,
        params,
      }),
      providesTags: ["actions"],
    }),

    superDeleteMetricAction: mutation<{}, { action_id: number }>({
      query: ({ action_id }) => ({
        url: `delete-action/${action_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["actions"],
    }),

    superUpdateOneAction: mutation<UpdateNote, { action_id: number }>({
      query: ({ action_id, ...body }) => ({
        url: `update-action/${action_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["actions"],
    }),

    superGetMetricRecommendation: query<MetricNotes, { metric_id: number }>({
      query: ({ metric_id, ...params }) => ({
        url: `metric-recommendations/${metric_id}`,
        params,
      }),
      providesTags: ["recommendations"],
    }),

    superDeleteMetricRecommendation: mutation<
      {},
      { recommendation_id: number }
    >({
      query: ({ recommendation_id }) => ({
        url: `delete-recommendation/${recommendation_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["recommendations"],
    }),

    superUpdateOneRecommendation: mutation<
      UpdateNote,
      { recommendation_id: number }
    >({
      query: ({ recommendation_id, ...body }) => ({
        url: `update-recommendation/${recommendation_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["recommendations"],
    }),

    // select actions method
    superSelectRecommendation: mutation<{}, { recommendation_id: number }>({
      query: ({ recommendation_id, ...body }) => ({
        url: `select-recommendation/${recommendation_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["recommendations"],
    }),

    superSelectAction: mutation<{}, { action_id: number }>({
      query: ({ action_id, ...body }) => ({
        url: `select-action/${action_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["actions"],
    }),
  }),
});

export const {
  useSuperTeamCoachesQuery,
  useSuperTeamEventsQuery,
  useSuperTeamPlaersQuery,
  useSuperTeamsQuery,
  useSuperTeamInfoQuery,
  useSuperSportQuery,
  useSuperKpisQuery,
  useSuperPillarsQuery,
  useSuperDeletePillarMutation,
  useAddKpiMutation,
  useSuperMetricsQuery,
  useSuperAddActionMutation,
  useSuperAddRecommendationsMutation,
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
  useSuperDeleteKpiMutation,
  useSuperDeleteMetricMutation,
  useSuperTeamAttendanceDaysQuery,
  useSuperGetTeamAttendanceQuery,
  useSuperUpdateAttendanceMutation,
  useSuperGetTeamPerformancesQuery,
  useSuperUpdatePlayerPKMMutation,
  useSuperTeamPerformanceMetricsQuery,
  // Actions and Recomme
  useSuperGetMetricActionsQuery,
  useSuperDeleteMetricActionMutation,
  useSuperUpdateOneActionMutation,
  useSuperGetMetricRecommendationQuery,
  useSuperDeleteMetricRecommendationMutation,
  useSuperUpdateOneRecommendationMutation,
  useSuperSelectRecommendationMutation,
  useSuperSelectActionMutation,
} = supervisorApi;
