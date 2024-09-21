const jwt = require('jsonwebtoken')

const generatetoken = (payload,expire) =>{
    return jwt.sign(payload,process.env.TOKEN_SECRET, {
        expiresIn:expire
    });
}

module.exports = {
    generatetoken
}