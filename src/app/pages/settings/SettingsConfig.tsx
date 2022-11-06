import { PagesRouteConfig } from "@main/types/Config-Types";
import authRoles from "app/auth/authRoles";
import Settings from "./Settings";

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
  auth: authRoles.OnlyGuest,
  routes: [
    {
      path: "settings",
      element: <Settings />,
    },
  ],
};

export default SettingsConfig;
