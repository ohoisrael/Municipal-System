import express from 'express';
import { registerProperty, approveProperty, getUserProperties, getAllProperties } from '../controllers/property.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/register', verifyToken, registerProperty);
router.put('/approve/:propertyId', approveProperty);
router.get('/user-properties', verifyToken, getUserProperties);
router.get('/all-properties', getAllProperties);

export default router;
