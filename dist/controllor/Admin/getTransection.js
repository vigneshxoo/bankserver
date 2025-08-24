"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettransection = void 0;
const createAccount_1 = require("../../Db/createAccount");
const transection_1 = require("../../Db/transection");
const gettransection = async (req, res) => {
    try {
        const userId = req.user?._id;
        // Get all accounts of this user
        const accounts = await createAccount_1.default.find({ _id: userId }).select('-password');
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({ message: "User account(s) not found" });
        }
        console.log(accounts);
        // Get all accountNumbers
        const accountNumbers = accounts.map(account => account.accountNumber);
        // Get ALL transactions (all accounts of this user)
        const transactions = await transection_1.default.find({
            accountNumber: { $in: accountNumbers }
        }).sort({ date: -1 }); // Recent first, optional
        return res.status(200).json({
            message: "Transactions found",
            transactions
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.gettransection = gettransection;
//# sourceMappingURL=getTransection.js.map