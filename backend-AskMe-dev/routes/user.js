const { Router } = require('express')
const { logErrorLocation, verifyToken, isUser } = require('../scripts/utils')
const { getUser } = require('../services/userService')
const router = new Router()


router.get('/' , verifyToken  , isUser, (req , res) => {
    try{
        getUser(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
   }catch(error){
        logErrorLocation(__filename , "/signup" , error)
        throw new Error(error)
   }
})

module.exports = router;