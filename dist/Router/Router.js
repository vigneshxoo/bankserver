"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const createAcount_1 = require("../controllor/Admin/createAcount");
const Login_1 = require("../controllor/usercontrollor/Login");
const Signup_1 = require("../controllor/usercontrollor/Signup");
const Producter_1 = require("../ProducterRoute/Producter");
const getDasborad_1 = require("../controllor/Admin/getDasborad");
const deposit_1 = require("../controllor/Admin/deposit");
const transfer_1 = require("../controllor/Admin/transfer");
const withdraw_1 = require("../controllor/Admin/withdraw");
const getTransection_1 = require("../controllor/Admin/getTransection");
const Logout_1 = require("../controllor/usercontrollor/Logout");
const applyloan_1 = require("../controllor/Admin/applyloan");
const Admins_1 = require("../controllor/Admin/Admins");
const AdminDashBorad_1 = require("../controllor/Admin/AdminDashBorad");
const updateloanStatus_1 = require("../controllor/Admin/updateloanStatus");
const loanStatus_1 = require("../controllor/Admin/loanStatus");
const multer = require("multer");
const profilePhoto_1 = require("../controllor/Admin/profilePhoto");
const storage = multer.memoryStorage(); // using memory for now (we’ll use this to upload to Cloudinary later)
const upload = multer({ storage });
exports.router = express.Router();
exports.router.get("/test", Producter_1.ProductRouter, (req, res) => {
    res.send("Test route is working");
});
exports.router.post('/create-account', createAcount_1.AccountCreates);
exports.router.post('/login', Login_1.Login);
exports.router.post('/signup', Signup_1.Signup);
exports.router.get("/logout", Logout_1.logout);
exports.router.get('/dash', Producter_1.ProductRouter, getDasborad_1.Dasbord);
exports.router.post('/deposit', Producter_1.ProductRouter, deposit_1.Deposit);
exports.router.post('/transfer', Producter_1.ProductRouter, transfer_1.Transfer);
exports.router.post('/withdraw', Producter_1.ProductRouter, withdraw_1.withdraw);
exports.router.get('/transhist', Producter_1.ProductRouter, getTransection_1.gettransection);
exports.router.post('/applyloan', Producter_1.ProductRouter, applyloan_1.applyLoan);
//
exports.router.get('/admin', Producter_1.ProductRouter, Admins_1.isAdmin, AdminDashBorad_1.AdminDash);
exports.router.post('/updatestatus', Producter_1.ProductRouter, Admins_1.isAdmin, updateloanStatus_1.updateLoanStatus);
exports.router.get('/status/:id', Producter_1.ProductRouter, loanStatus_1.LoanStatus);
exports.router.post('/profilepic', upload.single("profileImg"), Producter_1.ProductRouter, profilePhoto_1.ProfilePhoto);
exports.router.get('/testv', Producter_1.ProductRouter, (req, res) => {
    return res.send("testapi work");
});
//# sourceMappingURL=Router.js.map