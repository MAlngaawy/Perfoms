import authRoles from "app/auth/authRoles";
import { PagesRouteConfig } from "app/configs/routesConfig";
import MessagesPage from "./MessagesPage";

const MessagesConfig: PagesRouteConfig = {
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
      path: "messages",
      element: <MessagesPage />,
    },
  ],
};

export default MessagesConfig;
