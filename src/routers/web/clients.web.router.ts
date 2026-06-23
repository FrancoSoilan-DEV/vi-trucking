import { Router } from 'express';
import { getClients, getNewClient, postNewClient, getEditClient, postEditClient, postDeleteClient } from '../../controllers/web/clients.web.controller.js';

const router = Router();

router.get('/', getClients);
router.get('/new', getNewClient);
router.post('/new', postNewClient);
router.get('/:id/edit', getEditClient);
router.post('/:id/edit', postEditClient);
router.post('/:id/delete', postDeleteClient);

export default router;