import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import MediaEvent from "./MediaEvent";

const MediaEventConfig: PagesRouteConfig = {
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
      path: "/media/:id",
      element: <MediaEvent />,
    },
  ],
};

export default MediaEventConfig;
