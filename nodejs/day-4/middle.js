const jwt = require('jsonwebtoken')

const secret = 'mysecret'


verifyToken: (req, res, next)=>{
    if (!req.headers['autherization']) return next(createError.Unauthorized())
    const token = req.headers.autherization

    jwt.verify(token, secret, (err, user)=>{
        if (err){
            return next(createError.Unauthorized)
        }

        req.user = user
        next()
    } )
}


module.exports.verifyToken = async (req,res,next)=>{
    const authheader = req.headers.autherization;
    if (authheader){
        // const token = authheader.split(' ')[1]
        jwt.verify(authheader, secretkey, (err, user)=>{
            if (err){
                return res.sendStatus(403);
            } 

            req.user = user;
            next()
        });


    } else{
        res.sendStatus(401)
    }
    
}


