const Animal = require('../models/animal.model')
exports.getStats = async (request, reply)=>{
        const animals = await Animal.find();
        const milkProduction = animals.map(a=>a.milkProduction || 0);

        const animalDistribution ={
            cow:0,
            buffalo:0,
            goat:0
        }
        animals.forEach(a=>{
            if(animalDistribution[a.type] !== undefined){
                animalDistribution[a.type]++
            }
        })

        return{
            animalDistribution,
            milkProduction
        }
}