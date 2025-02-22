const jwt = require('jsonwebtoken')

const  verifyToken =( req,res,next)=>{
    const authHeader= req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify( token, process.env.JWT_SECRET ,(err,user)=>{
            if(err) return res.status(403 ).json("Token is not Valid ")
                
            req.user = user;
            next();
        })

    }else{
        return res.status(401).json("You are not authenticated !!!")
    }

}


const verifyTokenAndAutherization = (req, res , next )=>{
    verifyToken(req , res , ()=>{

        if(  req.user.userId == req.params.id || req.user.userId == req.params.userId ){
            next();
        }else{
            return res.status(403 ).json("You are not allowed to do that ! ")
        }
    })

}



const verifyTokenAndAdmin = (req, res , next )=>{
    verifyToken(req , res , ()=>{
        if(  req.user.isAdmin  ){
            next();
        }else{
            return res.status(403 ).json("You are not allowed to do that ! ")
        }
    })

}

module.exports = {verifyToken , verifyTokenAndAutherization ,verifyTokenAndAdmin}