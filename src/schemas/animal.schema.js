exports.createAnimalSchema={
    body:{
        type:'object',
        required:['name', 'type'],
        properties:{
            name: {type:'string'},
            type:{type:'string'},
            age:{type:'number'},
            milkProduction:{type:'number'},
            healthStatus: { type: 'string'}
        }
    }
}