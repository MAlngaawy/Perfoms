import { PagesRouteConfig } from "@main/types/Config-Types";
import authRoles from "app/auth/authRoles";
import SignInPage from "./SignInPage";

const SignInConfig: PagesRouteConfig = {
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
      path: "sign-in",
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
