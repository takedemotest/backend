import activityController from '../controllers/activity.controller.js';

async function activityRoutes(fastify) {
    fastify.get('/activities', activityController.getActivities);
    fastify.post('/activities', activityController.createActivity);
}

export default activityRoutes;