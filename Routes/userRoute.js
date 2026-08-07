const userController=require("../Controller/authenticationController")
const express=require('express')
const router=express.Router()
router.post("/api/register",userController.register)
router.post("/api/login",userController.login)
module.exports=router
