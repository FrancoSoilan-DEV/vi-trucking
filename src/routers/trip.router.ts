import { Router } from 'express';
import { getAllTrips, getTripById, createTrip, updateTripStatus, deleteTrip } from '../controllers/trip.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN', 'DRIVER', 'CLIENT'), getAllTrips);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN', 'DRIVER', 'CLIENT'), getTripById);
router.post('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), createTrip);
router.put('/:id/status', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN', 'DRIVER'), updateTripStatus);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteTrip);

export default router;