import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SportKpis from "./SportKpis";

const SportKpisPageConfig: PagesRouteConfig = {
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
      path: "admin/sports/:id",
      element: <SportKpis />,
    },
    {
      path: "supervisor/sports/:id",
      element: <SportKpis />,
    },
  ],
};

export default SportKpisPageConfig;
