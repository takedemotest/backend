import Activity from '../models/activity.model.js';

export const getActivities = async (request, reply) => {
    try {
        const activities = await Activity.find().lean();
        return activities;
    } catch (error) {
        return reply.code(500).send({ 
            message: 'Error fetching activities', 
            error: error.message 
        });
    }
};

export const createActivity = async (request, reply) => {
    try {
        const newActivity = await Activity.create(request.body);
        return reply.code(201).send({ 
            message: 'Activity created successfully', 
            data: newActivity 
        });
    } catch (error) {
        return reply.code(400).send({ 
            message: 'Error creating activity', 
            error: error.message 
        });
    }
};

export default {
    getActivities,
    createActivity
};