import mongoose from 'mongoose';
import User from './userModel.js';

const collectionSchema = new mongoose.Schema({
    binId: {
        type: String,
        required: [true, 'Bin ID is required'],
        unique: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [true, 'Coordinates are required']
        }
    },
    fillLevel: {
        type: Number,
        required: [true, 'Fill level is required'],
        min: 0,
        max: 100,
        default: 0
    },
    wasteType: {
        type: String,
        enum: ['organic', 'recyclable', 'non-recyclable', 'hazardous'],
        required: [true, 'Waste type is required']
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'collected', 'overflow'],
        default: 'pending'
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    assignedCollector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    lastCollected: {
        type: Date,
        default: null
    },
    collectionSchedule: {
        type: Date,
        default: null
    },
    sensorData: {
        batteryLevel: {
            type: Number,
            min: 0,
            max: 100,
            default: 100
        },
        lastPing: {
            type: Date,
            default: Date.now
        }
    },
    rewardAssigned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

collectionSchema.index({ location: '2dsphere' });

collectionSchema.pre('save', async function(next) {
    this.updatedAt = Date.now();

    // Award points when status changes to 'collected'
    if (this.isModified('status') && this.status === 'collected' && !this.rewardAssigned && this.reportedBy) {
        const resident = await User.findById(this.reportedBy);
        if (resident && resident.role === 'resident') {
            await resident.addRewardPoints(10);
            this.rewardAssigned = true;
        }
    }
    next();
});

collectionSchema.methods.needsCollection = function() {
    return this.fillLevel >= 80 || this.status === 'overflow';
};

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;