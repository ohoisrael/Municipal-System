import Property from '../models/property.model.js';
import { errorHandler } from '../utils/error.js';

export const registerProperty = async (req, res, next) => {
    const { address, houseNumber, landline, landSize } = req.body;
    try {
        const property = new Property({
            userId: req.user.id,
            address,
            houseNumber,
            landline,
            landSize,
        });
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        next(error);
    }
};

export const approveProperty = async (req, res, next) => {
    const { amount } = req.body;
    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.propertyId,
            { $set: { status: 'Approved', amount } },
            { new: true }
        );
        res.status(200).json(updatedProperty);
    } catch (error) {
        next(error);
    }
};

export const getUserProperties = async (req, res, next) => {
    try {
        const properties = await Property.find({ userId: req.user.id });
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};

export const getAllProperties = async (req, res, next) => {
    try {
        const properties = await Property.find().populate('userId', 'username email');
        res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};
