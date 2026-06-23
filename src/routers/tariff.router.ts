import { Router } from 'express';
import { getAllTariffs, getTariffById, createTariff, updateTariff, deleteTariff } from '../controllers/tariff.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getAllTariffs);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getTariffById);
router.post('/', authMiddleware, roleMiddleware('SUPERADMIN'), createTariff);
router.put('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), updateTariff);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteTariff);

export default router;