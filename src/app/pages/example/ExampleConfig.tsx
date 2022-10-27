import authRoles from "app/auth/authRoles";
import { PagesRouteConfig } from "app/configs/routesConfig";
import Example from "./Example";

const ExampleConfig: PagesRouteConfig = {
  auth: authRoles.Admin,
  routes: [
    {
      path: "example",
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
