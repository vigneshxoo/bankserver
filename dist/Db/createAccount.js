"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CreateAccountSchema = new mongoose_1.Schema({
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
const Account = mongoose_1.default.models.Account || mongoose_1.default.model("Account", CreateAccountSchema);
exports.default = Account;
//# sourceMappingURL=createAccount.js.map