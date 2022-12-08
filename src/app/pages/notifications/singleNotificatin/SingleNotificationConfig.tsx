import { PagesRouteConfig } from "@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SingleNotification from "./SingleNotification";

const SingleNotificationConfig: PagesRouteConfig = {
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
      path: "notifications/notification",
      element: <SingleNotification />,
    },
  ],
};

export default SingleNotificationConfig;
