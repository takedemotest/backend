import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';


import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import animalRoutes from './routes/animal.routes.js';
import activityRoutes from './routes/activity.routes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();

const fastify = Fastify({ logger: true });

// Register plugins
await fastify.register(cors, { origin: '*' });

await fastify.register(fastifySwagger,{
    openapi:{
        info:{
            title:'Krishito Farm Management API',
            description:'API documentation',
            version:'1.0.0'
        }
    }
});

await fastify.register(fastifySwaggerUi,{
    routePrefix:'/docs',
    uiConfig:{
        docExpansion:'list',
        deepLinking:false
    }
})

// Register routes
await fastify.register(authRoutes, { prefix: '/api/auth' });
await fastify.register(dashboardRoutes, { prefix: '/api/dashboard' });
await fastify.register(animalRoutes, { prefix: '/api' });
await fastify.register(activityRoutes, { prefix: '/api' });
await fastify.register(transactionRoutes, { prefix: '/api/transactions' });

const start = async () => {
    try {
        await connectDB();
        const port = Number(process.env.PORT) || 5000;
        await fastify.listen({
            port: port,
            host: '0.0.0.0'
        });
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
