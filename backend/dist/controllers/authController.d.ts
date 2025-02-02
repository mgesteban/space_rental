import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
type RequestWithUser = Request & {
    user?: User;
};
export declare const register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCurrentUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export declare const updateProfile: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export {};
