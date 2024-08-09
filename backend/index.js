import express from "express";
import cors from 'cors'
import  dotenv  from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import myuserModel from './schema/schema.js'
import mongoose from "mongoose";
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


app.post('/',(req,res)=>{
 let {firstname, lastname, email, password}  = req.body
 myuserModel.create({firstname,lastname,email,password})
 res.status(200).send('recived')
})


io.on("connection", (socket) => {
   console.log('socket id',socket.id);
   socket.on('usermoves', ([from,to,piece]) => {
      console.log('sending the coordinates ', [from,to,piece]);      
      socket.emit('move2',[from,to,piece])
   })  
})
