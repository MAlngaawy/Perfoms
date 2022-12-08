import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import MainReports from "./MainReports";

const MainReportsConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Supervisor, ...authRoles.Admin, ...authRoles.Coach],
  routes: [
    {
      path: "main-reports",
      element: <MainReports />,
    },
  ],
};

export default MainReportsConfig;
