import mongoose, { Schema, Document, model } from "mongoose";

export interface ICreateAccount extends Document {
  userId?: string;
  fullName: string;
  email: string;
  phone: number;
  accountNumber: number;
  password: string,
  balance: number;
  createdAt: Date;
  transactionPin: String,
  profileImg: {
    url: string;
    public_id: string;
  };
  role?: "user" | "admin"
}

const CreateAccountSchema = new Schema<ICreateAccount>({
  // userId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  accountNumber: { type: Number, unique: true },
  balance: { type: Number, default: 0 },
  transactionPin: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
   profileImg: {
    url: { type: String, default: "" },
    public_id: { type: String, default: "" }
  },

  role: { type: String, enum: ['user', 'Admin'], default: 'user' },

});



//   if (this.accountNumber) {
//     return next();
//   }


//   const lastAccount = await Account.findOne().sort({ accountNumber: -1 });

//   let newNumber = 1000000001;
//   if (lastAccount && lastAccount.accountNumber) {
//     newNumber = lastAccount.accountNumber + 1;
//   }

//   this.accountNumber = newNumber;
//   next();
// });

const Account: mongoose.Model<ICreateAccount> = mongoose.models.Account || mongoose.model<ICreateAccount>("Account", CreateAccountSchema);
export default Account;
