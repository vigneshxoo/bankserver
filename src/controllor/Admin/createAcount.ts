

import { Request, Response } from 'express';
import Account from '../../Db/createAccount';
import { UserDocument } from '../../Db/UserShcema';
import connectDB from '../../Db/connectDb';
import * as bcrypt from 'bcryptjs';
import generateToken from '../../lib/token';
import * as nodemailer from "nodemailer";

interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}

export const AccountCreates = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { fullName, email, phone, password, transactionPin } = req.body;
        if (!fullName || !email || !phone || !transactionPin || !password) {
            return res.status(401).json({ message: "All fields are required" });
        }

        const regex = /^[a-zA-Z0-9.\_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        await connectDB();

        // Check if user/email already exists
        const checkEmail = await Account.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ error: "Already existing email or username" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password is too short" });
        }

        // Hash password and pin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashTransactionPin = await bcrypt.hash(transactionPin.toString(), salt);

        // Generate unique account number
        const lastAccount = await Account.findOne().sort({ accountNumber: -1 });
        let newAccountNumber = 1000000001;
        if (lastAccount && lastAccount.accountNumber) {
            newAccountNumber = lastAccount.accountNumber + 1;
        }

        const account = new Account({
            fullName,
            email,
            password: hashedPassword,
            phone,
            transactionPin: hashTransactionPin,
            accountNumber: newAccountNumber,
            createdAt: new Date()
        });

        let token = generateToken(account._id, res);

        await account.save();

        // ---- Nodemailer section (send mail after create) ----
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vigneshxoo@gmail.com",
                pass:  process.env.Email_PASS
            }
        });

        const mailOptions = {
            from: "vigneshxoo@gmail.com",
            to: email,
            subject: "Welcome to SecureBank!",
            text: `Dear ${fullName},

Your SecureBank account has been created successfully!

Your Account Number: ${newAccountNumber}

Thank you for banking with us.

- SecureBank`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailErr) {
            console.error("Account create email send error:", mailErr);
            // Email fails: still return success for account creation.
        }

        return res.status(200).json({ message: "Account created successfully. Confirmation email sent.", account, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
