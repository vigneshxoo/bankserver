"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dasbord = void 0;
const createAccount_1 = require("../../Db/createAccount");
const Dasbord = async (req, res) => {
    try {
        const user = (req.user?._id);
        const Accounts = await createAccount_1.default.find({ _id: user }).select('-password');
        if (!Accounts)
            return res.status(404).json({ message: "Account not found" });
        return res.status(200).json({ Accounts });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: String(error) });
        }
    }
};
exports.Dasbord = Dasbord;
//# sourceMappingURL=getDasborad.js.map