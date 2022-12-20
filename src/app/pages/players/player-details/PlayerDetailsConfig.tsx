import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import PlayerDetails from "./PlayerDetails";

const PlayerCardConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Coach, ...authRoles.Supervisor, ...authRoles.Admin],
  routes: [
    {
      path: "/players/:id",
      element: <PlayerDetails />,
    },
  ],
};

export default PlayerCardConfig;
