const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    active:{
        type:Boolean
    }
})
const mongodbModel=mongoose.model("user",userSchema);
module.exports=mongodbModel;