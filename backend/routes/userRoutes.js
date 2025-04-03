import express from 'express';
const router = express.Router();
import {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';


router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/')
    .get(protect, admin, getAllUsers);

router.route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUserById)
    .delete(protect, admin, deleteUserById);

export default router;