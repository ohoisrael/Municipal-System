import Payment from '../models/payment.model.js';
import { errorHandler } from '../utils/error.js';

export const createPayment = async (req, res, next) => {
    const { amount } = req.body;
    if (amount < 600) {
        return next(errorHandler(400, 'Payment amount must be 600 or above'));
    }
    try {
        const payment = new Payment({
            userId: req.user.id,
            amount,
        });
        const savedPayment = await payment.save();
        res.status(201).json(savedPayment);
    } catch (error) {
        next(error);
    }
};

export const getUserPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find({ userId: req.user.id });
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

export const getAllPayments = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to see all payments'));
    }
    try {
        const payments = await Payment.find().populate('userId', 'username email');
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};
