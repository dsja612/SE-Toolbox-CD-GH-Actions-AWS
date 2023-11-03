import express from 'express';

import { getAllUsers, addUser, updateUser, deleteUser, getUserByName } from '../controllers/users';
import { requireAdmin, requireAuth, requireCorrectUser } from '../utils/middleware';

export default (router: express.Router) => {
    router.get('/users', requireAuth, requireAdmin, getAllUsers);
    router.get('/users/:username', requireAuth, requireCorrectUser, getUserByName);
    router.post('/users', addUser);
    router.patch('/users/:username', requireAuth, requireCorrectUser, updateUser);
    router.delete('/users/:username', requireAuth, requireCorrectUser, deleteUser);
}