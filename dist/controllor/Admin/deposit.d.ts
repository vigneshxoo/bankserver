import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export declare const Deposit: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=deposit.d.ts.map