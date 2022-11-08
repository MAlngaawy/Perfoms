import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SettingsPage from "./SettingsPage";

const SettingsConfig: PagesRouteConfig = {
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
      path: "settings",
      element: <SettingsPage />,
    },
  ],
};

export default SettingsConfig;
