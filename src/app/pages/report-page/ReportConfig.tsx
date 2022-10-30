import authRoles from "app/auth/authRoles";
import { PagesRouteConfig } from "app/configs/routesConfig";
import ReportPage from "./ReportPage";

const ReportConfig: PagesRouteConfig = {
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
  // edit this part of Auth
  auth: authRoles.User,
  routes: [
    {
      path: "report-page",
      element: <ReportPage />,
    },
  ],
};

export default ReportConfig;
