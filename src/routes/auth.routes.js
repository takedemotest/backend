import { login, register } from '../controllers/auth.controller.js';

async function authRoutes(fastify, options) {
  fastify.post('/login', login);
  fastify.post('/register', register);
}

export default authRoutes;
