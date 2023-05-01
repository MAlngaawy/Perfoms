import { PagesRouteConfig } from "~/@main/types/Config-Types";
import authRoles from "~/app/auth/authRoles";
import AdminProfile from "./AdminProfile";

const AdminProfilePageConfig: PagesRouteConfig = {
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
  auth: [...authRoles.Admin, ...authRoles.SubCoach],
  routes: [
    {
      path: "admin-profile",
      element: <AdminProfile />,
    },
  ],
};

export default AdminProfilePageConfig;
