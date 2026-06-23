import { Router } from 'express';
import { getBranches, getNewBranch, postNewBranch, getEditBranch, postEditBranch, postDeleteBranch } from '../../controllers/web/branches.web.controller.js';

const router = Router();

router.get('/', getBranches);
router.get('/new', getNewBranch);
router.post('/new', postNewBranch);
router.get('/:id/edit', getEditBranch);
router.post('/:id/edit', postEditBranch);
router.post('/:id/delete', postDeleteBranch);

export default router;