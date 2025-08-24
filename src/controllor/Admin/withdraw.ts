


import { Request, Response } from "express";
import connectDB from "../../Db/connectDb";
import Account from "../../Db/createAccount";
import { ICreateAccount } from "../../Db/createAccount";
import Transaction from "../../Db/transection";
import * as bcrypt from 'bcryptjs';
import * as nodemailer from "nodemailer";

interface AuthenticatedRequest extends Request {
    user?: { _id: string };
}

export const withdraw = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { accountNumber, amount, transactionPin } = req.body;

        if (!accountNumber || !amount || !transactionPin) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }
        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        await connectDB();

        const accounts = await Account.find({ _id: req.user?._id });
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ message: "Account not found" });
        }

        const account = accounts.find((acc: ICreateAccount) => acc.accountNumber === accountNumber);
        if (!account) {
            return res.status(404).json({ message: "Account with provided account number not found" });
        }

        if (!account.transactionPin) {
            return res.status(400).json({ message: "Transaction PIN not set for this account" });
        }
        const validPin = await bcrypt.compare(transactionPin.toString(), account.transactionPin.toString());
        if (!validPin) {
            return res.status(400).json({ message: "Invalid transaction PIN" });
        }

        if (account.balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        account.balance -= amount;
        await account.save();

        // Save transaction history
        await Transaction.create({
            accountNumber,
            type: "withdraw",
            amount,
            balanceAfter: account.balance,
            date: new Date()
        });

        // Nodemailer sending withdraw alert
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vigneshxoo@gmail.com",
                pass: process.env.Email_PASS
            }
        });

        const mailOptions = {
            from: "vigneshxoo@gmail.com",
            to: account.email,
            subject: "Withdrawal Alert – SecureBank",
            text: `Dear ${account.fullName},
           ₹${amount} has been withdrawn from your account (${account.accountNumber}) on ${new Date().toLocaleString()}.Current balance: ₹${account.balance}If you did not make this withdrawal, please contact our support immediately.- SecureBank`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailErr) {
            console.error("Email send error (withdrawal):", mailErr);
            // Transaction can still succeed, just log mail failure.
        }

        return res.status(200).json({
            message: "Withdrawal successful, alert email sent.",
            accountNumber: account.accountNumber,
            balance: account.balance
        });

    } catch (error) {
        console.error("Withdraw error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
