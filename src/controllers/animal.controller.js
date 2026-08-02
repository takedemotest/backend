import Animal from '../models/animal.model.js';
import Activity from '../models/activity.model.js';

export const getAnimals = async (request, reply) => {
    try {
        const animals = await Animal.find().lean();
        return animals;
    } catch (error) {
        return reply.code(500).send({ message: 'Error fetching animals', error: error.message });
    }
};

export const createAnimals = async (request, reply) => {
    try {
        const createAnimal = await Animal.create(request.body);
        await Activity.create({
            title: 'Animal Created',
            description: `Animal ${createAnimal.name} has been created`,
            category: 'Animal',
        });
        return createAnimal;
    } catch (error) {
        return reply.code(500).send({ message: 'Error creating animal', error: error.message });
    }
};

export const updateAnimals = async (request, reply) => {
    try {
        const { id } = request.params;
        const updateAnimal = await Animal.findByIdAndUpdate(
            id,
            request.body,
            { new: true, runValidators: true }
        );
        if (!updateAnimal) {
            return reply.code(404).send({ message: 'Animal not found' });
        }
        await Activity.create({
            title: 'Animal Updated',
            description: `Animal ${updateAnimal.name} has been updated`,
            category: 'Animal',
        });
        return updateAnimal;
    } catch (error) {
        return reply.code(500).send({ message: 'Error updating animal', error: error.message });
    }
};

export const deleteAnimals = async (request, reply) => {
    try {
        const { id } = request.params;
        const deleteAnimal = await Animal.findByIdAndDelete(id);
        if (!deleteAnimal) {
            return reply.code(404).send({ message: 'Animal not found' });
        }
        await Activity.create({
            title: 'Animal Deleted',
            description: `Animal ${deleteAnimal.name} has been deleted`,
            category: 'Animal',
        });
        return { message: 'Animal deleted' };
    } catch (error) {
        return reply.code(500).send({ message: 'Error deleting animal', error: error.message });
    }
};

export default {
    getAnimals,
    createAnimals,
    updateAnimals,
    deleteAnimals
};