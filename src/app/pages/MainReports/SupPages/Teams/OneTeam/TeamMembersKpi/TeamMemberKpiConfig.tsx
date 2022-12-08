import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import TeamMembersKpi from "./TeamMembersKpi";

const TeamMembersKpiConfig: PagesRouteConfig = {
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
      path: "main-reports/sports/teams/:id/kpi/:kpi_id",
      element: <TeamMembersKpi />,
    },
  ],
};

export default TeamMembersKpiConfig;
