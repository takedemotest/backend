import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        index: true, 
        trim: true 
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['cow', 'sheep', 'goat', 'buffalo'] 
    },
    age: { 
        type: Number, 
        required: true 
    },
    milkProduction: { 
        type: Number, 
        required: true 
    },
    healthStatus: {
        type: String,
        enum: ['Healthy', 'Sick', 'Under Treatment'],
        default: 'Healthy'
    }
}, {
    timestamps: true
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;