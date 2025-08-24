"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deposit = void 0;
const createAccount_1 = require("../../Db/createAccount");
const transection_1 = require("../../Db/transection");
const connectDb_1 = require("../../Db/connectDb");
const nodemailer = require("nodemailer");
const Deposit = async (req, res) => {
    try {
        const { accountNumber, amount, name } = req.body;
        console.log(accountNumber, amount);
        if (!accountNumber || !amount || !name) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        await (0, connectDb_1.default)();
        // Find account
        const Accounts = await createAccount_1.default.find({ accountNumber });
        if (!Accounts || Accounts.length === 0) {
            return res.status(400).json({ message: "Account not found" });
        }
        const account = Accounts.find((acc) => acc.accountNumber === accountNumber);
        if (!account) {
            return res.status(404).json({ message: "Account with provided account number not found" });
        }
        // Update balance
        await createAccount_1.default.updateOne({ accountNumber: accountNumber }, { $inc: { balance: +amount } });
        // Fetch updated account for balance
        const updatedAccount = await createAccount_1.default.findOne({ accountNumber: accountNumber });
        if (!updatedAccount)
            return res.status(500).json({ error: "Account update error" });
        // Create transaction history
        await transection_1.default.create({
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
        }
        catch (mailErr) {
            console.error("Deposit email send error:", mailErr);
        }
        return res.status(200).json({
            message: "Deposit successful, email sent.",
            accountNumber: updatedAccount.accountNumber,
            balance: updatedAccount.balance
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.Deposit = Deposit;
//# sourceMappingURL=deposit.js.map