import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export declare const withdraw: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=withdraw.d.ts.map