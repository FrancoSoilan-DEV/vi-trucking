import { Router } from 'express';
import { getDrivers, getNewDriver, postNewDriver, getEditDriver, postEditDriver, postDeleteDriver } from '../../controllers/web/drivers.web.controller.js';

const router = Router();

router.get('/', getDrivers);
router.get('/new', getNewDriver);
router.post('/new', postNewDriver);
router.get('/:id/edit', getEditDriver);
router.post('/:id/edit', postEditDriver);
router.post('/:id/delete', postDeleteDriver);

export default router;