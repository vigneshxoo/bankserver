import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ITransaction extends Document {
    accountNumber: number;
    type: "deposit" | "withdraw" | "transfer";
    amount: number;
    date: Date;
    balanceAfter: number;
}
const TransactionSchema = new mongoose.Schema<ITransaction>({
    accountNumber: { type: Number, required: true },
    type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    balanceAfter: { type: Number, required: true }
});
const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;