import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
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

const Task = mongoose.model('Task', taskSchema);

export default Task;