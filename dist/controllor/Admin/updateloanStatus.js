"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLoanStatus = void 0;
const loan_1 = require("../../Db/loan");
const createAccount_1 = require("../../Db/createAccount");
const nodemailer = require("nodemailer");
const updateLoanStatus = async (req, res) => {
    try {
        const { loanId, status } = req.body;
        if (!loanId || !["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid loanId or status" });
        }
        const loan = await loan_1.default.findById(loanId);
        if (!loan) {
            return res.status(404).json({ error: "Loan not found" });
        }
        if (loan.status !== "Pending") {
            return res.status(400).json({ error: "Loan already processed" });
        }
        loan.status = status;
        if (status === "Approved") {
            // ✅ Correct: use loan.userId instead of loanId
            const user = await createAccount_1.default.findById(loan.userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            user.balance = (user.balance || 0) + loan.amount;
            await user.save();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "vigneshxoo@gmail.com",
                    pass: process.env.Email_PASS
                }
            });
            const mailOptions = {
                from: "vigneshxoo@gmail.com",
                to: user.email,
                subject: "Welcome to SecureBank!",
                text: `Dear ${user?.fullName},
    
    Your SecureBank account has been loan aprroved successfully!
    
    Your Account Number: ${user.accountNumber}
    
    Thank you for banking with us.
    
    - SecureBank`
            };
            try {
                await transporter.sendMail(mailOptions);
            }
            catch (mailErr) {
                console.error("Account create email send error:", mailErr);
                // Email fails: still return success for account creation.
            }
        }
        await loan.save();
        return res.status(200).json({ message: `Loan ${status}`, loan });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.updateLoanStatus = updateLoanStatus;
//# sourceMappingURL=updateloanStatus.js.map