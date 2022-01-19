const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {type: String, required: true},
    activated: {type: Boolean, required: false, default: false}
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;