const { addGroup, getAllGroups, getAdminGroups, getGroupInfo } = require("../mongo/CRUD")
const { logErrorLocation } = require("../scripts/utils")

exports.createGroup = async (req) => {
    try{
        const { admin , name , description , createdAt} = req.body
        const groupData = {
            admin,
            name,
            members: [],
            description,
            createdAt
        }
        const responseData =  await addGroup(groupData)
        if(!responseData){
            throw new Error("Server Error")
        }
        console.log("res: " , responseData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getUser" , error)
    }
}

exports.getAdminGroupsData = async (req) => {
    try{
        const { username } = req.params
        const responseData = await getAdminGroups(username)
        if(!responseData){
            throw new Error("Server Error")
        }
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getAdminGroups" , error)
    }
}

exports.getUserAllGroups = async (req) => {
    try{
        const { username } = req.params
        const responseData = await getAllGroups()
        if(!responseData){
            throw new Error("Server Error")
        }
        const userAllGroups = []
        responseData.forEach((group) => {
            if(group.members.includes(username) || group.admin === username){
                userAllGroups.push(group)
            }
        })
        return userAllGroups
    }catch(error){
        logErrorLocation(__filename , "getUserMemberedGroups" , error)
    }

}

exports.getGroup = async (req) => {
    try{
        const { name } = req.params
        const responseData = await getGroupInfo(name)
        if(!responseData){
            throw new Error("Server Error")
        }
        return responseData[0]
    }catch(error){
        logErrorLocation(__filename , "getGroup" , error)
    }
}