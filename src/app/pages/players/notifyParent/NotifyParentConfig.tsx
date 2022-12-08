import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import NotifyParent from "./NotifyParent";

const NotifyParentConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Coach, ...authRoles.Supervisor],
  routes: [
    {
      path: "players/:player_id/parent/:parent_id/notify",
      element: <NotifyParent />,
    },
  ],
};

export default NotifyParentConfig;
