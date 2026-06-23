import { Router } from 'express';
import { getTariffs, getNewTariff, postNewTariff, getEditTariff, postEditTariff, postDeleteTariff } from '../../controllers/web/tariffs.web.controller.js';

const router = Router();

router.get('/', getTariffs);
router.get('/new', getNewTariff);
router.post('/new', postNewTariff);
router.get('/:id/edit', getEditTariff);
router.post('/:id/edit', postEditTariff);
router.post('/:id/delete', postDeleteTariff);

export default router;