import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export declare const Dasbord: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=getDasborad.d.ts.map