const {getStats} = require('../controllers/dashboard.controller')

async function dashboardRoutes(fastify, options){
 fastify.get('/stats', getStats);
}

module.exports = dashboardRoutes;