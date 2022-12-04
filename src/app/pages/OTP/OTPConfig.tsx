import authRoles from "../../auth/authRoles";
import OTPPage from "./OTPPage";

const OTPConfig = {
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
      path: "verify-otp",
      element: <OTPPage />,
    },
  ],
};

export default OTPConfig;
