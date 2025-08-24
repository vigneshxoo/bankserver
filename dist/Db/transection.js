"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.default.Schema({
    accountNumber: { type: Number, required: true },
    type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    balanceAfter: { type: Number, required: true }
});
const Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
exports.default = Transaction;
//# sourceMappingURL=transection.js.map