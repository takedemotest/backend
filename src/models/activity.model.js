import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true  
        },
        category: {
            type: String,
            required: [true, 'Category is required'],   
            trim: true,
            enum: ['Animal', 'Health', 'Inventory', 'Milk Production', 'Other']
        }
    },
    {
        timestamps: true // Correct Mongoose timestamps option
    }
);

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;