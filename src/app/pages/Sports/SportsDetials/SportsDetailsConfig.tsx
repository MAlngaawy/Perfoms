import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SportsDetailsPage from "./SportsDetailsPage";

const SportsDetailsConfig: PagesRouteConfig = {
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
      path: "sports/:slug",
      element: <SportsDetailsPage />,
    },
  ],
};

export default SportsDetailsConfig;
