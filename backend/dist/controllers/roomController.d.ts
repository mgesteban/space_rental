import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
type RequestWithUser = Request & {
    user?: User;
};
export declare const getRooms: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getRoom: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createRoom: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export declare const updateRoom: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteRoom: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
export declare const createRoomValidation: import("express-validator").ValidationChain[];
export declare const updateRoomValidation: import("express-validator").ValidationChain[];
export {};
