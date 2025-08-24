
import { Request, Response } from "express";
import Account from "../../Db/createAccount";
import Transaction from "../../Db/transection";
import connectDB from "../../Db/connectDb";
import * as nodemailer from "nodemailer";
import { ICreateAccount } from "../../Db/createAccount";

interface AuthenticatedRequest extends Request {
    user?: { _id: string };
}

export const Deposit = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { accountNumber, amount, name } = req.body;
        console.log(accountNumber, amount);

        if (!accountNumber || !amount || !name) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        await connectDB();

        // Find account
        const Accounts = await Account.find({ accountNumber });
        if (!Accounts || Accounts.length === 0) {
            return res.status(400).json({ message: "Account not found" });
        }
        const account = Accounts.find((acc: ICreateAccount) => acc.accountNumber === accountNumber);
        if (!account) {
            return res.status(404).json({ message: "Account with provided account number not found" });
        }

        // Update balance
        await Account.updateOne(
            { accountNumber: accountNumber },
            { $inc: { balance: +amount } }
        );

        // Fetch updated account for balance
        const updatedAccount = await Account.findOne({ accountNumber: accountNumber });
        if (!updatedAccount) return res.status(500).json({ error: "Account update error" });

        // Create transaction history
        await Transaction.create({
            accountNumber,
            type: "deposit",
            amount,
            balanceAfter: updatedAccount.balance,
            date: new Date()
        });

        // Email alert - deposit
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yourbankmail@gmail.com",
                pass: process.env.Email_PASS
            }
        });

        const mailOptions = {
            from: "yourbankmail@gmail.com",
            to: updatedAccount.email,
            subject: "Deposit Alert – SecureBank",
            text: `Dear ${updatedAccount.fullName},

₹${amount} has been deposited to your account (${updatedAccount.accountNumber}) on ${new Date().toLocaleString()}.

Current balance: ₹${updatedAccount.balance}

If you have not made this deposit, please contact our support immediately.

- SecureBank`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailErr) {
            console.error("Deposit email send error:", mailErr);
        }

        return res.status(200).json({
            message: "Deposit successful, email sent.",
            accountNumber: updatedAccount.accountNumber,
            balance: updatedAccount.balance
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
