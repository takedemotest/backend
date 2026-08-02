const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
          name:{ type: String, required: true ,index: true,trim:true},
          type:{ type: String, required: true , enum:['cow', 'sheep', 'goat', 'baffalo']},
          age:{ type: Number, required: true },
          milkProduction:{ type: Number, required: true },
         healthStatus: {
                type: String,
                enum: ['Healthy', 'Sick', 'Under Treatment'],
                default: 'Healthy'
}
},{
    timestamps:true
})

module.exports = mongoose.model('animals', animalSchema)


