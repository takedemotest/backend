const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async(request, reply)=>{
    
    try{
    debugger;
    const {name, email, password} = request.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
       return reply.code(400).send({
        message:'Already user available.'
       })
    };

    const hasPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password:hasPassword
    })

    reply.code(201).send({message: "user register sucessfully, Please login to continue..."})}
            catch (error) {
            reply.code(500).send({ message: "Server error" });
        }
};

exports.login = async(request, reply)=>{
     try{
    const {email, password} = request.body;
    const user = await User.findOne({email});
    if(!user){
        return reply.code(401).send({message:'Invalid credentials'});
    };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return reply.code(401).send({message:'Invalid credentials'});
    }
    const token =jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
    reply.send({
        id: user._id,
        name: user.name,
        email: user.email,
        token
    });
}catch(error){
    return reply.code(500).send({
        message:'Server error'
    })
}
};

