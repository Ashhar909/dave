const User = require('../Models/user');
const Register = require('../Models/unverified')
const Otp = require('../Models/otp');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fast2sms = require('fast-two-sms')


exports.login = async(req,res)=>{
    let obj = {
        token:null,
        error:null,
        name:null
    }

    try {
        const {email, password} = req.body;
        let user = await User.findOne({email:email})
        let DbPassword = user.password

        if(!user){
            obj.error = "use valid email"
            return res.status(400).json(obj)
        }

        let comparePass = await bcrypt.compare(password,DbPassword);
        // console.log(comparePass);
        if(!comparePass){
            obj.error = "Incorrect Password"
            return res.status(400).json(obj);
        }
        else{
            const uniqueData = {
                id:user._id
            }
            const token = jwt.sign(uniqueData,process.env.SECRET);
            console.log("LOGGED IN");
            obj.token = token;  
            obj.name = user.name
            res.json(obj);
        }
    } catch (error) {
        obj.error = "Internal server error"
        res.json(obj)
    }
}

exports.regUser = async (req,res) => {
    let obj = {
        token:null,
        error:null,
        name:null,
        message:null
    }
    try {

        const {email, name, password, phone} = req.body
        
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password,salt);
        const register = new Register({
            name,
            email,
            password:securePassword,
            phone
        })

        var rawotp = Math.floor(1000 + Math.random() * 9000).toString();
        // console.log(rawotp);

        // * Send OTP to user
        const msgApi = process.env.MSG
        var options = {
            authorization : msgApi,
            message : `Your Otp is ${rawotp}`,
            numbers:['9322825091']
        }
        
        fast2sms.sendMessage(options)
        .then((response) => {
            obj.message = response.message
            console.log(response)
        }).catch((error) => {
            obj.error = error.message
            return res.json(obj);
        })

        const secureotp = await bcrypt.hash(rawotp, salt)

        const otpCreate = new Otp({
            phone,
            otp:secureotp
        })

        otpCreate.save()
        .then(() => {
            console.log("otp saved")
        })
        .catch((err)=>{
            console.log(err)
        })

        register.save()
        .then(()=>{
            const uniqueData = {
                id:register._id
            }
            const token = jwt.sign(uniqueData,process.env.SECRET);
            console.log("Registered");
            obj.name = name;
            obj.token = token;
            res.json(obj);
        })
        .catch((err)=>{
            obj.error = err.message
            res.json(obj)
        })
    } catch (error) {
        obj.error = "Internal server error"
        res.json(obj)
    }
}

exports.verifyUser = async (req,res) => {
    let obj={
        error:null,
        status:false,
        token:null
    }

    try {
        const otp = req.body.otp
        if(!otp) {
            obj.error = "please provide Otp"
            return res.json(obj); 
        }

        const registerID = req.user.id
        const register = await Register.findOne({_id:registerID})

        const otpRegister = await Otp.findOne({phone:register.phone})

        let compareOtp =  bcrypt.compare(otpRegister.otp,otp);

        if(compareOtp){
            User.create({
                name:register.name,
                phone:register.phone,
                password:register.password,
                email:register.email
            }).then(async (response)=>{
                await Otp.deleteOne({phone:register.phone})
                await Register.deleteOne({_id:registerID})

                const uniqueData = {
                    id:response._id
                }
                const token = jwt.sign(uniqueData,process.env.SECRET);
                obj.status = true;
                obj.token = token;
                res.json(obj);
            }).catch((error)=>{
                obj.error = error.message;
                res.json(obj);
            })
        }
        else{
            obj.error = "Otp did not match"
            return res.json(obj)
        }
    } catch (error) {
        obj.error = "Internal server error"
        res.json(obj)
    }
}
