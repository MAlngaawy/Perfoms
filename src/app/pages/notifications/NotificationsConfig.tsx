import { PagesRouteConfig } from "@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import NotificationsPage from "./NotificationsPage";

const NotificationsConfig: PagesRouteConfig = {
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
      path: "notifications",
      element: <NotificationsPage />,
    },
  ],
};

export default NotificationsConfig;
