import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
type RequestWithUser = Request & {
    user?: User;
};
export declare const protect: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export declare const authorize: (...roles: string[]) => (req: RequestWithUser, res: Response, next: NextFunction) => void;
export declare const generateToken: (id: number) => string;
export {};
