"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
});
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", user);
exports.default = User;
//# sourceMappingURL=UserShcema.js.map