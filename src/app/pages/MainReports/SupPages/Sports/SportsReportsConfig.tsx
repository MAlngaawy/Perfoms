import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SportsReports from "./SportsReports";

const SportsReportsConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Supervisor, ...authRoles.Admin],
  routes: [
    {
      path: "/main-reports/sports",
      element: <SportsReports />,
    },
  ],
};

export default SportsReportsConfig;
