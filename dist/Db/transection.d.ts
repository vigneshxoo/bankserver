import mongoose from "mongoose";
import { Document } from "mongoose";
export interface ITransaction extends Document {
    accountNumber: number;
    type: "deposit" | "withdraw" | "transfer";
    amount: number;
    date: Date;
    balanceAfter: number;
}
declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Transaction;
//# sourceMappingURL=transection.d.ts.map