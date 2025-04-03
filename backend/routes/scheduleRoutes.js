import express from 'express';
import {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
    getCollectorSchedules
} from '../controllers/scheduleController.js';
import { protect, admin, garbageCollector } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, admin, createSchedule)
    .get(protect, getAllSchedules);

router.route('/collector')
    .get(protect, garbageCollector, getCollectorSchedules);

router.route('/:id')
    .get(protect, getScheduleById)
    .put(protect, updateSchedule)
    .delete(protect, admin, deleteSchedule);

export default router;