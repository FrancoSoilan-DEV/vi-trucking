import { Router } from 'express';
import { getTrips, getNewTrip, postNewTrip, postDeleteTrip, getTripStatus, postTripStatus } from '../../controllers/web/trips.web.controller.js';

const router = Router();

router.get('/', getTrips);
router.get('/new', getNewTrip);
router.post('/new', postNewTrip);
router.post('/:id/delete', postDeleteTrip);
router.get('/:id/status', getTripStatus);
router.post('/:id/status', postTripStatus);
export default router;