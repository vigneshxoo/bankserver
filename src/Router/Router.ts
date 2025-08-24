import * as express from "express";
import { AccountCreates } from "../controllor/Admin/createAcount";
import { Login } from "../controllor/usercontrollor/Login";
import { Signup } from "../controllor/usercontrollor/Signup";
import { Request, Response, NextFunction } from "express";
import { ProductRouter } from "../ProducterRoute/Producter";
import { Dasbord } from "../controllor/Admin/getDasborad";
import { Deposit } from "../controllor/Admin/deposit";

import { Transfer } from "../controllor/Admin/transfer";
import { withdraw } from "../controllor/Admin/withdraw";
import { gettransection } from "../controllor/Admin/getTransection";
import { logout } from "../controllor/usercontrollor/Logout";
import { applyLoan } from "../controllor/Admin/applyloan";
import { isAdmin } from "../controllor/Admin/Admins";
import { AdminDash } from "../controllor/Admin/AdminDashBorad";
import { updateLoanStatus } from "../controllor/Admin/updateloanStatus";
import { LoanStatus } from "../controllor/Admin/loanStatus";

import * as multer from 'multer'
import { ProfilePhoto } from "../controllor/Admin/profilePhoto";
const storage = multer.memoryStorage(); // using memory for now (we’ll use this to upload to Cloudinary later)
const upload = multer({ storage });


export const router = express.Router();

router.get("/test", ProductRouter, (req: Request, res: Response) => {
    res.send("Test route is working");
});
router.post('/create-account', AccountCreates);
router.post('/login', Login)
router.post('/signup', Signup)
router.get("/logout", logout)


router.get('/dash', ProductRouter, Dasbord);
router.post('/deposit', ProductRouter, Deposit);
router.post('/transfer', ProductRouter, Transfer);
router.post('/withdraw', ProductRouter, withdraw)
router.get('/transhist', ProductRouter, gettransection)
router.post('/applyloan', ProductRouter, applyLoan)

//
router.get('/admin', ProductRouter,isAdmin, AdminDash)
router.post('/updatestatus', ProductRouter,isAdmin, updateLoanStatus)
router.get('/status/:id', ProductRouter, LoanStatus)
router.post('/profilepic', upload.single("profileImg"),ProductRouter,ProfilePhoto)

router.get('/testv', ProductRouter, (req: Request, res: Response) => {
    return res.send("testapi work")
})