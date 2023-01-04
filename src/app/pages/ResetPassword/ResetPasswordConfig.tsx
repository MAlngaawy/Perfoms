import authRoles from "../../auth/authRoles";
import ResetPassword from "./ResetPassword";

const ResetPasswordConfig = {
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
      path: "reser-password",
      element: <ResetPassword />,
    },
  ],
};

export default ResetPasswordConfig;
