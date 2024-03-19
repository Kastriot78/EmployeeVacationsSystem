import mongoose from "mongoose";

const vacationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dates: {
        type: [String],
        required: true
    },
    comment: {
        type: String
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const vacationModel = mongoose.model('Vacation', vacationSchema);

export default vacationModel;