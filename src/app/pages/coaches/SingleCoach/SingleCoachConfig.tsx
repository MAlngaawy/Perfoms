import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import SingleCoachPage from "./SingleCoachPage";

const SingleCoacheConfig: PagesRouteConfig = {
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
  auth: authRoles.Parent,
  routes: [
    {
      path: "/coaches/:coach_id",
      element: <SingleCoachPage />,
    },
  ],
};

export default SingleCoacheConfig;
