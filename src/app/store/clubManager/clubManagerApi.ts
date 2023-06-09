import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import {
  AddEvent,
  AddRecommendation,
  AddSubCoach,
  AllUsers,
  ClubParents,
  CoachesRequests,
  MetricNotes,
  Sports,
  SportsStatistics,
  TeamPlayer,
  TeamPlayers,
  Teams,
  Top10ClubPlayers,
  Top10SportPlayers,
  TopTenKpiPlayers,
  TopTenSportKpis,
  UpdateNote,
  UpdateUserType,
} from "../types/clubManager-types";
import {
  EventFiles,
  ParentClub,
  PlayerAttendances,
  PlayerKpis,
  PlayerMetricScores,
  PlayerRecommendations,
  TeamCoaches,
} from "../types/parent-types";
import { TeamEvents } from "~/app/store/types/parent-types";
import {
  AddAction,
  AddAttendanceSession,
  AddTeamCalendar,
  Coaches,
  CoachRequests,
  Kpis,
  Pillars,
  SuperVisorPlayers,
  SuperVisorTeamInfo,
  Team,
  TeamAttendance,
  TeamCoach,
} from "../types/supervisor-types";
import {
  CoachPlayerInfo,
  PlayerMonthsAttendancesStatistics,
  PlayerParent,
  TeamKpiPlayersStatistics,
  TeamPlayersAttendStatistics,
  TeamsStatistics,
} from "../types/coach-types";

export const clubManagerApi = createApi({
  reducerPath: "clubManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/club-manager`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: [
    "clubManager",
    "teams",
    "calendar",
    "coaches",
    "events",
    "players",
    "playerUser",
    "coachUser",
    "supervisorUser",
    "subCoachesUser",
    "pillars",
    "metrics",
    "actions",
    "recommendations",
    "attendance",
  ],
  endpoints: ({ query, mutation }) => ({
    manageCoachesRequests: query<CoachRequests, { page?: number }>({
      query: (params) => ({ url: "coaches/requests", params }),
      providesTags: ["clubManager"],
    }),

    adminAcceptCoachRequest: mutation<
      CoachesRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/requests/${coach_id}/accept/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["clubManager"],
    }),

    adminDeclineCoachRequest: mutation<
      CoachesRequests,
      { coach_id: string | number }
    >({
      query: ({ coach_id, ...body }) => ({
        url: `coaches/requests/${coach_id}/decline`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["clubManager"],
    }),

    adminSports: query<Sports, { club_id: number | undefined; page?: number }>({
      query: ({ club_id, ...params }) => ({ url: `sports/${club_id}`, params }),
      providesTags: ["clubManager"],
    }),

    adminTeams: query<
      Teams,
      {
        club_id: number | undefined;
        sport_id: number | undefined;
        page?: number;
      }
    >({
      query: ({ club_id, sport_id, ...params }) => ({
        url: `teams-list/${club_id}/${sport_id}`,
        params,
      }),
      providesTags: ["teams", "playerUser", "players"],
    }),

    adminDeleteTeam: mutation<{}, { team_id: number }>({
      query: ({ team_id, ...body }) => ({
        url: `teams/${team_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["teams"],
    }),

    adminAddNewTeam: mutation<Team, { sport_id: number | string | undefined }>({
      query: ({ sport_id, ...body }) => ({
        url: `teams/${sport_id}/add-team/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["teams"],
    }),

    adminTeamAttendance: query<
      TeamAttendance,
      {
        team_id: number;
        year: string;
        month: string;
        page?: number;
      }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/attendance/`,
        params,
      }),
      providesTags: ["calendar"],
    }),

    adminAddTeamCalendar: mutation<AddTeamCalendar, {}>({
      query: (body) => ({
        url: `teams/add-team-calendar/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["calendar"],
    }),

    adminTeamCoaches: query<TeamCoaches, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/coaches/`,
        params,
      }),
      providesTags: ["coaches"],
    }),

    adminRemoveTeamCoach: mutation<TeamCoach, {}>({
      query: ({ ...body }) => ({
        url: `teams/remove-team-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["coaches"],
    }),

    adminAllCoaches: query<
      Coaches,
      { club_id: number | string | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `users/coaches/${club_id}`,
        params,
      }),
      providesTags: ["coaches"],
    }),

    adminAddTeamCoaches: mutation<TeamCoach, {}>({
      query: ({ ...body }) => ({
        url: `teams/add-team-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["coaches"],
    }),

    adminTeamEvents: query<
      TeamEvents,
      { team_id: string | number; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/events/`,
        params,
      }),
      providesTags: ["events"],
    }),

    adminAddEvent: mutation<AddEvent, {}>({
      query: ({ ...body }) => ({
        url: `teams/events/add-event/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["events"],
    }),

    adminTeamInfo: query<
      SuperVisorTeamInfo,
      { team_id: string | undefined; page?: number }
    >({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/`,
        params,
      }),
    }),

    adminTeamPlaers: query<TeamPlayers, { team_id: string; page?: number }>({
      query: ({ team_id, ...params }) => ({
        url: `teams/${team_id}/players/`,
        params,
      }),
      providesTags: ["players"],
    }),

    adminClub: query<ParentClub, { pages?: number }>({
      query: (params) => "my-club/",
    }),

    adminDeleteEvent: mutation<{}, { event_id: number }>({
      query: ({ event_id, ...body }) => ({
        url: `teams/events/${event_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["events"],
    }),

    adminPlayers: query<
      TeamPlayers,
      { club_id: number | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `users/players/${club_id}`,
        params,
      }),
      providesTags: ["players", "playerUser"],
    }),

    adminClubParents: query<
      ClubParents,
      { club_id: number | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `users/parents/${club_id}`,
        params,
      }),
    }),

    adminCoaches: query<
      AllUsers,
      { club_id: number | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `users/coaches/${club_id}`,
        params,
      }),
      providesTags: ["coachUser", "subCoachesUser"],
    }),

    adminSupervisors: query<
      AllUsers,
      { club_id: number | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `users/supervisors/${club_id}`,
        params,
      }),
      providesTags: ["supervisorUser"],
    }),

    adminSubCoach: query<
      AllUsers,
      { club_id: number | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `users/sub-coaches/${club_id}`,
        params,
      }),
      providesTags: ["subCoachesUser", "coachUser"],
    }),

    adminAddTeamPlayer: mutation<TeamPlayer, {}>({
      query: ({ ...body }) => ({
        url: `teams/add-team-player/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["players", "teams", "playerUser"],
    }),

    adminRemoveTeamPlayer: mutation<TeamPlayer, {}>({
      query: ({ ...body }) => ({
        url: `teams/remove-team-player/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["players"],
    }),

    adminDeletePlayer: mutation<{}, { player_id: string }>({
      query: ({ player_id, ...body }) => ({
        url: `users/${player_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["playerUser"],
    }),

    adminDeleteCoach: mutation<{}, { coach_id: string }>({
      query: ({ coach_id, ...body }) => ({
        url: `users/coaches/${coach_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["coachUser"],
    }),

    adminDeleteSupervisor: mutation<{}, { supervisor_id: string }>({
      query: ({ supervisor_id, ...body }) => ({
        url: `users/supervisors/${supervisor_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["supervisorUser"],
    }),

    adminDeleteSubCoach: mutation<{}, { subCoach_id: string }>({
      query: ({ subCoach_id, ...body }) => ({
        url: `users/sub-coaches/${subCoach_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["subCoachesUser"],
    }),

    adminAddSubCoach: mutation<AddSubCoach, AddSubCoach>({
      query: (body) => ({
        url: `users/sub-coaches/add-sub-coach/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["subCoachesUser"],
    }),

    adminUpdateUserType: mutation<UpdateUserType, UpdateUserType>({
      query: ({ id, ...body }) => ({
        url: `users/update-user-type/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["subCoachesUser", "coachUser"],
    }),

    adminDeleteSport: mutation<{}, { sport_id: string }>({
      query: ({ sport_id, ...body }) => ({
        url: `sports/${sport_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["clubManager"],
    }),

    adminPillars: query<
      Pillars,
      { sport_id: number | string | undefined; page?: number }
    >({
      query: ({ sport_id, ...params }) => ({
        url: `sports/${sport_id}/pillars/`,
        params,
      }),
    }),

    adminDeletePillar: mutation<{}, { pillar_id: string | number | undefined }>(
      {
        query: ({ pillar_id, ...params }) => ({
          url: `sports/pillars/${pillar_id}/delete`,
          method: "DELETE",
        }),
      }
    ),

    adminKpis: query<
      Kpis,
      { pillar_id: string | number | undefined; page?: number }
    >({
      query: ({ pillar_id, ...params }) => ({
        url: `sports/${pillar_id}/kpis/`,
        params,
      }),
    }),

    adminDeleteKpi: mutation<
      { kpi_id: number },
      { kpi_id: number | string | undefined }
    >({
      query: ({ kpi_id, ...params }) => ({
        url: `sports/kpis/${kpi_id}/delete/`,
        params,
        method: "DELETE",
      }),
    }),

    adminMetrics: query<
      Kpis,
      { kpi_id: string | number | undefined; page?: number }
    >({
      query: ({ kpi_id, ...params }) => ({
        url: `kpis/${kpi_id}/metrics/`,
        params,
      }),
      providesTags: ["metrics"],
    }),

    adminDeleteMetric: mutation<{}, { metric_id: string }>({
      query: ({ metric_id, ...body }) => ({
        url: `kpis/metrics/${metric_id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["metrics"],
    }),

    adminAddRecommendations: mutation<AddRecommendation, AddRecommendation>({
      query: ({ metric_id, ...body }) => ({
        url: `kpis/metrics/${metric_id}/add-recommendation/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["recommendations"],
    }),

    adminAddActopn: mutation<AddAction, AddAction>({
      query: ({ metric_id, ...body }) => ({
        url: `kpis/metrics/${metric_id}/add-action/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["actions"],
    }),

    adminEventFiles: query<EventFiles, { event_id: number; page?: number }>({
      query: ({ event_id, ...params }) => ({
        url: `/${event_id}/files`,
        params,
      }),
    }),

    // Main reports API

    adminSportStatistics: query<
      SportsStatistics,
      { club_id: number | undefined; page?: number }
    >({
      query: ({ club_id, ...params }) => ({
        url: `statistics/sports/${club_id}`,
      }),
    }),

    adminTeamsStatistics: query<
      TeamsStatistics,
      { sport_id: number | string | undefined; pages?: number }
    >({
      query: ({ sport_id, ...params }) => ({
        url: `statistics/sports/teams/${sport_id}`,
        params,
      }),
    }),

    adminTeamKpisStatistics: query<
      TeamsStatistics,
      {
        sport_id: number | string | undefined;
        team_id: number | string | undefined;
        pages?: number;
      }
    >({
      query: ({ sport_id, team_id, ...params }) => ({
        url: `statistics/sports/teams/kpis/${sport_id}/${team_id}`,
        params,
      }),
    }),

    adminTeamKpiPlayersStatistics: query<
      TeamKpiPlayersStatistics,
      {
        kpi_id: string | number | undefined;
        team_id: string | number | undefined;
        date_from: string;
        date_to: string;
        pages?: number;
      }
    >({
      query: ({ kpi_id, team_id, ...params }) => ({
        url: `statistics/kpis/${kpi_id}/${team_id}/`,
        params,
      }),
    }),

    adminTeamAttendPlayersStatistics: query<
      TeamPlayersAttendStatistics,
      {
        sport_id: number | string | undefined;
        team_id: number | string | undefined;
        date_from: string;
        date_to: string;
        pages?: number;
      }
    >({
      query: ({ sport_id, team_id, ...params }) => ({
        url: `statistics/attends/${sport_id}/${team_id}/`,
        params,
      }),
    }),

    adminPlayerInfo: query<
      CoachPlayerInfo,
      { player_id: number | string | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `teams/players/${player_id}/`,
        params,
      }),
    }),

    adminPlayerParentInfo: query<
      PlayerParent,
      { player_id: number | string | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `teams/players/${player_id}/parent`,
        params,
      }),
    }),

    adminPlayerKpiStatistics: query<
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

    adminPlayersAttendStatistics: query<
      PlayerMonthsAttendancesStatistics,
      { player_id: string | undefined; pages?: number }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/calendar-detailed/${player_id}/`,
        params,
      }),
    }),

    adminPlayerKpisMetricsStatistics: query<
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

    adminPlayerKpisMetricsModerateScore: query<
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

    adminPlayerKpisMetricsStrengthScore: query<
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

    adminPlayerKpisMetricsWeaknessScore: query<
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

    adminPlayerRecommendations: query<
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

    adminPlayerActions: query<
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

    adminPlayerCalendar: query<
      PlayerAttendances,
      {
        player_id: string | number | undefined;
        pages?: number;
        date_from: string | undefined;
        date_to: string | undefined;
      }
    >({
      query: ({ player_id, ...params }) => ({
        url: `statistics/${player_id}/calendar`,
        params,
      }),
    }),

    TopTenCoaches: query<{}, {}>({
      query: (param) => ({
        url: "top-ten/sports/coaches",
      }),
    }),

    TopTenClubPlayers: query<Top10ClubPlayers, {}>({
      query: (param) => ({
        url: "top-ten-club-players",
      }),
    }),

    TopTenSportPlayers: query<Top10SportPlayers, { sport_id: number }>({
      query: ({ sport_id, ...param }) => ({
        url: `top-ten-sport-players/${sport_id}`,
      }),
    }),

    TopTenSportKpis: query<TopTenSportKpis, { sport_id: number }>({
      query: ({ sport_id, ...param }) => ({
        url: `top-ten-sport-kpis/${sport_id}`,
      }),
    }),

    TopTenKpiPlayers: query<
      TopTenKpiPlayers,
      { kpi_id: number | string | undefined }
    >({
      query: ({ kpi_id, ...param }) => ({
        url: `top-ten-kpi-players/${kpi_id}`,
      }),
    }),

    getMetricActions: query<MetricNotes, { metric_id: number }>({
      query: ({ metric_id, ...params }) => ({
        url: `metric-actions/${metric_id}`,
        params,
      }),
      providesTags: ["actions"],
    }),

    deleteMetricAction: mutation<{}, { action_id: number }>({
      query: ({ action_id }) => ({
        url: `delete-action/${action_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["actions"],
    }),

    UpdateOneAction: mutation<UpdateNote, { action_id: number }>({
      query: ({ action_id, ...body }) => ({
        url: `update-action/${action_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["actions"],
    }),

    getMetricRecommendation: query<MetricNotes, { metric_id: number }>({
      query: ({ metric_id, ...params }) => ({
        url: `metric-recommendations/${metric_id}`,
        params,
      }),
      providesTags: ["recommendations"],
    }),

    deleteMetricRecommendation: mutation<{}, { recommendation_id: number }>({
      query: ({ recommendation_id }) => ({
        url: `delete-recommendation/${recommendation_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["recommendations"],
    }),

    UpdateOneRecommendation: mutation<
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
    selectRecommendation: mutation<{}, { recommendation_id: number }>({
      query: ({ recommendation_id, ...body }) => ({
        url: `select-recommendation/${recommendation_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["recommendations"],
    }),
    selectAction: mutation<{}, { action_id: number }>({
      query: ({ action_id, ...body }) => ({
        url: `select-action/${action_id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["actions"],
    }),
    adminAddTeamAttendanceSession: mutation<
      AddAttendanceSession,
      { team_id: number | string | undefined }
    >({
      query: ({ team_id, ...body }) => ({
        url: `teams/add-team-attendance-session/${team_id}/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["calendar"],
    }),

    adminDeleteTeamAttendanceSession: mutation<
      AddAttendanceSession,
      { team_id: number | string | undefined }
    >({
      query: ({ team_id, ...body }) => ({
        url: `teams/add-team-attendance-session/${team_id}/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["calendar"],
    }),
  }),
});

export const {
  useManageCoachesRequestsQuery,
  useAdminAcceptCoachRequestMutation,
  useAdminDeclineCoachRequestMutation,
  useAdminSportsQuery,
  useAdminTeamsQuery,
  useAdminDeleteTeamMutation,
  useAdminAddNewTeamMutation,
  useAdminTeamAttendanceQuery,
  useAdminAddTeamCalendarMutation,
  useAdminTeamCoachesQuery,
  useAdminRemoveTeamCoachMutation,
  useAdminAllCoachesQuery,
  useAdminAddTeamCoachesMutation,
  useAdminTeamEventsQuery,
  useAdminAddEventMutation,
  useAdminTeamInfoQuery,
  useAdminTeamPlaersQuery,
  useAdminClubQuery,
  useAdminDeleteEventMutation,
  useAdminPlayersQuery,
  useAdminCoachesQuery,
  useAdminSupervisorsQuery,
  useAdminSubCoachQuery,
  useAdminAddTeamPlayerMutation,
  useAdminRemoveTeamPlayerMutation,
  useAdminDeletePlayerMutation,
  useAdminDeleteCoachMutation,
  useAdminDeleteSupervisorMutation,
  useAdminDeleteSubCoachMutation,
  useAdminAddSubCoachMutation,
  useAdminUpdateUserTypeMutation,
  useAdminDeleteSportMutation,
  useAdminPillarsQuery,
  useAdminDeletePillarMutation,
  useAdminKpisQuery,
  useAdminDeleteKpiMutation,
  useAdminMetricsQuery,
  useAdminDeleteMetricMutation,
  useAdminAddRecommendationsMutation,
  useAdminAddActopnMutation,
  useAdminEventFilesQuery,
  // Main Reports APIs
  useAdminSportStatisticsQuery,
  useAdminTeamsStatisticsQuery,
  useAdminTeamKpisStatisticsQuery,
  useAdminTeamKpiPlayersStatisticsQuery,
  useAdminTeamAttendPlayersStatisticsQuery,
  useAdminPlayerInfoQuery,
  useAdminPlayerParentInfoQuery,
  useAdminPlayerKpiStatisticsQuery,
  useAdminPlayersAttendStatisticsQuery,
  useAdminPlayerKpisMetricsStatisticsQuery,
  useAdminPlayerKpisMetricsModerateScoreQuery,
  useAdminPlayerKpisMetricsStrengthScoreQuery,
  useAdminPlayerKpisMetricsWeaknessScoreQuery,
  useAdminPlayerRecommendationsQuery,
  useAdminPlayerActionsQuery,
  useAdminPlayerCalendarQuery,
  useAdminClubParentsQuery,
  useTopTenCoachesQuery,
  useTopTenClubPlayersQuery,
  useTopTenSportPlayersQuery,
  useTopTenSportKpisQuery,
  useTopTenKpiPlayersQuery,
  useGetMetricActionsQuery,
  useDeleteMetricActionMutation,
  useUpdateOneActionMutation,
  useGetMetricRecommendationQuery,
  useDeleteMetricRecommendationMutation,
  useUpdateOneRecommendationMutation,
  useSelectRecommendationMutation,
  useSelectActionMutation,
  useAdminAddTeamAttendanceSessionMutation,
  useAdminDeleteTeamAttendanceSessionMutation,
} = clubManagerApi;
