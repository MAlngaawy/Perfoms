import authRoles from "app/auth/authRoles";
import { PagesRouteConfig } from "app/configs/routesConfig";
import MediaPage from "./MediaPage";

const MediaConfig: PagesRouteConfig = {
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
      path: "media",
      element: <MediaPage />,
    },
  ],
};

export default MediaConfig;
