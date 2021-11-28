const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const router=require('./routes/routes')
const cors=require('cors')
const jwt=require('jsonwebtoken')


dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS,()=>{
    console.log("data base connected");   
}) 

app.use(express.json()) 
app.use(cors())    
app.use('/',router) 
app.listen(4000,()=>{
    console.log("server is running ");
})  