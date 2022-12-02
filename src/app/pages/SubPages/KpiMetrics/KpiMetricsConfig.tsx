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
  auth: authRoles.User,
  routes: [
    {
      path: "supervisor/sports/:id/kpis/:id",
      element: <KpiMetrics />,
    },
  ],
};

export default KpiMetricsPageConfig;
