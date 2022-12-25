import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import PillarKpis from "./PillarKpis";

const PillarKpisPageConfig: PagesRouteConfig = {
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
      path: "admin/sports/:sport_id/pillars/:pillar_id/kpis",
      element: <PillarKpis />,
    },
    {
      path: "supervisor/sports/:sport_id/pillars/:pillar_id/kpis",
      element: <PillarKpis />,
    },
  ],
};

export default PillarKpisPageConfig;
