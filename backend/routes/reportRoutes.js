import express from 'express';
import {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,
    getCollectorReports
} from '../controllers/reportController.js';
import { protect, admin, garbageCollector } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, garbageCollector, createReport)
    .get(protect, getAllReports);

router.route('/collector')
    .get(protect, garbageCollector, getCollectorReports);

router.route('/:id')
    .get(protect, getReportById)
    .put(protect, admin, updateReport)
    .delete(protect, admin, deleteReport);

export default router;