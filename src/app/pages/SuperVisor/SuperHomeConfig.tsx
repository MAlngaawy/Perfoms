import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SuperHome from "./SuperHome";

const SupervisorConfig: PagesRouteConfig = {
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
  auth: authRoles.Supervisor,
  routes: [
    {
      path: "supervisor",
      element: <SuperHome />,
    },
  ],
};

export default SupervisorConfig;
