import { Request, Response } from "express";
import { UserDocument } from "../../Db/UserShcema";
interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}
export declare const applyLoan: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=applyloan.d.ts.map