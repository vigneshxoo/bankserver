"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDash = void 0;
const loan_1 = require("../../Db/loan");
const AdminDash = async (req, res, next) => {
    try {
        console.log("dashboard");
        // Fetch all pending loans & populate user info
        const allLoanApplications = await loan_1.default.find({ status: "Pending" }).populate("userId");
        // If no pending applications
        if (!allLoanApplications || allLoanApplications.length === 0) {
            return res.status(404).json({ message: "No pending loan applications found" });
        }
        return res.status(200).json({ loans: allLoanApplications });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.AdminDash = AdminDash;
//# sourceMappingURL=AdminDashBorad.js.map