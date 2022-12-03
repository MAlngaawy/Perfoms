import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import Certificate from "./Certificate";

const CertificatePageConfig: PagesRouteConfig = {
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
  auth: authRoles.Coach,
  routes: [
    {
      path: "certificate",
      element: <Certificate />,
    },
  ],
};

export default CertificatePageConfig;
