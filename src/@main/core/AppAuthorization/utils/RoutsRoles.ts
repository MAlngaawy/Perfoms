import authRoles from "~/app/auth/authRoles";

export const RolesMainRoute = (role: string) => {
  if (authRoles.Admin.includes(role)) return "/admin";
  if (authRoles.Supervisor.includes(role)) return "/supervisor";
  if (authRoles.Coach.includes(role)) return "/coach-home";
  if (authRoles.Parent.includes(role)) return "/home";
};
