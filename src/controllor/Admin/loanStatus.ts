import { Request, Response } from "express";
import LoanModel from "../../Db/loan";

export const LoanStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Called LoanStatus route");
    const { id } = req.params;
    console.log("parmes",id)


    // const { loanId } = req.body; // standardize name
    if (!id) {
      return res.status(400).json({ message: "loanId is required" });
    }

    const loan = await LoanModel.findOne({userId:id}).sort({ createdAt: -1});
    console.log("loanstatus:",loan)
    if (!loan) {
      return res.status(404).json({ message: "No pending loan application found" });
    }

    return res.status(200).json({ status: loan.status });
  } catch (error) {
    console.error("LoanStatus error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
