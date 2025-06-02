import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dueDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;