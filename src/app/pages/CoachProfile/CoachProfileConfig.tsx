import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import CoachProfilePage from "./CoachProfilePage";

const CoachProfileConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Coach, ...authRoles.Supervisor],
  routes: [
    {
      path: "coach-profile",
      element: <CoachProfilePage />,
    },
  ],
};

export default CoachProfileConfig;
