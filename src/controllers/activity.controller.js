const Activity = require('../models/activity.model');

exports.getActivities = async(request, reply)=>{
    try{
            const activities = await Activity.find().lean();
            return activities;
    }
    catch(error){
            reply.status(500).send({message: 'Error fetching activities', error: error.message})   
    }
}

exports.createActivity = async(request, reply)=>{
    try{
         const createActivity = await Activity.create(request.body);
         reply.status(201).send({message: 'Activity created successfully', data: createActivity});
         return createActivity;
    }
    catch(error){
        reply.status(400).send({message: 'Error creating activity', error: error.message})
    }
}