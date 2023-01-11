const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
},{timestamps:true})

const Register = mongoose.model('register',registerSchema);
module.exports = Register;