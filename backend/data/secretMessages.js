import bcrypt from "bcryptjs";

const secretMessages = [
  {
    message: "Hello there!",
    keyword: "hflk3k",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    message: "Hey, visit this site, it's amazing: https://dribbble.com/",
    keyword: "k3jjr9",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    message:
      "Here's a link to my repo: https://github.com/agt-ru/secret-message-app",
    keyword: "mdm34j",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default secretMessages;
