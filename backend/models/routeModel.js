import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
    collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Garbage collector is required']
    },
    bins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }],
    startLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [true, 'Start coordinates are required']
        }
    },
    endLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: [true, 'End coordinates are required']
        }
    },
    distance: {
        type: Number,
        default: 0
    },
    estimatedTime: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['planned', 'in-progress', 'completed'],
        default: 'planned'
    },
    plannedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Admin planner is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

routeSchema.index({ startLocation: '2dsphere', endLocation: '2dsphere' });

const Route = mongoose.model('Route', routeSchema);

export default Route;