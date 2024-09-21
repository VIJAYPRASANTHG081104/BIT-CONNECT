const jwt = require('jsonwebtoken');

const authUser = (req,res,next) =>{
    try {
        let temp = req.header("Authorization");
        const token = temp?temp.slice(7,temp.length):"";
        if(!token){
            return res.status.send({msg:"Invalid Authorization"});
        }        
        jwt.verify(token,process.env.TOKEN_SECRET,(error,user)=>{
            if(error){
                return res.status.send({msg:"Invalid Authorization"});
            }
            req.user = user;
            next();
        })
    } catch (error) {
        
    }
}

module.exports ={
    authUser
}