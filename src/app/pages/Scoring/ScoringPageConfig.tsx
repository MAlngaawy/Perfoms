import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import ScoringPage from "./ScoringPage";

const ScoringPageConfig: PagesRouteConfig = {
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
  auth: authRoles.Supervisor,
  routes: [
    {
      path: "/scoring",
      element: <ScoringPage />,
    },
  ],
};

export default ScoringPageConfig;
