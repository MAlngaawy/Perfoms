import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import HealthPage from "./HealthPage";

const HealthConfig: PagesRouteConfig = {
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
      path: "health",
      element: <HealthPage />,
    },
  ],
};

export default HealthConfig;
