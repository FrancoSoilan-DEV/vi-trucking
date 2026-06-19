import { Router } from 'express';
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/client.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getAllClients);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getClientById);
router.post('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), createClient);
router.put('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), updateClient);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteClient);

export default router;