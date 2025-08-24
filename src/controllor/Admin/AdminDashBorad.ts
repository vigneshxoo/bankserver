import { Request, Response, NextFunction } from "express";
import LoanModel from "../../Db/loan";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const AdminDash = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    console.log("dashboard");

    // Fetch all pending loans & populate user info
    const allLoanApplications = await LoanModel.find({ status: "Pending" }).populate("userId");

    // If no pending applications
    if (!allLoanApplications || allLoanApplications.length === 0) {
      return res.status(404).json({ message: "No pending loan applications found" });
    }

    return res.status(200).json({ loans: allLoanApplications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
