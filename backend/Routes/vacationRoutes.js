import express from 'express';
const router = express.Router();

import {
    isAuth,
    isAdmin
} from '../utils/generateToken.js';
import {
    createVacation,
    getUserVacationHistory,
    getUserApprovedVacationHistory,
    getApprovedVacationsWithUserInfo,
    updateVacationStatus,
    getUserVacationsHistoryByStatus,
    getVacationsForToday,
    getVacationsForWeek,
    deleteVacation,
    getVacactionsForEveryMonth
} from '../controllers/vacationController.js';

// router.get('/all', isAuth, isAdmin, getAllVacations);
router.get('/status/:status', isAuth, isAdmin, getUserVacationsHistoryByStatus);
router.get('/all/approved', isAuth, getApprovedVacationsWithUserInfo); // admin can view all pending vacations with user
// router.get('/', isAuth, isAdmin, getPendingVacationsWithUserInfo); // admin can view all pending vacations with user
router.get('/:userId', isAuth, getUserVacationHistory);
router.get('/vacations/today', isAuth, isAdmin, getVacationsForToday);
router.get('/vacations/week', isAuth, isAdmin, getVacationsForWeek);
router.get('/chart/chartData', isAuth, isAdmin, getVacactionsForEveryMonth);
router.post('/request', isAuth, createVacation);
router.get('/:userId/approved', isAuth, getUserApprovedVacationHistory);
router.put('/update', isAuth, isAdmin, updateVacationStatus);
router.delete('/remove/:vacationId', isAuth, deleteVacation);

export default router;

// send email to me, when vacation request is created.