import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import Top10Coaches from "./Top10Coaches";

const Top10CoachesConfig: PagesRouteConfig = {
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
      path: "main-reports/top10/coaches",
      element: <Top10Coaches />,
    },
  ],
};

export default Top10CoachesConfig;
