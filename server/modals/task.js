const mongoose=require('mongoose')
const Schema=mongoose.Schema

const taskSchema=new Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("task",taskSchema)