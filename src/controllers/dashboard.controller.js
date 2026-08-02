import Animal from '../models/animal.model.js';

export const getStats = async (request, reply) => {
    try {
        const animals = await Animal.find();
        const milkProduction = animals.map(a => a.milkProduction || 0);

        const animalDistribution = {
            cow: 0,
            buffalo: 0,
            goat: 0
        };

        animals.forEach(a => {
            if (animalDistribution[a.type] !== undefined) {
                animalDistribution[a.type]++;
            }
        });

        return {
            animalDistribution,
            milkProduction
        };
    } catch (error) {
        reply.code(500).send({
            error: 'Failed to fetch dashboard statistics',
            message: error.message
        });
    }
};