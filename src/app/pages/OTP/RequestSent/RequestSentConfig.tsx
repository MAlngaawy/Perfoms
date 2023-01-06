import authRoles from "../../../auth/authRoles";
import RequestSent from "./RequestSent";

const RequestSentConfig = {
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
      path: "coachRequestSent",
      element: <RequestSent />,
    },
  ],
};

export default RequestSentConfig;
