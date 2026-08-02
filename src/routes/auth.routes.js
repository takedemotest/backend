const {login, register} = require('../controllers/auth.controller')

async function authRoutes(fastify, options){
fastify.post('/login', login);
fastify.post('/register', register);
}



module.exports = authRoutes;
