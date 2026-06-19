
import { Router } from 'express';
import { getAllDrivers, getDriverById, createDriver, updateDriver, deleteDriver } from '../controllers/driver.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getAllDrivers);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getDriverById);
router.post('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), createDriver);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), updateDriver);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteDriver);

export default router;