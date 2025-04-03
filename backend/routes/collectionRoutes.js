import express from 'express';
import {
    createCollection,
    getAllCollections,
    getCollectionById,
    updateCollection,
    deleteCollection,
    getNearbyCollections,
    assignCollector
} from '../controllers/collectionController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, createCollection) // Resident or Admin can create
    .get(protect, getAllCollections); // Garbage Collector or Admin

router.route('/nearby')
    .get(protect, getNearbyCollections); // Resident, Garbage Collector, Admin

router.route('/:id')
    .get(protect, getCollectionById) 
    .put(protect, updateCollection) 
    .delete(protect, admin, deleteCollection); // Admin only

router.route('/:id/assign')
    .put(protect, admin, assignCollector); // Admin only

export default router;