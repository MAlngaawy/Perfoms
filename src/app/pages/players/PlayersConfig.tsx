import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import PlayersPage from "./PlayersPage";

const PlayersConfig: PagesRouteConfig = {
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
  auth: authRoles.Coach,
  routes: [
    {
      path: "players",
      element: <PlayersPage />,
    },
  ],
};

export default PlayersConfig;
