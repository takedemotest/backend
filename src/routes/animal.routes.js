const animalController = require('../controllers/animal.controller')
const { createAnimalSchema } = require('../schemas/animal.schema')

async function animalRoutes(fastify){
    fastify.get('/animals' , animalController.getAnimals)
    fastify.post('/animals', {schemas:createAnimalSchema}, animalController.createAnimals)
    fastify.put('/animals/:id', animalController.updateAnimals )
    fastify.delete('/animals/:id', animalController.deleteAnimals)
}
module.exports = animalRoutes