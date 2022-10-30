import AppUtils from "@main/utils/AppUtils";
import settingsConfig from "./settingsConfig";
import { Navigate, RouteObject } from "react-router-dom";
import Error404Page from "app/pages/404/Error404Page";
import SignInConfig from "app/pages/sign-in/SignInConfig";
import SignUpConfig from "app/pages/sign-up/SignUpConfig";
import HomeConfig from "app/pages/home/HomeConfig";
import MediaConfig from "app/pages/media/MediaConfig";
import CoachesConfig from "app/pages/coaches/CoachesConfig";
import MessagesConfig from "app/pages/messages/MessagesConfig";
import NotificationsConfig from "app/pages/notifications/NotificationsConfig";
import ReportsConfig from "app/pages/reports/ReportsConfig";
import SubscriptionsConfig from "app/pages/subscriptions/SubscriptionsConfig";

export type AppRouteObject = RouteObject & {
  auth?: string[];
  settings?: object;
};

export interface PagesRouteConfig {
  settings?: object;
  auth?: string[];
  routes: AppRouteObject[];
}

const routeConfigs: PagesRouteConfig[] = [
  SignInConfig,
  SignUpConfig,
  HomeConfig,
  MediaConfig,
  CoachesConfig,
  MessagesConfig,
  NotificationsConfig,
  ReportsConfig,
  SubscriptionsConfig,
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

console.log(routes);

export default routes;
