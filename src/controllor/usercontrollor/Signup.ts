import *as express from 'express';
import { Request, Response } from 'express';
import connectDB from '../../Db/connectDb';
import User from '../../Db/UserShcema';// Use default import if UserShcema exports the model as default
import * as bcrypt from 'bcryptjs';
import generateToken from '../../lib/token';

export const Signup = async (req: Request, res: Response) => {
    try {
        await connectDB();
        const { username, password,  email } = req.body;
        console.log("Request body:", req.body);

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }// Email validation

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        // Check if user already exists
        const checkEmail = await User.findOne({ email });
        const checkUsername = await User.findOne({ username });
        if (checkEmail || checkUsername) {
            return res.status(400).json({ error: "Already existing email or username" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password is too short" });
        }
        // Password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            // Ensure this is the correct field name
        });

        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser._id, res);

        return res.status(200).json({
            message: "User created successfully",
            user: newUser,
            token,  // Send token with the response
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
    // Your login logic here
};
