import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = 'IAMSOMETHINGSECRET';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            throw new Error('Invalid email');
        }

        // Check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        // Generate token
        const payload = {
            id: user.id,
            email: user.email,
        }
        // TODO: use async option
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });

        return token;
    }
};