const bcrypt = require("bcryptjs");

password = "dev";
password1 = "dev";

const pass = async (password,password1) => {
    const one = await bcrypt.hash(password,10);
    const two = await bcrypt.hash(password1,10);
    console.log(one);
    console.log(two);
}

pass(password,password1);