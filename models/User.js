const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    githubId: String,
    linkedinId: String,
});

mongoose.model('users', userSchema);
