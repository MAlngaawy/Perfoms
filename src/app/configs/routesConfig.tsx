import AppUtils from "~/@main/utils/AppUtils";
import settingsConfig from "./settingsConfig";
import { Navigate } from "react-router-dom";
import Error404Page from "~/app/pages/404/Error404Page";
import SignInConfig from "~/app/pages/sign-in/SignInConfig";
import SignUpConfig from "~/app/pages/sign-up/SignUpConfig";
import HomeConfig from "~/app/pages/home/HomeConfig";
import MediaConfig from "~/app/pages/media/MediaConfig";
import CoachesConfig from "~/app/pages/coaches/CoachesConfig";
// import MessagesConfig from "~/app/pages/messages/MessagesConfig";
// import NotificationsConfig from "~/app/pages/notifications/NotificationsConfig";
import ReportsConfig from "~/app/pages/reports/ReportsConfig";
import SubscriptionsConfig from "~/app/pages/subscriptions/SubscriptionsConfig";
import { AppRouteObject, PagesRouteConfig } from "~/@main/types/Config-Types";
import SingleCoacheConfig from "~/app/pages/coaches/SingleCoach/SingleCoachConfig";
import ProfilePageConfig from "~/app/pages/profile/ProfileConfig";
import SettingsConfig from "~/app/pages/settings/SettingsConfig";
import MediaEventConfig from "../pages/media/MediaEvent/MediaEventConfig";
import CoachHomeConfig from "../pages/coachHome/CoachHomeConfig";
import CertificatePageConfig from "../pages/Certificate/CertificateConfig";
import CoachProfileConfig from "../pages/CoachProfile/CoachProfileConfig";
import AdminPageConfig from "../pages/Admin/AdminPageConfig";
import SingleTeamPageConfig from "../pages/Admin/SubPages/SingleTeam/SingleTeamConfig";
import SportKpisPageConfig from "../pages/Admin/SubPages/SportKpis/SportKpisConfig";
import KpiMetricsPageConfig from "../pages/Admin/SubPages/KpiMetrics/KpiMetricsConfig";

const routeConfigs: PagesRouteConfig[] = [
  SignInConfig,
  SignUpConfig,
  HomeConfig,
  MediaConfig,
  CoachesConfig,
  // MessagesConfig,
  // NotificationsConfig,
  ReportsConfig,
  SubscriptionsConfig,
  SingleCoacheConfig,
  ProfilePageConfig,
  SettingsConfig,
  MediaEventConfig,
  CoachHomeConfig,
  CertificatePageConfig,
  CoachProfileConfig,
  AdminPageConfig,
  SingleTeamPageConfig,
  SportKpisPageConfig,
  KpiMetricsPageConfig,
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
