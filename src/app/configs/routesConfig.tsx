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
import PlayerCardConfig from "../pages/players/PlayerCard/PlayerCardConfig";
import CertificatePageConfig from "../pages/Certificate/CertificateConfig";
import CoachProfileConfig from "../pages/CoachProfile/CoachProfileConfig";
import AdminPageConfig from "../pages/Admin/AdminPageConfig";
import ParentCardConfig from "../pages/players/parentCard/ParentConfig";
import NotifyParentConfig from "../pages/players/notifyParent/NotifyParentConfig";
import SingleTeamPageConfig from "../pages/SubPages/SingleTeam/SingleTeamConfig";
import SportKpisPageConfig from "../pages/SubPages/SportKpis/SportKpisConfig";
import KpiMetricsPageConfig from "../pages/SubPages/KpiMetrics/KpiMetricsConfig";
import ChatConfig from "../pages/chat/ChatConfig";
import RequestConfig from "../pages/requests/RequestConfig";
import SupervisorConfig from "../pages/SuperVisor/SuperHomeConfig";
import OTPConfig from "../pages/OTP/OTPConfig";

const routeConfigs: PagesRouteConfig[] = [
  SignInConfig,
  SignUpConfig,
  HomeConfig,
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
  ParentCardConfig,
  NotifyParentConfig,
  SingleTeamPageConfig,
  SportKpisPageConfig,
  KpiMetricsPageConfig,
  ChatConfig,
  RequestConfig,
  SupervisorConfig,
  OTPConfig,
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
