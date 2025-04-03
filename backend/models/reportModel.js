import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
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
    collectionDate: {
        type: Date,
        required: [true, 'Collection date is required']
    },
    wasteVolume: {
        type: Number,
        required: [true, 'Waste volume is required'],
        min: 0
    },
    issues: {
        type: String,
        trim: true,
        default: ''
    },
    rewardPointsAssigned: {
        type: Number,
        default: 0,
        min: 0
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

reportSchema.pre('save', async function(next) {
    if (this.isNew) {
        const bin = await mongoose.model('Collection').findById(this.bin);
        if (bin && bin.reportedBy && bin.status === 'collected' && bin.rewardAssigned) {
            this.rewardPointsAssigned = 10;
        }
    }
    next();
});

const Report = mongoose.model('Report', reportSchema);

export default Report;