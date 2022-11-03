import { PagesRouteConfig } from "@main/types/Config-Types";
import authRoles from "app/auth/authRoles";
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
  auth: authRoles.User,
  routes: [
    {
      path: "/coaches/:id",
      element: <SingleCoachPage />,
    },
  ],
};

export default SingleCoacheConfig;
