import AppUtils from "@main/utils/AppUtils";
import settingsConfig from "./settingsConfig";
import { Navigate, RouteObject } from "react-router-dom";
import Error404Page from "app/pages/404/Error404Page";
import ExampleConfig from "app/pages/example/ExampleConfig";
import SignInConfig from "app/pages/sign-in/SignInConfig";
import SignUpConfig from "app/pages/sign-up/SignUpConfig";

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
  ExampleConfig,
];

const routes: AppRouteObject[] = [
  ...AppUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/example" />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
];

console.log(routes);

export default routes;
