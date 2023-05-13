import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import HealthSignInPage from "./HealthSignInPage";

const HealthSignInConfig: PagesRouteConfig = {
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
      path: "health/authorize",
      element: <HealthSignInPage />,
    },
  ],
};

export default HealthSignInConfig;
