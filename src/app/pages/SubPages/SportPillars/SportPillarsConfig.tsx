import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SportPillars from "./SportPillars";

const SportPillarsPageConfig: PagesRouteConfig = {
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
      path: "admin/sports/:sport_id/pillars",
      element: <SportPillars />,
    },
    {
      path: "supervisor/sports/:sport_id/pillars",
      element: <SportPillars />,
    },
  ],
};

export default SportPillarsPageConfig;
