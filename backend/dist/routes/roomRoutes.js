import express from 'express';
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom, createRoomValidation, updateRoomValidation, } from '../controllers/roomController.js';
import { protect, authorize } from '../middleware/auth.js';
const router = express.Router();
// Public routes
router.get('/', getRooms);
router.get('/:id', getRoom);
// Protected routes - Admin only
router.use(protect);
router.use(authorize('admin'));
router.post('/', createRoomValidation, createRoom);
router.put('/:id', updateRoomValidation, updateRoom);
router.delete('/:id', deleteRoom);
export default router;
//# sourceMappingURL=roomRoutes.js.map