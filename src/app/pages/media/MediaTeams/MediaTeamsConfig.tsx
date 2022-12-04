import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SelectMediaTeamPage from "./MediaTeams";

const MediaTeamsConfig: PagesRouteConfig = {
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
  auth: authRoles.All,
  routes: [
    {
      path: "/media-teams",
      element: <SelectMediaTeamPage />,
    },
  ],
};

export default MediaTeamsConfig;
