const authRoles = {
  Admin: ["Admin"],
  Supervisor: ["Supervisor"],
  Parent: ["Parent"],
  Coach: ["Coach"],
  All: ["Supervisor", "Parent", "Coach", "Admin"],
  OnlyGuest: [],
};

export default authRoles;
