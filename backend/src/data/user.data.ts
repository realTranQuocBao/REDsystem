import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@redsystem.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "User",
        email: "user@redsystem.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;