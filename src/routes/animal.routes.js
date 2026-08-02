import animalController from '../controllers/animal.controller.js';
import { createAnimalSchema } from '../schemas/animal.schema.js';

async function animalRoutes(fastify) {
    fastify.get('/animals', animalController.getAnimals);
    fastify.post('/animals', { schema: createAnimalSchema }, animalController.createAnimals);
    fastify.put('/animals/:id', animalController.updateAnimals);
    fastify.delete('/animals/:id', animalController.deleteAnimals);
}

export default animalRoutes;