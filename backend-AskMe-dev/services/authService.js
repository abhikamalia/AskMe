const { SALT_ROUNDS } = require('../scripts/constants')
const { logErrorLocation, generateToken } =  require('../scripts/utils')

const bcrypt = require('bcryptjs')
const { addUser, getUserData } = require('../mongo/CRUD')



exports.signUp = async (req) => {
    try{
        const { email , password , firstName, lastName , userType} = await req.body
        const username = email.split('@')[0]
        const generatedSalt = await bcrypt.genSaltSync(SALT_ROUNDS)
        const hashedPassword = await bcrypt.hashSync(password , generatedSalt)
        const userData = {
            email: email,
            password: hashedPassword,
            firstName,
            lastName,
            userType,
            username
        }
        const responseData = addUser(userData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "signUp" , error)
        throw new Error(error)
    }
}

exports.login = async (req) => {
    try{
        const { email , password } = req.body
        const userData = {email , password}
        const responseUserData = await getUserData(userData.email)
        const validPassword = await bcrypt.compareSync(password , responseUserData[0].password)
        if(!validPassword){
            throw new Error("Email/Password is incorrect.")
        }
        const token = generateToken(responseUserData[0])
        if(!token){
            throw new Error("Token not generated")
        }
        
        delete responseUserData[0].password
        delete responseUserData[0].userType
        return { responseUserData , token }
        
    }catch(error){
        logErrorLocation(__filename , "login" , error)
        throw new Error(error)
    }
}