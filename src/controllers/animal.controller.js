const Animal = require('../models/animal.model');

exports.getAnimals = async(request, reply)=>{
            try{
                const animals =await Animal.find().lean();
                return animals;
            }
            catch(error){
                reply.status(500).send({message: 'Error fetching animals', error: error.message})
            }

}

exports.createAnimals = async(request, reply)=>{
    try{
      const createAnimal = await Animal.create(request.body);
      await Activity.create({
        title: 'Animal Created',
        description: `Animal ${createAnimal.name} has been created`,
        category: 'Animal',
      })
      return createAnimal;
    }
    catch(error){
        reply.status(500).send({message: 'Error creating animal', error: error.message})
    }
}

exports.updateAnimals = async(request, reply)=>{
    try{
    const {id} = request.params
    const updateAnimal = await Animal.findByIdAndUpdate(
        id,
        request.body,
        {new:true, runValidators:true}
    )
    if(!updateAnimal){
        return reply.status(404).send({message: 'Animal not found'})
    }
    await Activity.create({
        title: 'Animal Updated',
        description: `Animal ${updateAnimal.name} has been updated`,
        category: 'Animal',
      })
    return updateAnimal
}
catch(error){
    reply.status(500).send({message: 'Error updating animal', error: error.message})
}
}

exports.deleteAnimals = async(request, reply)=>{
    const {id} = request.params
    const deleteAnimal = await Animal.findByIdAndDelete(id)
    if(!deleteAnimal){
        return reply.status(404).send({message: 'Animal not found'})
    }
    await Activity.create({
        title: 'Animal Deleted',
        description: `Animal ${deleteAnimal.name} has been deleted`,
        category: 'Animal',
      })
    return {message: 'Animal deleted'}
}
