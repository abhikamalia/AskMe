const { Router } = require('express')
const { logErrorLocation, verifyToken, isUser } = require('../scripts/utils')
const {  AllGroupThreadsService, createThreadService, UpdateAnswerService } = require('../services/threadsService')

const router = new Router()


router.post('/:group/create' , verifyToken  , isUser, (req , res) => {
    try{
        createThreadService(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
   }catch(error){
        logErrorLocation(__filename ,  "POST /threads/:group/create" , error)
        throw new Error(error)
   }
})

router.get('/:name' , verifyToken  , isUser,(req , res) => {
    try{
        AllGroupThreadsService(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
    }catch(error){
        logErrorLocation(__filename , "GET /threads/:name" , error)
        throw new Error(error)
   }
})

router.post('/:group/update' , verifyToken  , isUser, (req , res) => {
    try{
        UpdateAnswerService(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
   }catch(error){
        logErrorLocation(__filename ,  "POST /threads/:group/update" , error)
        throw new Error(error)
   }
})

module.exports = router;