import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import HelpCenterDetailsPage from "./HelpCenterDetailsPage";

const HelpCenterDetailsConfig: PagesRouteConfig = {
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
  auth: authRoles.Parent,
  routes: [
    {
      path: "help-center/:slug",
      element: <HelpCenterDetailsPage />,
    },
  ],
};

export default HelpCenterDetailsConfig;
