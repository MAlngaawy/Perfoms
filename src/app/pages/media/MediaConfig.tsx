import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import MediaEventConfig from "./MediaEvent/MediaEventConfig";
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
  auth: authRoles.All,
  routes: [
    {
      path: "media-teams/media",
      element: <MediaPage />,
    },
  ],
};

export default MediaConfig;
