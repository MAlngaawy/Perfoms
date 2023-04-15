import authRoles from "../../auth/authRoles";
import SubCoach from "./SubCoach";

const SubCoachConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.SubCoach,
  routes: [
    {
      path: "sub-coach",
      element: <SubCoach />,
    },
  ],
};

export default SubCoachConfig;
