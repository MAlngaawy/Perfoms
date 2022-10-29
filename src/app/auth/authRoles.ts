const authRoles = {
  Admin: ["Supervisor"],
  Parent: ["Supervisor", "Parent"],
  User: ["Supervisor", "Parent", "User"],
  OnlyGuest: [],
};

export default authRoles;
