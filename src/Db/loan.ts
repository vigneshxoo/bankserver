import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for Loan document fields (excluding mongoose Document augmentation)
export interface ILoan {
    userId: mongoose.Schema.Types.ObjectId;
    amount: number;
    purpose: string;
    tenureMonths: number;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Sanctioned';
    createdAt: Date;
    updatedAt?: Date;
}

// Interface extending mongoose.Document & ILoan for typings on documents
export interface ILoanDocument extends ILoan, Document {}

// Schema definition
const LoanApplicationSchema = new Schema<ILoanDocument>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    tenureMonths: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Sanctioned'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

// Use Model<ILoanDocument> type for your model to get correct typings
const LoanModel: Model<ILoanDocument> = mongoose.models.LoanApplication || mongoose.model<ILoanDocument>('LoanApplication', LoanApplicationSchema);

export default LoanModel;
