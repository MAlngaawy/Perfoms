import AppUtils from "~/@main/utils/AppUtils";
import settingsConfig from "./settingsConfig";
import { Navigate } from "react-router-dom";
import Error404Page from "~/app/pages/404/Error404Page";
import SignInConfig from "~/app/pages/sign-in/SignInConfig";
import SignUpConfig from "~/app/pages/sign-up/SignUpConfig";
import HomeConfig from "~/app/pages/home/HomeConfig";
import MediaConfig from "~/app/pages/media/MediaConfig";
import CoachesConfig from "~/app/pages/coaches/CoachesConfig";
import MessagesConfig from "~/app/pages/messages/MessagesConfig";
import NotificationsConfig from "~/app/pages/notifications/NotificationsConfig";
import ReportsConfig from "~/app/pages/reports/ReportsConfig";
import SubscriptionsConfig from "~/app/pages/subscriptions/SubscriptionsConfig";
import { AppRouteObject, PagesRouteConfig } from "~/@main/types/Config-Types";
import SingleCoacheConfig from "~/app/pages/coaches/SingleCoach/SingleCoachConfig";
import ProfilePageConfig from "~/app/pages/profile/ProfileConfig";
import SettingsConfig from "~/app/pages/settings/SettingsConfig";
import MediaEventConfig from "../pages/media/MediaEvent/MediaEventConfig";
import CoachHomeConfig from "../pages/coachHome/CoachHomeConfig";
import PlayersConfig from "../pages/players/PlayersConfig";
import PlayerCardConfig from "../pages/players/player-details/PlayerDetailsConfig";
import CertificatePageConfig from "../pages/Certificate/CertificateConfig";
import CoachProfileConfig from "../pages/CoachProfile/CoachProfileConfig";
import AdminPageConfig from "../pages/Admin/AdminPageConfig";
import NotifyParentConfig from "../pages/players/notifyParent/NotifyParentConfig";
import SingleTeamPageConfig from "../pages/SubPages/SingleTeam/SingleTeamConfig";
import PillarKpisPageConfig from "../pages/SubPages/PillarKpis/PillarKpisConfig";
import KpiMetricsPageConfig from "../pages/SubPages/KpiMetrics/KpiMetricsConfig";
import ChatConfig from "../pages/chat/ChatConfig";
import RequestConfig from "../pages/requests/RequestConfig";
import SupervisorConfig from "../pages/SuperVisor/SuperHomeConfig";
import MediaTeamsConfig from "../pages/media/MediaTeams/MediaTeamsConfig";
import OTPConfig from "../pages/OTP/OTPConfig";
import SingleNotificationConfig from "../pages/notifications/singleNotificatin/SingleNotificationConfig";
import MainReportsConfig from "../pages/MainReports/MainReportsConfig";
import SearchPlayersPageConfig from "../pages/MainReports/SupPages/Players/SearchPlayersPageConfig";
import SportsReportsConfig from "../pages/MainReports/SupPages/Sports/SportsReportsConfig";
import PlayerPageConfig from "../pages/MainReports/SupPages/Players/Player/PlayerConfig";
import TeamsReportsConfig from "../pages/MainReports/SupPages/Teams/TeamsReportsConfig";
import OneTeamPageConfig from "../pages/MainReports/SupPages/Teams/OneTeam/OneTeamConfig";
import TeamMembersKpiConfig from "../pages/MainReports/SupPages/Teams/OneTeam/TeamMembersKpi/TeamMemberKpiConfig";
import PlayerCertificateConfig from "../pages/player-certificate/PlayerCertificateConfig";
import SportPillarsPageConfig from "../pages/SubPages/SportPillars/SportPillarsConfig";
import ForgotPassConfig from "../pages/sign-in/ForgotPasswordPage/ForgotPassConfig";
import ResetPasswordConfig from "../pages/ResetPassword/ResetPasswordConfig";
import RequestSentConfig from "../pages/OTP/RequestSent/RequestSentConfig";
import AdminProfilePageConfig from "../pages/AdminProfile/AdminProfileConfig";
import AlbumMediaConfig from "../pages/players/player-details/Tabs/PlayerMedia/AlbumMedia/AlbumMediaConfig";
import ScoringPageConfig from "../pages/Scoring/ScoringPageConfig";
import ScoringTablesConfig from "../pages/Scoring/SupPages/ScoringTablesConfig";
import Top10Config from "../pages/MainReports/SupPages/Top10/Top10Config";
import Top10CoachesConfig from "../pages/MainReports/SupPages/Top10/SupPages/Coaches/Top10CoachesConfig";
import Top10PlayersConfig from "../pages/MainReports/SupPages/Top10/SupPages/Players/Top10PlayersConfig";
import Top10ClubPlayersConfig from "../pages/MainReports/SupPages/Top10/SupPages/Players/Top10ClubPlayers/Top10ClubPlayersConfig";
import Top10SportPlayersConfig from "../pages/MainReports/SupPages/Top10/SupPages/Players/Top10SportPlayers/Top10SportPlayersConig";
import Top10KpiPlayersConfig from "../pages/MainReports/SupPages/Top10/SupPages/Players/Top10SportPlayers/Top10KpiPlayers/Top10KpiPlayersConfig";
import SubCoachConfig from "../pages/SubCoach/SubCoachConfig";
import HealthConfig from "../pages/health/HealthConfig";
import HealthSignInConfig from "../pages/health/sign-in/HealthSignInConfig";
import Oauth2callbackConfig from "../pages/health/oauth2callback/Oauth2callbackConfig";


import HelpCenterConfig from "../pages/HelpCenter/HelpCenterConfig";
import HelpCenterDetailsConfig from "../pages/HelpCenter/HelpCenterDetials/HelpCenterConfig";
import SportsConfig from "../pages/Sports/SportsConfig";
import SportsDetailsConfig from "../pages/Sports/SportsDetials/SportsDetailsConfig";


const routeConfigs: PagesRouteConfig[] = [
  SignInConfig,
  SignUpConfig,
  HomeConfig,
  HealthConfig,
  HealthSignInConfig,
  MediaConfig,
  ChatConfig,
  CoachesConfig,
  MessagesConfig,
  NotificationsConfig,
  ReportsConfig,
  SubscriptionsConfig,
  SingleCoacheConfig,
  ProfilePageConfig,
  SettingsConfig,
  MediaEventConfig,
  CoachHomeConfig,
  PlayersConfig,
  PlayerCardConfig,
  CertificatePageConfig,
  CoachProfileConfig,
  AdminPageConfig,
  NotifyParentConfig,
  SingleTeamPageConfig,
  PillarKpisPageConfig,
  KpiMetricsPageConfig,
  ChatConfig,
  RequestConfig,
  SupervisorConfig,
  MediaTeamsConfig,
  OTPConfig,
  SingleNotificationConfig,
  MainReportsConfig,
  SearchPlayersPageConfig,
  SportsReportsConfig,
  PlayerPageConfig,
  TeamsReportsConfig,
  OneTeamPageConfig,
  TeamMembersKpiConfig,
  PlayerCertificateConfig,
  SportPillarsPageConfig,
  ForgotPassConfig,
  ResetPasswordConfig,
  RequestSentConfig,
  AdminProfilePageConfig,
  AlbumMediaConfig,
  ScoringPageConfig,
  ScoringTablesConfig,
  Top10Config,
  Top10CoachesConfig,
  Top10PlayersConfig,
  Top10ClubPlayersConfig,
  Top10SportPlayersConfig,
  Top10KpiPlayersConfig,

  SubCoachConfig,HelpCenterConfig,HelpCenterDetailsConfig,SportsConfig,SportsDetailsConfig, Oauth2callbackConfig

];

const routes: AppRouteObject[] = [
  ...AppUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
];

export default routes;
