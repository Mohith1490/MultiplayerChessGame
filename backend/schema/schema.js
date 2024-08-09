import mongoose from "mongoose";
import { Schema } from "mongoose";

const userModel = new Schema({
   firstname:{
    type : String,
    require : true,
   },
   lastname:{
      type: String,
      require : false,
   },
   email : String,
   password :String
})

const myuserModel = mongoose.model('myuserModel',userModel)

export default myuserModel