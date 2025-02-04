import { body, param } from 'express-validator';
import { AppDataSource } from '../config/database.js';
import { Room } from '../models/Room.js';
import { AppError } from '../middleware/error.js';
// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req, res, next) => {
    try {
        const roomRepository = AppDataSource.getRepository(Room);
        const rooms = await roomRepository.find();
        res.status(200).json({
            success: true,
            data: rooms
        });
    }
    catch (error) {
        next(new AppError('Error fetching rooms', 500));
    }
};
// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
export const getRoom = async (req, res, next) => {
    try {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await roomRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!room) {
            return next(new AppError('Room not found', 404));
        }
        res.status(200).json({
            success: true,
            data: room
        });
    }
    catch (error) {
        next(new AppError('Error fetching room', 500));
    }
};
// @desc    Create room
// @route   POST /api/rooms
// @access  Admin only
export const createRoom = async (req, res, next) => {
    try {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = roomRepository.create(req.body);
        const result = await roomRepository.save(room);
        res.status(201).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        }
        else {
            next(new AppError('Error creating room', 500));
        }
    }
};
// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Admin only
export const updateRoom = async (req, res, next) => {
    try {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await roomRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!room) {
            return next(new AppError('Room not found', 404));
        }
        roomRepository.merge(room, req.body);
        const result = await roomRepository.save(room);
        res.status(200).json({
            success: true,
            data: result
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(new AppError(error.message, 400));
        }
        else {
            next(new AppError('Error updating room', 500));
        }
    }
};
// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Admin only
export const deleteRoom = async (req, res, next) => {
    try {
        const roomRepository = AppDataSource.getRepository(Room);
        const room = await roomRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!room) {
            return next(new AppError('Room not found', 404));
        }
        await roomRepository.remove(room);
        res.status(200).json({
            success: true,
            message: 'Room deleted successfully'
        });
    }
    catch (error) {
        next(new AppError('Error deleting room', 500));
    }
};
// Validation chains
export const createRoomValidation = [
    body('name').trim().notEmpty().withMessage('Room name is required'),
    body('capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be a positive number'),
    body('equipment_details')
        .trim()
        .notEmpty()
        .withMessage('Equipment details are required'),
    body('status')
        .optional()
        .isIn(['available', 'unavailable', 'maintenance'])
        .withMessage('Invalid status'),
    body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
];
export const updateRoomValidation = [
    param('id').isInt().withMessage('Invalid room ID'),
    body('name').optional().trim().notEmpty().withMessage('Room name cannot be empty'),
    body('capacity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Capacity must be a positive number'),
    body('equipment_details')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Equipment details cannot be empty'),
    body('status')
        .optional()
        .isIn(['available', 'unavailable', 'maintenance'])
        .withMessage('Invalid status'),
    body('imageUrl')
        .optional()
        .isURL()
        .withMessage('Invalid image URL'),
];
//# sourceMappingURL=roomController.js.map