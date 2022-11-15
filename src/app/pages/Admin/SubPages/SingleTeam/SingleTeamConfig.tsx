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
  auth: authRoles.User,
  routes: [
    {
      path: "admin/teams/:id",
      element: <SingleTeam />,
    },
  ],
};

export default SingleTeamPageConfig;
