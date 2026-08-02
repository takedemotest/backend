import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (request, reply) => {
    try {
        const { name, email, password } = request.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return reply.code(400).send({
                message: 'Already user available.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return reply.code(201).send({
            message: "User registered successfully, Please login to continue..."
        });
    } catch (error) {
        return reply.code(500).send({ message: "Server error" });
    }
};

export const login = async (request, reply) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email });
        if (!user) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return reply.code(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return reply.send({
            id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        return reply.code(500).send({
            message: 'Server error'
        });
    }
};