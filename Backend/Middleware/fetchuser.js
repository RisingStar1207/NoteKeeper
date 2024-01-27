var jwt = require('jsonwebtoken');
require('dotenv').config();
var JWT_secret = process.env.REACT_APP_JWT_SECRET;

var fetchUser=(req,res,next)=>{
    var token = req.header("authToken");
    if(!token){
        return res.status(401).json({error:"Please authenticate with a correct Token"})
    }
    try {
        var string = jwt.verify(token,JWT_secret);
        req.user = string.user;
        next();
    } catch (error) {
        return res.status(401).json({error:"Please authenticate with a correct Token"})
    }
}

module.exports = fetchUser;