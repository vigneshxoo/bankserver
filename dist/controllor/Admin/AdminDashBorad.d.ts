import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const AdminDash: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;
export {};
//# sourceMappingURL=AdminDashBorad.d.ts.map