"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const connectDb_1 = require("../../Db/connectDb");
const bcrypt = require("bcryptjs");
const token_1 = require("../../lib/token");
const createAccount_1 = require("../../Db/createAccount");
const Login = async (req, res) => {
    try {
        await (0, connectDb_1.default)();
        const { password, email } = req.body;
        console.log("Request body:", req.body);
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide all required fields" });
        } // Email validation
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        const user = await createAccount_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        console.log(user);
        const validpassword = await bcrypt.compare(password, user.password);
        console.log(validpassword);
        if (!validpassword) {
            return res.status(401).json({ message: "incorrect password" });
        }
        const token = (0, token_1.default)(user._id, res);
        return res.status(200).json({
            message: "login succesfully",
            user,
            jwt: token, // Send token with the response
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    // Your login logic here
};
exports.Login = Login;
//# sourceMappingURL=Login.js.map