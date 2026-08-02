import { getStats } from '../controllers/dashboard.controller.js';

async function dashboardRoutes(fastify, options) {
  fastify.get('/stats', getStats);
}

export default dashboardRoutes;