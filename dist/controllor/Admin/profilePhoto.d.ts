import { Response, Request } from "express";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export declare const ProfilePhoto: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=profilePhoto.d.ts.map