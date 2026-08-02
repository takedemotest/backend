const fastify = require('fastify')({logger:true});

const cors = require('@fastify/cors');
require ("dotenv").config()

const connectDB = require('./config/db');

//register plugins
fastify.register(cors, {origin:'*'})

//register routes
fastify.register(require('./routes/auth.routes'),{
    prefix:'/api/auth'
})

fastify.register(require('./routes/dashboard.routes'),{
    prefix:'/api/dashboard'
})

fastify.register(require('./routes/animal.routes'), {
    prefix: '/api'
})

fastify.register(require('./routes/activity.routes'), {
    prefix: '/api'
})


const start = async() =>{
    try{
        await connectDB();
        const port = process.env.PORT || 5000
        await fastify.listen({
            port:port,
            host:'0.0.0.0'
        })
        console.log(`server is running on port ${port}`)
    }
    catch(err){
        fastify.log.error(err)
        process.exit(1)
    }
}
start();



