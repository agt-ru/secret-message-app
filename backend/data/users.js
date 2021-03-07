import bcrypt from "bcryptjs";

const users = [
  {
    name: "Magic Johnson",
    email: "magic@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Tim Duncan",
    email: "tim@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Shaquille O'Neal",
    email: "shaquille@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
