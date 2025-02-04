import jwt from 'jsonwebtoken';
import { AppError } from './error.js';
import { User } from '../models/User.js';
import { AppDataSource } from '../config/database.js';
// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
    try {
        let token;
        // Get token from Authorization header
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new AppError('Not authorized to access this route', 401);
        }
        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token using TypeORM repository
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id: decoded.id },
                select: ['id', 'name', 'email', 'role'] // Exclude password
            });
            if (!user) {
                throw new AppError('User not found', 404);
            }
            // Add user to request object
            req.user = user;
            next();
        }
        catch (error) {
            throw new AppError('Not authorized to access this route', 401);
        }
    }
    catch (error) {
        next(error);
    }
};
// Grant access to specific roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AppError('Not authorized to access this route', 401));
        }
        if (!roles.includes(req.user.role)) {
            return next(new AppError('User role not authorized to access this route', 403));
        }
        next();
    };
};
// Generate JWT Token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
};
//# sourceMappingURL=auth.js.map