import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import User from "../Db/UserShcema";
import { UserDocument } from "../Db/UserShcema";
import connectDB from "../Db/connectDb";
import Account, { ICreateAccount } from "../Db/createAccount";

interface AuthenticatedRequest extends Request {
    user?: ICreateAccount;
}

export const ProductRouter = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // const secretKey = process.env.JWT_SECRET
    const secretKey=process.env.JWT_SECRET || ""
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

        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        // console.log("Decoded token:", decoded);


        if (!decoded || !decoded.userid) {
            return res.status(401).json({ message: "Token unauthorized" });
        }
       await connectDB()
        const userp = await Account.findOne({ _id: decoded.userid }).select('-password')
        if (!userp) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = userp
        next()

        console.log("Product route called");
        // res.status(200).json({ message: "Product route is working" });
    } catch (error) {
        console.error("Error in Product route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

