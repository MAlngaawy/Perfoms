import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import ScoringTables from "./ScoringTables";

const ScoringTablesConfig: PagesRouteConfig = {
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
      path: "scoring/:team_id/scoring-tables",
      element: <ScoringTables />,
    },
  ],
};

export default ScoringTablesConfig;
