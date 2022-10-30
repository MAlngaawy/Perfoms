import { PagesRouteConfig } from "@main/types/Config-Types";
import authRoles from "app/auth/authRoles";
import ReportsPage from "./ReportsPage";

const ReportsConfig: PagesRouteConfig = {
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
      path: "Reports",
      element: <ReportsPage />,
    },
  ],
};

export default ReportsConfig;
