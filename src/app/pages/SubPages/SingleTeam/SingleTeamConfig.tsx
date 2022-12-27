import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SingleTeam from "./SingleTeam";

const SingleTeamPageConfig: PagesRouteConfig = {
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
      path: "admin/teams/:team_id",
      element: <SingleTeam />,
    },
    {
      path: "supervisor/teams/:team_id",
      element: <SingleTeam />,
    },
  ],
};

export default SingleTeamPageConfig;
