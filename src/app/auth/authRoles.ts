const authRoles = {
  Admin: ["Admin"],
  Parent: ["Admin", "Parent"],
  User: ["Admin", "Parent", "User"],
  OnlyGuest: [],
};

export default authRoles;
