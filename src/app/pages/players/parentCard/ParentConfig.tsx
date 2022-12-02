import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import ParentCard from "./ParentCard";
const ParentCardConfig: PagesRouteConfig = {
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
      path: "/players/:id" + "/parent",
      element: <ParentCard />,
    },
  ],
};

export default ParentCardConfig;
