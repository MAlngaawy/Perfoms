import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import Top10KpiPlayers from "./Top10KpiPlayers";

const Top10KpiPlayersConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Supervisor, ...authRoles.Admin, ...authRoles.Coach],
  routes: [
    {
      path: "main-reports/top10/players/sport/:kpi_id",
      element: <Top10KpiPlayers />,
    },
  ],
};

export default Top10KpiPlayersConfig;
