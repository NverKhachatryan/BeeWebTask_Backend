import express = require('express');
import { createWorkspace, getWorkspace, updateWorkspace, deleteWorkspace, checkWorkspaceSlug } from '../controllers/workspaceController';
import { authenticateToken } from '../middleware/authenticate';

const router = express.Router();

router.get('/slug/:slug', authenticateToken, checkWorkspaceSlug);

router.post('/', authenticateToken, createWorkspace);

router.get('/', authenticateToken, getWorkspace);

router.put('/:id', authenticateToken, updateWorkspace);

router.delete('/:id', authenticateToken, deleteWorkspace);

export default router;