const jwt = require('jsonwebtoken');

function isAuthorized(req,res,next){
    if(typeof req.headers.authorization !== "undefined"){
        let authHeader = req.headers.authorization.split(" ");
        if(authHeader.length==2){
            let token = authHeader[1];
            let privateKey = process.env.PASSWORD;
    
            jwt.verify(token,privateKey,{algorithm: "HS256"}, (err,decoded)=>{
                if(err){
                    res.status(500).json({error: "Not Authorized"})
                }    
                console.log(decoded);
                return next();
            })
        }else{
            res.status(500).json({error: "Bad authorization token; example : jwt {token}"});
        }
       
    }else{
        res.status(500).json({error: "Not Authorized"});
    }
}

module.exports = isAuthorized;