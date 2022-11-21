const authRoles = {
  Admin: ["Supervisor"],
  Parent: ["Supervisor", "Parent"],
  Coach: ["Coach"],
  User: ["Supervisor", "Parent", "User", "Coach"],
  OnlyGuest: [],
};

export default authRoles;
