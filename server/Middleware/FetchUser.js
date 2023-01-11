const jwt = require('jsonwebtoken')

const fetchUser = (req,res,next)=>{
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send({eror: "Use valid token"});
    }

    try {
        const id = jwt.verify(token,process.env.SECRET);
        req.user = id;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal error"});
    }
}

module.exports = { fetchUser};
