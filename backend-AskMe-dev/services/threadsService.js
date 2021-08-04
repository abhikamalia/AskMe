const { getGroupThreads, createThread, updateAnswer } = require("../mongo/CRUD")
const { logErrorLocation } = require("../scripts/utils")

exports.AllGroupThreadsService = async (req) => {
    try{
        const responseData =  await getGroupThreads(req.params.name)
        if(!responseData){
            throw new Error("Server Error")
        }
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getUser" , error)
    }
}

exports.createThreadService = async (req) => {
    try{
        const threadData = await req.body
       console.log(req.body)
        const responseData =  await createThread(threadData)
        if(!responseData){
            throw new Error("Server Error")
        }
        return responseData
    }catch(error){
        logErrorLocation(__filename , "createThreadService" , error)
    }
}

exports.UpdateAnswerService = async (req) => {
    try{
        const { answers , threadId } = await req.body
        const { group } = await req.params
       console.log(req.body , group)
       const answerData = {
           answers,
           threadId,
           group
       }
        const responseData =  await updateAnswer(answerData)
        if(!responseData){
            throw new Error("Server Error")
        }
        return responseData
    }catch(error){
        logErrorLocation(__filename , "createThreadService" , error)
    }
}
