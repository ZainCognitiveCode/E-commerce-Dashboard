// Making Schema and models for the User
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String
    });

module.exports = mongoose.model("users",userSchema)