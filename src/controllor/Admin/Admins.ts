import { Request,Response ,NextFunction} from "express";
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("isAdmin ",req.user?.role)
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
   return res.status(403).json({ message: 'Admin access only' });
  }
};