"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const generateToken = (userId, res) => {
    const secretKey = process.env.JWT_SECRET || "";
    if (!secretKey) {
        return res.status(500).json({ message: "JWT_SECRET is not defined" });
    }
    const token = jwt.sign({ userid: userId }, secretKey, { expiresIn: "20d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true, // important 🚀
        sameSite: "none", // cross-origin frontendக்கு
        maxAge: 15 * 24 * 60 * 60 * 1000
    });
    return token;
};
exports.default = generateToken;
//# sourceMappingURL=token.js.map