const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
        title:{
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        description:{
            type: String,
            required: [true, 'Description is required'],
            trim: true  
        },
        category:{
            type: String,
            required: [true, 'Category is required'],   
            trim: true,
            enum: ['Animal', 'Health', 'Inventory', 'Milk Production', 'Other']
        }
},{
    timestamps:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Activity', ActivitySchema);