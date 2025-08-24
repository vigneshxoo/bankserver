import *as express from 'express';
import { Request, Response } from 'express';
import connectDB from '../../Db/connectDb';
import User from '../../Db/UserShcema';// Use default import if UserShcema exports the model as default
import * as bcrypt from 'bcryptjs';
import generateToken from '../../lib/token';
import Account from '../../Db/createAccount';

export const Login = async (req: Request, res: Response) => {
    try {
        await connectDB();
        const {  password,  email } = req.body;
        console.log("Request body:", req.body);

        if ( !email || !password ) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }// Email validation

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const user=await Account.findOne({email});
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        console.log(user)
        const validpassword=await bcrypt.compare(password,user.password);
        console.log(validpassword)
        if(!validpassword){
            return res.status(401).json({message:"incorrect password"})
        }
        const token=generateToken(user._id,res)
       
        return res.status(200).json({
            message: "login succesfully",
            user,
            jwt:token,  // Send token with the response
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
    // Your login logic here
};
