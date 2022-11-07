import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import ProfilePage from "./ProfilePage";

const ProfilePageConfig: PagesRouteConfig = {
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
      path: "profile",
      element: <ProfilePage />,
    },
  ],
};

export default ProfilePageConfig;
