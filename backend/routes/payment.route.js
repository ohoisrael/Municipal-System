import express from 'express';
import { createPayment, getUserPayments, getAllPayments } from '../controllers/payment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPayment);
router.get('/user-payments', verifyToken, getUserPayments);
router.get('/all-payments', verifyToken, getAllPayments);

export default router;
