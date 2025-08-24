import { Request, Response } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export declare const gettransection: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=getTransection.d.ts.map