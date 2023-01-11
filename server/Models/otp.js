const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone:{
        type:String,
    },
    otp:String
},{timestamps:true})

const Otp = mongoose.model('otp',otpSchema);
module.exports = Otp;