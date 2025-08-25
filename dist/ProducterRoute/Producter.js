"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const jwt = require("jsonwebtoken");
const connectDb_1 = require("../Db/connectDb");
const createAccount_1 = require("../Db/createAccount");
const ProductRouter = async (req, res, next) => {
    const secretKey = process.env.JWT_SECRET || "";
    console.log(secretKey);
    if (!secretKey)
        return res.status(400).json({ message: "secret key missing" });
    try {
        // console.log(req.cookies)
        const token = req.cookies.jwt;
        // console.log("Token received:", token);
        if (!token) {
            console.log("No token provided");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        if (!secretKey) {
            return res.status(400).json({ message: "Error: SECRET_KEY is missing" });
        }
        const decoded = jwt.verify(token, secretKey);
        // console.log("Decoded token:", decoded);
        if (!decoded || !decoded.userid) {
            return res.status(401).json({ message: "Token unauthorized" });
        }
        await (0, connectDb_1.default)();
        const userp = await createAccount_1.default.findOne({ _id: decoded.userid }).select('-password');
        if (!userp) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = userp;
        next();
        console.log("Product route called");
        // res.status(200).json({ message: "Product route is working" });
    }
    catch (error) {
        console.error("Error in Product route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.ProductRouter = ProductRouter;
//# sourceMappingURL=Producter.js.map