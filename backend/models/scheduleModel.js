import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    bin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: [true, 'Bin reference is required']
    },
    collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Garbage collector is required']
    },
    scheduledDate: {
        type: Date,
        required: [true, 'Scheduled date is required']
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'missed'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true,
        default: ''
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Admin assignment is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;