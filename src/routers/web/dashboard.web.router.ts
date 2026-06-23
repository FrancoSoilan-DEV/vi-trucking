import { Router } from 'express';
import { getDashboard } from '../../controllers/web/dashboard.web.controller.js';

const router = Router();

router.get('/', getDashboard);

export default router;