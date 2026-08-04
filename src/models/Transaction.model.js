import mongoose from 'mongoose';

const EXPENSE_VALUES = ['Seeds', 'Feed', 'Fertilizer', 'Pesticides', 'Healthcare', 'Labor', 'Transport', 'Other'];
const REVENUE_VALUES = ['Sales', 'Other'];

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
        validate:{
            validator:function(value){
                if(this.type === 'EXPENSE'){
                    return EXPENSE_VALUES.includes(value);
                } else if(this.type === 'REVENUE'){
                    return REVENUE_VALUES.includes(value);
                }
                return true;
            },
            message: props => `${props.value} is not a valid category for type ${this.type}`
        }
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