import { IUser } from './user.js';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: IUser;
  }
}

export {};
