import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import CoachHome from "./CoachHome";

const CoachHomeConfig: PagesRouteConfig = {
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
  auth: authRoles.Coach,
  routes: [
    {
      path: "/",
      element: <CoachHome />,
    },
  ],
};

export default CoachHomeConfig;
