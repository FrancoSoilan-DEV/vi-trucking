import { Router } from 'express';
import { getAllVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getAllVehicles);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getVehicleById);
router.post('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), createVehicle);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), updateVehicle);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteVehicle);

export default router;