const express = require('express')
const router = express.Router()
const signupTempleteCopy = require("../modals/signupModal")

router.post('/signup', (req, res) => {
    console.log("its hereeee");
    console.log(req.body);

    const signedupUser = new signupTempleteCopy({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    signedupUser.save().then((data) => {
        console.log(data);
        res.json(data)

    }).catch((err) => {
        res.json(err)
        console.log(err);

    })


})

router.post('/signin', (req, res) => {
    console.log("its hereeee on signin");
    console.log(req.body);
    useremail = req.body.email
    userpassword = req.body.password


    signupTempleteCopy.find({email:useremail},function(err,docs){
        console.log(docs);
    })


})

module.exports = router