import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: String,
    password: String,
});

userSchema.pre('save', async function () {
    // TODO: fix update user bug
    this.password = await bcrypt.hash(this.password, 10); // will generate salt with 10 rounds
});

const User = model('User', userSchema);

export default User;