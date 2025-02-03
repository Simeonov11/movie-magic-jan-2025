import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // unique: true, // This is not validator, it's index
        lowercase: true, // Sanitizer
        match: /\@[a-zA-Z]+.[a-zA-Z]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: [6, 'Password should be at least 6 characters!'],
        trim: true,
    },
});

// validation for rePassword at The Model level (or do it on service level)
userSchema.virtual('rePassword')
    .set(function(rePassword) {
        if (rePassword !== this.password) {
            throw new Error('Password missmatch');
        }
    });

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10); // will generate salt with 10 rounds
});

const User = model('User', userSchema);

export default User;