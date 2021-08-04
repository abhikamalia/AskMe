const { MongoClient, ObjectId } = require('mongodb');
const { logErrorLocation } = require('../scripts/utils');
const dotenv = require('dotenv');
const { DB, COLLECTIONS } = require('../scripts/constants');

dotenv.config()

const uri = process.env.MONGO_CONNECT_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.DBConnection = () => {
  client.connect(err => {
    const collection = client.db(DB).collection(COLLECTIONS.USERS);
    // perform actions on the collection object
    console.log("mongoDB connected. ")
  });
}

exports.addUser = async (userData) => {
    try{
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.USERS)
            .insertOne(userData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "addUser" , error)
        throw new Error(error)
    }
}

exports.getUserData = async (email) => {
    try{
        const query = { email: email }
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.USERS)
            .find(query)
            .toArray()
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getUserData" , error)
        throw new Error(error)
    }
}
exports.addGroup = async (groupData) => {
    try{
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.GROUPS)
            .insertOne(groupData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "addGroup" , error)
        throw new Error(error)
    }
}

exports.getAdminGroups = async (username) => {
    try{
        const query = { admin: username }
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.GROUPS)
            .find(query)
            .toArray()
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getAdminGroups" , error)
        throw new Error(error)
    }
}

exports.getAllGroups = async () => {
    try{
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.GROUPS)
            .find()
            .toArray()
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getAllGroups" , error)
        throw new Error(error)
    }
}

exports.getGroupInfo = async (name) => {
    try{
        const query = {name: name}
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.GROUPS)
            .find(query)
            .toArray()
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getGroupInfo" , error)
        throw new Error(error)
    }
}


exports.getGroupThreads = async (group) => {
    try{
        const query = {group: group}
        const sorter = { date: -1 , _id: -1}
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.THREADS)
            .find(query)
            .sort(sorter)
            .toArray()
        return responseData
    }catch(error){
        logErrorLocation(__filename , "getGroupThreads" , error)
        throw new Error(error)
    }
}

exports.createThread = async (threadData) => {
    try{
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.THREADS)
            .insertOne(threadData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "createThread" , error)
        throw new Error(error)
    }
}

exports.updateAnswer = async (data) => {
    try{
        console.log("data: " , data)
        const query = { _id: ObjectId(data.threadId) ,  group: data.group}
        const dataToUpdate = { $set: { answers: data.answers } }
        const responseData = await client
            .db(DB)
            .collection(COLLECTIONS.THREADS)
            .updateOne(query , dataToUpdate)
        console.log("update : " , responseData)
        return responseData
    }catch(error){
        logErrorLocation(__filename , "createThread" , error)
        throw new Error(error)
    }
}


