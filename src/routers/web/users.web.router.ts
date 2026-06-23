import { Router } from 'express';
import { getUsers, getNewUser, postNewUser, getEditUser, postEditUser, postDeleteUser } from '../../controllers/web/users.web.controller.js';

const router = Router();

router.get('/', getUsers);
router.get('/new', getNewUser);
router.post('/new', postNewUser);
router.get('/:id/edit', getEditUser);
router.post('/:id/edit', postEditUser);
router.post('/:id/delete', postDeleteUser);

export default router;