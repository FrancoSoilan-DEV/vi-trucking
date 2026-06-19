import { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getAllUsers);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getUserById);
router.post('/', authMiddleware, roleMiddleware('SUPERADMIN', 'ADMIN'), createUser);
router.put('/:id', authMiddleware, roleMiddleware('SUPERADMIN', 'ADMIN'), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteUser);

export default router;