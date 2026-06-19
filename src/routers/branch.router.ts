import { Router } from 'express';
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from '../controllers/branch.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getAllBranches);
router.get('/:id', authMiddleware, roleMiddleware('ADMIN', 'SUPERADMIN'), getBranchById);
router.post('/', authMiddleware, roleMiddleware('SUPERADMIN'), createBranch);
router.put('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), updateBranch);
router.delete('/:id', authMiddleware, roleMiddleware('SUPERADMIN'), deleteBranch);

export default router;