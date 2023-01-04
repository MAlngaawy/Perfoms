import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import ForgotPass from "./ForgotPass";

const ForgotPassConfig: PagesRouteConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.OnlyGuest,
  routes: [
    {
      path: "sign-in/forgot-pass",
      element: <ForgotPass />,
    },
  ],
};

export default ForgotPassConfig;
