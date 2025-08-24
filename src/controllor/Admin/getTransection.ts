import { Request, Response } from "express";
import Account from "../../Db/createAccount";
import Transaction from "../../Db/transection";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export const gettransection = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user?._id;

        // Get all accounts of this user
        const accounts = await Account.find({ _id: userId }).select('-password');
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ message: "User account(s) not found" });
        }
        console.log(accounts)

        // Get all accountNumbers
        const accountNumbers = accounts.map(account => account.accountNumber);

        // Get ALL transactions (all accounts of this user)
        const transactions = await Transaction.find({
            accountNumber: { $in: accountNumbers }
        }).sort({ date: -1 }); // Recent first, optional

        return res.status(200).json({
            message: "Transactions found",
            transactions
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
