const { Router } = require('express')
const { logErrorLocation, verifyToken, isUser } = require('../scripts/utils')
const { createGroup, getAdminGroupsData, getUserAllGroups, getGroup } = require('../services/groupsService')
const router = new Router()


router.post('/:username/create' , verifyToken  , isUser, (req , res) => {
    try{
        createGroup(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
   }catch(error){
        logErrorLocation(__filename ,  "POST /groups/:username/create" , error)
        throw new Error(error)
   }
})

router.get('/:username' , verifyToken  , isUser,(req , res) => {
    try{
        getAdminGroupsData(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
    }catch(error){
        logErrorLocation(__filename , "GET /groups/:username" , error)
        throw new Error(error)
   }
})

router.get('/info/:name' , verifyToken  , isUser,(req , res) => {
    try{
        getGroup(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
    }catch(error){
        logErrorLocation(__filename , "GET /groups/:username" , error)
        throw new Error(error)
   }
})

router.get('/:username/all' , verifyToken  , isUser,(req , res) => {
    try{
        getUserAllGroups(req)
            .then((data) => {   
                return res.status(200).json(data)
                
            }).catch((err) => {
                return res.status(400).json(err)
            })
    }catch(error){
        logErrorLocation(__filename , "GET /groups/:username/all" , error)
        throw new Error(error)
   }
})

module.exports = router;