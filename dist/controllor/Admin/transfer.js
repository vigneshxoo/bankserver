"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
const connectDb_1 = require("../../Db/connectDb");
const createAccount_1 = require("../../Db/createAccount");
const transection_1 = require("../../Db/transection");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Transfer = async (req, res) => {
    const { fromAccount, toAccount, amount, transactionPin } = req.body;
    try {
        if (!fromAccount || !toAccount || !amount || !transactionPin) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }
        if (fromAccount === toAccount) {
            return res.status(400).json({ error: "Cannot transfer to the same account" });
        }
        await (0, connectDb_1.default)();
        const sender = await createAccount_1.default.findOne({ accountNumber: fromAccount });
        console.log(sender, "sneder");
        const receiver = await createAccount_1.default.findOne({ accountNumber: toAccount });
        if (!sender || !receiver) {
            return res.status(404).json({ error: "Account not found" });
        }
        console.log(sender.transactionPin);
        if (!sender.transactionPin) {
            return res.status(400).json({ error: "Sender's transaction PIN not set" });
        }
        const validpin = await bcrypt.compare(transactionPin.toString(), sender.transactionPin.toString());
        if (!validpin) {
            return res.status(400).json({ message: "Invalid transactionPin" });
        }
        if (sender.balance < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }
        await createAccount_1.default.updateOne({ accountNumber: fromAccount }, { $inc: { balance: -amount } });
        await createAccount_1.default.updateOne({ accountNumber: toAccount }, { $inc: { balance: amount } });
        const updatedSender = await createAccount_1.default.findOne({ accountNumber: fromAccount });
        const updatedReceiver = await createAccount_1.default.findOne({ accountNumber: toAccount });
        // Mail setup -- use environment variables for credentials in production!
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "vigneshxoo@gmail.com",
                pass: process.env.Email_PASS
            }
        });
        const senderMailOptions = {
            from: "vigneshxoo@gmail.com",
            to: sender.email,
            subject: "Amount Debited from Your Account",
            text: `Dear ${sender.fullName},\n\n₹${amount} has been transferred from your account (${sender.accountNumber}) to account ${receiver.accountNumber}.\n\nCurrent balance: ₹${updatedSender?.balance}\n\nIf you did not authorize this, contact us immediately.\n\n- SecureBank`
        };
        const receiverMailOptions = {
            from: "vigneshxoo@gmail.com",
            to: receiver.email,
            subject: "Amount Credited to Your Account",
            text: `Dear ${receiver.fullName},\n\n₹${amount} has been credited to your account (${receiver.accountNumber}) from account ${sender.accountNumber}.\n\nCurrent balance: ₹${updatedReceiver?.balance}\n\n- SecureBank`
        };
        try {
            await transporter.sendMail(senderMailOptions);
            await transporter.sendMail(receiverMailOptions);
        }
        catch (mailErr) {
            console.error("Mail send error:", mailErr);
            // Optionally: Don't block transaction for mail issues
        }
        const senderTransaction = new transection_1.default({
            accountNumber: fromAccount,
            type: "transfer",
            amount: -amount,
            date: new Date(),
            balanceAfter: updatedSender ? updatedSender.balance : 0
        });
        await senderTransaction.save();
        const receiverTransaction = new transection_1.default({
            accountNumber: toAccount,
            type: "transfer",
            amount: amount,
            date: new Date(),
            balanceAfter: updatedReceiver ? updatedReceiver.balance : 0
        });
        await receiverTransaction.save();
        return res.status(200).json({
            message: "Transfer successful. Email notifications sent!",
            senderBalance: updatedSender?.balance,
            receiverBalance: updatedReceiver?.balance
        });
    }
    catch (error) {
        console.error("Error during transfer:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.Transfer = Transfer;
//# sourceMappingURL=transfer.js.map