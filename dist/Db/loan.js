"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema definition
const LoanApplicationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Account' },
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
const LoanModel = mongoose_1.default.models.LoanApplication || mongoose_1.default.model('LoanApplication', LoanApplicationSchema);
exports.default = LoanModel;
//# sourceMappingURL=loan.js.map