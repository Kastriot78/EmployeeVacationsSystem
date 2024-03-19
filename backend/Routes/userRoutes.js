import express from 'express';
const router = express.Router();

import {
    isAuth,
    isAdmin
} from '../utils/generateToken.js';
import {
    getAllUsers,
    register,
    login,
    deleteUser
} from '../controllers/userController.js';

router.get('/', isAuth, getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.delete('/:id', isAuth, isAdmin, deleteUser);

export default router;