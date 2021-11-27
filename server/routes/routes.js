const express = require("express");
const router = express.Router();
const signupTempleteCopy = require("../modals/signupModal");
const jwt=require('jsonwebtoken')


function verifytoken(req,res,next){    
  const token=req.header('x-auth-token')
  if(!token){
    res.status(401).json({msg:"No token autherisation denied"})
  }
  try {
   jwt.verify(token,"secret",(err,user)=>{
     if(err){
       return res.status(401).json("Token is not valid!")
     }
     else{
       req.user=user;
       next()
     }
   })
     
    
  } catch (error) {
    res.status(400).json({msg:"Token is not valid"})
    
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
          email:docs[0].email
        }
        let token=jwt.sign(resp,"secret",{expiresIn:86400}) 
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

router.get("/",verifytoken,(req,res)=>{



})

module.exports = router;
