import express from 'express';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/usersController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// protect these with requireAuth
router.get('/users', requireAuth, listUsers);
router.get('/user/:id', requireAuth, getUser);
router.post('/user/create', requireAuth, createUser);
router.put('/user/update/:id', requireAuth, updateUser);
router.delete('/user/delete/:id', requireAuth, deleteUser);

export default router;
