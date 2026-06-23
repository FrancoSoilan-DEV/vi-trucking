import { Router } from 'express';
import { getTrips, getNewTrip, postNewTrip, postDeleteTrip } from '../../controllers/web/trips.web.controller.js';

const router = Router();

router.get('/', getTrips);
router.get('/new', getNewTrip);
router.post('/new', postNewTrip);
router.post('/:id/delete', postDeleteTrip);

export default router;