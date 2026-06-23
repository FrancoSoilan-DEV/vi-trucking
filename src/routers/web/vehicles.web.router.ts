import { Router } from 'express';
import { getVehicles, getNewVehicle, postNewVehicle, getEditVehicle, postEditVehicle, postDeleteVehicle } from '../../controllers/web/vehicles.web.controller.js';

const router = Router();

router.get('/', getVehicles);
router.get('/new', getNewVehicle);
router.post('/new', postNewVehicle);
router.get('/:id/edit', getEditVehicle);
router.post('/:id/edit', postEditVehicle);
router.post('/:id/delete', postDeleteVehicle);

export default router;