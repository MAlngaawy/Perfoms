import { PagesRouteConfig } from "app/configs/routesConfig";
import Example from "./Example";

const ExampleConfig: PagesRouteConfig = {
  auth: ["User"],
  routes: [
    {
      path: "example",
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
