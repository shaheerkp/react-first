const express = require("express");
const router = express.Router();
const signupTempleteCopy = require("../modals/signupModal");
const jwt=require('jsonwebtoken')
const Task=require('../modals/task');
var ObjectId = require('mongoose').Types.ObjectId; 


function verifytoken(req,res,next){  
console.log("reached verifytoken"); 
  let token=req.header('x-access-token')
  token=token.split(" ")[1]
  console.log(token);
  if(!token){
    res.status(401).json({msg:"No token autherisation denied"})
  }
  else{
    try {
      console.log("checking token");
     jwt.verify(token,"secret",(err,user)=>{
       if(err){
         console.log("errr",err);
          res.json({status:false,mes:"Token is not valid!"}) 
       }
       else{
        console.log("no errr",user); 
         req.user=user;
         next()
       }
     })
       
      
    } catch (error) {
      res.status(400).json({msg:"Token is not valid"})
      
    }

  }
  


}

router.post("/signup", (req, res) => {
  const signedupUser = new signupTempleteCopy({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  signupTempleteCopy.find({ email: req.body.email }, function (err, docs) {
    console.log(docs[0]);

  if(!docs[0]){ 
    signedupUser 
      .save()
      .then((data) => {
        console.log(data); 
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
        console.log(err);
      });

  } 
  else{
    res.json({err:true,mes:"user already exist please login"})

  }
  })

  
});


router.post("/signin", (req, res) => {
  console.log("its hereeee on signin");
 
  useremail = req.body.email;
  userpassword = req.body.password;
  
  
  signupTempleteCopy.find({ email: useremail }, function (err, docs) {
    console.log(docs[0]);
    if (docs[0]) {
      if (docs[0].password == userpassword) {
        let resp={
          id:docs[0]._id,
          email:docs[0].fullName
        }
        let token=jwt.sign(resp,"secret",{expiresIn:60}) 
        res.json({ status: true, mes: "login success",token:token ,user:docs[0]});
      } else {
        res.json({ status: false, mes: "login failed" });
      }
    } 
    else {
      console.log("else");
      res.json({ status: false, mes: "User not found" });
    }
  });
}); 
router.post("/addtask",async(req,res)=>{
  console.log("task addding");
  console.log(req.body)
  toadd={
    date:Date.now(),
    iscompleted:false,
    task:req.body.task
  }
  try {
    signupTempleteCopy.updateOne({ _id:req.body.userid},{$push:{task:toadd}},function(err,succ){
      if(!err) return res.json({status:true,mes:"Task added Successfully"})

      else return res.json({status:false,mes:"Failed to add task"})
     
      
    })
    
  } catch (error) {
    res.send({status:false,mes:error})
    
  }
})

router.post("/gettasks",async(req,res)=>{

    signupTempleteCopy.find({ _id: ObjectId(req.body.id) }, function (err, docs) {
      console.log(docs[0].task)
      res.json(docs[0].task)
    })


})

router.post("/changestatus",async(req,res)=>{
  console.log(req.body);
  let id=req.body.userid
  signupTempleteCopy.updateOne({_id:ObjectId(id),"task.date":req.body.date},{$set:{"task.$.iscompleted":!req.body.iscompleted}},function(err,docs){

    console.log("docs",docs)
    console.log("errr",err);
  })

})

router.post("/delete",(req,res)=>{ 
  console.log("delete")
  console.log(req.body)
  let id=req.body.userid
  signupTempleteCopy.updateOne({_id:ObjectId(id)}, { "$pull": { "task": { "date": req.body.date } }}, { safe: true, multi:true }, function(err, docs) {
    console.log("docs",docs)
    console.log("errr",err);
    
});

}) 

router.get("/home",verifytoken,(req,res)=>{
  console.log("reached home"); 
 res.json({status:true,mes:"Validated",user:req.user})
})

module.exports = router;
  