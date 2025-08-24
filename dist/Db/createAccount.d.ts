import mongoose, { Document } from "mongoose";
export interface ICreateAccount extends Document {
    userId?: string;
    fullName: string;
    email: string;
    phone: number;
    accountNumber: number;
    password: string;
    balance: number;
    createdAt: Date;
    transactionPin: String;
    profileImg: {
        url: string;
        public_id: string;
    };
    role?: "user" | "admin";
}
declare const Account: mongoose.Model<ICreateAccount>;
export default Account;
//# sourceMappingURL=createAccount.d.ts.map