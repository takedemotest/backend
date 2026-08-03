import mongoose from 'mongoose';

const transactionSchema= new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['EXPENSE', 'REVENUE']
    },
    mainActivity:{
        type: String,
        required: true,
        enum: ['CROP_FARMING', 'DAIRY_FARMING', 'GOAT_FARMING', 'POULTRY_FARMING', 'PIGGERY']
    },
    subActivity:{
        type: String
    },
    amount:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        required: true,
        enum:['Seeds', 'Feed', 'Fertilizer', 'Pesticides', 'Healthcare', 'Labor', 'Transport', 'Sales', 'Other']
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        trim: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    }
})

const TransactionModel =  mongoose.model('TransactionModel', transactionSchema);

export default TransactionModel