const activityController = require('../controllers/activity.controller');

async function activityRoutes(fastify){
    fastify.get('/activities', activityController.getActivities)
    fastify.post('/activities', activityController.createActivity)
}
module.exports = activityRoutes