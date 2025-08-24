import mongoose, { Document, Model } from "mongoose";
export interface ILoan {
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    purpose: string;
    tenureMonths: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Sanctioned';
    createdAt: Date;
    updatedAt?: Date;
}
export interface ILoanDocument extends ILoan, Document {
}
declare const LoanModel: Model<ILoanDocument>;
export default LoanModel;
//# sourceMappingURL=loan.d.ts.map