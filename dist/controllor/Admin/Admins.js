"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    console.log("isAdmin ", req.user?.role);
    if (req.user && req.user.role === 'Admin') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Admin access only' });
    }
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=Admins.js.map