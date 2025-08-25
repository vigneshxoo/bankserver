"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    let mongouri = process.env.MONGO_URI;
    if (!mongouri)
        return console.log("mongouri missing");
    try {
        await mongoose_1.default.connect(mongouri);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connectDb.js.map