const express = require('express')
const cors = require("cors");
const { port } = require('./scripts/constants')
const { DBConnection } = require('./mongo/CRUD')
const AuthRouter = require('./routes/auth')
const UserRouter = require('./routes/user');
const GroupsRouter = require('./routes/groups')
const ThreadsRouter = require("./routes/threads")
const app = express()


app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

DBConnection()



app.use('/api/v1/auth' , AuthRouter)
app.use("/api/v1/user" ,  UserRouter)
app.use("/api/v1/groups" , GroupsRouter)
app.use("/api/v1/threads" , ThreadsRouter)


app.listen(port , () => {
    console.log("Server running at port " , port)
})