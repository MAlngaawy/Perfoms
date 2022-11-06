import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SubscriptionsPage from "./SubscriptionsPage";

const SubscriptionsConfig: PagesRouteConfig = {
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
      path: "subscriptions",
      element: <SubscriptionsPage />,
    },
  ],
};

export default SubscriptionsConfig;
