import authRoles from "app/auth/authRoles";
import { PagesRouteConfig } from "app/configs/routesConfig";
import HomePage from "./HomePage";

const HomeConfig: PagesRouteConfig = {
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
      path: "home",
      element: <HomePage />,
    },
  ],
};

export default HomeConfig;
