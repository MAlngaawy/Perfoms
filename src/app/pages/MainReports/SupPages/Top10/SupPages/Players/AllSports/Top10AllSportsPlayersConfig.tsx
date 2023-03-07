import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import Top10AllSportsPlayersPage from "./Top10AllSportsPlayersPage";

const Top10AllSportsPlayersConfig: PagesRouteConfig = {
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
      path: "main-reports/top10/players/all-sports",
      element: <Top10AllSportsPlayersPage />,
    },
  ],
};

export default Top10AllSportsPlayersConfig;
