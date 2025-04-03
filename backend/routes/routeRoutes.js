import express from 'express';
import {
    createRoute,
    getAllRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
    getCollectorRoutes
} from '../controllers/routeController.js';
import { protect, admin, garbageCollector } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, admin, createRoute)
    .get(protect, getAllRoutes);

router.route('/collector')
    .get(protect, garbageCollector, getCollectorRoutes);

router.route('/:id')
    .get(protect, getRouteById)
    .put(protect, updateRoute)
    .delete(protect, admin, deleteRoute);

export default router;