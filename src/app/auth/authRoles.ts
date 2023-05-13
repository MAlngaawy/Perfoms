const authRoles = {
  Admin: ["Admin"],
  Supervisor: ["Supervisor"],
  Parent: ["Parent", "Player"],
  Coach: ["Coach"],
  SubCoach: ["SubCoach"],
  All: ["Supervisor", "Parent", "Coach", "Admin"],
  OnlyGuest: [],
};

export default authRoles;
