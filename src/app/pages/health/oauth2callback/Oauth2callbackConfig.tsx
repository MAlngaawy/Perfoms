import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import Oauth2callbackPage from "./Oauth2callbackPage";

const Oauth2callbackConfig: PagesRouteConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: true,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: true,
        },
      },
    },
  },
  auth: authRoles.Parent,
  routes: [
    {
      path: "oauth2callback",
      element: <Oauth2callbackPage />,
    },
  ],
};

export default Oauth2callbackConfig;
