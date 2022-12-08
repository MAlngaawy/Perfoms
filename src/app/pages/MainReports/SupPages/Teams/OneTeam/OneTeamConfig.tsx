import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import OneTeam from "./OneTeam";

const OneTeamPageConfig: PagesRouteConfig = {
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
      path: "main-reports/sports/teams/:id",
      element: <OneTeam />,
    },
  ],
};

export default OneTeamPageConfig;
