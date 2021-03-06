const mongoose=require('mongoose')


const signupTemplete=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    date:{
        type:Date,
        default:Date.now
    },
    task:{
        type:Array,
        default:[]
    }
})

 

module.exports=mongoose.model('mytable',signupTemplete)