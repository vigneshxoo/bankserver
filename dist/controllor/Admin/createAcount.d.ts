import { Request, Response } from 'express';
import { UserDocument } from '../../Db/UserShcema';
interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}
export declare const AccountCreates: (req: AuthenticatedRequest, res: Response) => Promise<any>;
export {};
//# sourceMappingURL=createAcount.d.ts.map