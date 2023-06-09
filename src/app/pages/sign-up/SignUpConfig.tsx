import SignUpPage from "./SignUpPage";
import authRoles from "../../auth/authRoles";
import OTPComponent from "../OTP/components/OTPComponent";

const SignUpConfig = {
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
      path: "sign-up",
      element: <SignUpPage />,
    },
  ],
};

export default SignUpConfig;
