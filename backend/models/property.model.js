import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    houseNumber: {
        type: String,
        required: true,
    },
    landline: {
        type: String,
        required: true,
    },
    landSize: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Under Review',
    },
    amount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;
