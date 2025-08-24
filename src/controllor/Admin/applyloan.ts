

import { Request, Response } from "express";
import { UserDocument } from "../../Db/UserShcema";
import LoanModel from "../../Db/loan";
interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}

export const applyLoan = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { amount, purpose, tenureMonths } = req.body;

        // Enhanced validation
        if (
            typeof amount !== "number" ||
            amount <= 0 ||
            !purpose ||
            typeof tenureMonths !== "number" ||
            tenureMonths <= 0
        ) {
            return res.status(400).json({ error: "Invalid or missing fields" });
        }

        const user = req.user?._id;
        console.log("loanuserid",user)
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        // Explicitly check only 'pending' loans
        const existingLoan = await LoanModel.findOne({ userId: user});
        if (existingLoan && existingLoan.status==="Pending") {
            return res.status(400).json({
                message: "You already have a loan in process. Cannot apply for another loan.",
            });
        }
        console.log(existingLoan)

        // Create new loan application
        const loanApp = new LoanModel({
            userId: user,
            amount,
            purpose,
            tenureMonths,
        });

        await loanApp.save();

        return res.status(201).json({ message: "Loan application submitted", loanApp });
    } catch (error) {
        console.error("Loan apply error:", error);
        return res.status(500).json({
            error: "Server error",
            details: error instanceof Error ? error.message : error,
        });
    }
};
