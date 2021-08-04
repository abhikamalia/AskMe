const { getUserData } = require("../mongo/CRUD")
const { logErrorLocation } = require("../scripts/utils")

exports.getUser = async (req) => {
    try{
        const responseData =  await getUserData(req.user.email)
        if(!responseData){
            throw new Error("Server Error")
        }
        console.log("res: " , responseData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getUser" , error)
    }
}