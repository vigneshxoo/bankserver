
import * as jwt from "jsonwebtoken";

const generateToken = (userId: any, res: any) => {
    const secretKey = process.env.JWT_SECRET || ""

    if (!secretKey) {
        return res.status(500).json({ message: "JWT_SECRET is not defined" });
    }

    const token = jwt.sign({ userid: userId }, secretKey, { expiresIn: "20d" });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,            // important 🚀
        sameSite: "none",        // cross-origin frontendக்கு
        maxAge: 15 * 24 * 60 * 60 * 1000
    });

    return token;
};

export default generateToken;
