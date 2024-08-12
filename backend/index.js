import express from "express";
import cors from 'cors'
import  dotenv  from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import myuserModel from './schema/schema.js'
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
       origin: "*",
       methods: ["GET", "POST"] 
   }
});

try { 
   
   let dbresult = await mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
      console.log('connected data base');
      httpServer.listen(4000,()=>{
         console.log('succes started');
      });      
   })
   
} catch (error) {
   console.log(error);   
}


app.post('/',async (req,res)=>{
 let {firstname, lastname, email, password}  = req.body
 let user = await myuserModel.create({firstname,lastname,email,password})
 console.log(user._id);
 let secretkey = process.env.JWT_SECRET_KEY 
 
 const token = jwt.sign({userid: user._id},secretkey,{
   expiresIn: '3h'
 })

//  const verifytoken = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NmI5NmZhMzM5N2FkMDg2ZjM5N2NiM2IiLCJpYXQiOjE3MjM0Mjg3NzIsImV4cCI6MTcyMzQzOTU3Mn0.IsJRhk4db5uFK2b6Tvbr8DpU7Pbd-jA7LyjvbV5wBQI',secretkey)
//   console.log(verifytoken);
 
 res.status(200).json({token}) 
})


io.on("connection", (socket) => {
   console.log('socket id',socket.id);
   socket.on('usermoves', ([from,to,piece,iswhite]) => {
      let turnblack = !iswhite
      console.log('sending the coordinates ', [from,to,piece]);      
      socket.emit('move2',[from,to,piece,turnblack])
   })  
})
