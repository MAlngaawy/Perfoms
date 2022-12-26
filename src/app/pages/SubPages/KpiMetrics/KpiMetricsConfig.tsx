import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import KpiMetrics from "./KpiMetrics";

const KpiMetricsPageConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Supervisor, ...authRoles.Admin],
  routes: [
    {
      path: "admin/sports/:sport_id/pillars/:pillar_id/kpis/:kpi_id/metrics",
      element: <KpiMetrics />,
    },
    {
      path: "supervisor/sports/:sport_id/pillars/:pillar_id/kpis/:kpi_id/metrics",
      element: <KpiMetrics />,
    },
  ],
};

export default KpiMetricsPageConfig;
