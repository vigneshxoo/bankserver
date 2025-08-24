"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "logout sucessfully" });
    }
    catch (error) {
    }
};
exports.logout = logout;
//# sourceMappingURL=Logout.js.map