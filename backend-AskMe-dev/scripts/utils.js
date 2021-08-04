const jwt = require('jsonwebtoken')


exports.logErrorLocation = (filePath , method , error) => {
    const errorData = {
        filePath,
        method,
        error 
    }
    console.log(errorData);
}

exports.generateToken = (userData) => {
    try{
        const data = {
            sub: userData.email,
            userType: userData.userType
        }
        console.log("userdata : " , userData)
        const token = jwt.sign({
            "sub": userData.email,
            "userType": userData.userType,
          } , process.env.JWT_TOKEN_SECRET)
        return token
    }catch(error){
        this.logErrorLocation(__filename , "generateToken" , error)
        throw new Error(error)
    }
}

exports.verifyToken = (req , res , next) => {
    try{
        const authToken = req.headers.authorization
        if(!authToken){
            res.status(401).send("Access denied / Unauthorized.")
        }
        const tokenSplit = authToken.split(" ")
        const token = tokenSplit[1]
        if(!tokenSplit[1] || token === null || !token){
            res.status(401).send("Access denied / Unauthorized.")
        }
        const verified = jwt.verify(token , process.env.JWT_TOKEN_SECRET)
        if(!verified){
            res.status(401).send("Access denied / Unauthorized.")
        }
        
        req.user = verified
        next()
    }catch(error){
        this.logErrorLocation(__filename , "verifyToken" , error)
        throw new Error(error)
    }
}

/*
    Normal user = 0
    Admin user  = 1
*/

exports.isUser = (req , res , next) => {
    if(req.user.userType === 0){
        next()
    }else{
        console.log("hey")
        res.status(401).send("Unauthorized!");
    }
}

exports.isAdmin = (req , res , next) => {
    if(req.user.userType === 1){
        next()
    }else {
        res.status(401).send("Unauthorized!");
    }
}



