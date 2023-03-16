import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import Top10SportPlayersPage from "./Top10SportPlayers";

const Top10SportPlayersConfig: PagesRouteConfig = {
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
      path: "main-reports/top10/players/sport",
      element: <Top10SportPlayersPage />,
    },
  ],
};

export default Top10SportPlayersConfig;
