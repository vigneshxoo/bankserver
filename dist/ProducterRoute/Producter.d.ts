import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { ICreateAccount } from "../Db/createAccount";
interface AuthenticatedRequest extends Request {
    user?: ICreateAccount;
}
export declare const ProductRouter: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=Producter.d.ts.map