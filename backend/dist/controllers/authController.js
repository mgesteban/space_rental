import { validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { AppError } from '../middleware/error.js';
import { generateToken } from '../middleware/auth.js';
import { AppDataSource } from '../config/database.js';
import bcrypt from 'bcryptjs';
// Type guards
const isRegisterRequest = (body) => {
    return (typeof body.name === 'string' &&
        typeof body.email === 'string' &&
        typeof body.password === 'string');
};
const isLoginRequest = (body) => {
    return typeof body.email === 'string' && typeof body.password === 'string';
};
const isUpdateProfileRequest = (body) => {
    return ((body.name === undefined || typeof body.name === 'string') &&
        (body.email === undefined || typeof body.email === 'string') &&
        (body.password === undefined || typeof body.password === 'string'));
};
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return next();
        }
        if (!isRegisterRequest(req.body)) {
            throw new AppError('Invalid request body', 400);
        }
        const userRepository = AppDataSource.getRepository(User);
        const { name, email, password } = req.body;
        // Check if user exists
        const userExists = await userRepository.findOne({ where: { email } });
        if (userExists) {
            throw new AppError('User already exists', 400);
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        });
        await userRepository.save(user);
        // Generate token
        const token = generateToken(user.id);
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        res.status(201).json({
            user: userData,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            next(new AppError('An unexpected error occurred', 500));
        }
    }
};
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return next();
        }
        if (!isLoginRequest(req.body)) {
            throw new AppError('Invalid request body', 400);
        }
        const userRepository = AppDataSource.getRepository(User);
        const { email, password } = req.body;
        // Find user
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid credentials', 401);
        }
        // Generate token
        const token = generateToken(user.id);
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        res.json({
            user: userData,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            next(new AppError('An unexpected error occurred', 500));
        }
    }
};
// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            throw new AppError('User not authenticated', 401);
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: req.user.id },
            select: ['id', 'name', 'email', 'role']
        });
        if (!user) {
            throw new AppError('User not found', 404);
        }
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            next(new AppError('An unexpected error occurred', 500));
        }
    }
};
// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            throw new AppError('User not authenticated', 401);
        }
        if (!isUpdateProfileRequest(req.body)) {
            throw new AppError('Invalid request body', 400);
        }
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: req.user.id } });
        if (!user) {
            throw new AppError('User not found', 404);
        }
        if (req.body.name)
            user.name = req.body.name;
        if (req.body.email)
            user.email = req.body.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        await userRepository.save(user);
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
        else {
            next(new AppError('An unexpected error occurred', 500));
        }
    }
};
//# sourceMappingURL=authController.js.map