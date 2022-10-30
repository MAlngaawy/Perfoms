import authRoles from "app/auth/authRoles";
import { PagesRouteConfig } from "app/configs/routesConfig";
import CoachesPage from "./CoachesPage";

const CoachesConfig: PagesRouteConfig = {
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
      path: "coaches",
      element: <CoachesPage />,
    },
  ],
};

export default CoachesConfig;
