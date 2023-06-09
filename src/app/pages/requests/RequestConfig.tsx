import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import RequestPage from "./RequestPage";

const RequestConfig: PagesRouteConfig = {
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
      path: "requests",
      element: <RequestPage />,
    },
  ],
};

export default RequestConfig;
