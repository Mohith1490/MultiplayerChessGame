import express from "express";
import cors from 'cors'
import  dotenv  from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import myuserModel from './schema/schema.js'
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userverification from './autnverification/userverfiication.js'
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
 let secretkey = process.env.JWT_SECRET_KEY  
 const token = jwt.sign({userid: user._id},secretkey) 
 res.json({token}) 
})

app.use('/game',userverification)


io.on("connection", (socket) => {
   socket.on('usermoves', ([from,to,piece,iswhite]) => {
      let turnblack = !iswhite
      console.log('sending the coordinates ', [from,to,piece]);      
      socket.emit('move2',[from,to,piece,turnblack])
   })  
})
