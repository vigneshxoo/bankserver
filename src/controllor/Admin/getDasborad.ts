import { response } from "express";
import *as express from "express";
import { Request, Response } from "express";
import User from "../../Db/UserShcema";
import { UserDocument } from "../../Db/UserShcema";
import Account, { ICreateAccount } from "../../Db/createAccount";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export const Dasbord = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const user = (req.user?._id)

        const Accounts = await Account.find({ _id: user }).select('-password')
        if (!Accounts) return res.status(404).json({ message: "Account not found" });
        return res.status(200).json({ Accounts });
    } catch (error) {

        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: String(error) });
        }
    }
}

