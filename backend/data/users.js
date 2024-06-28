import bcrypt from "bcryptjs";

const users = [
  {
    userId:1234567,
    firstName: "Admin",
    lastName: "User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("adminadmin", 10),
    isAdmin: true,
  },
  {
    userId:123456,
    firstName: "Sakthi",
    lastName: "Priyan",
    email: "sakthipriyan@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
