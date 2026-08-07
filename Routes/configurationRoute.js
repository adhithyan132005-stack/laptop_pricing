const configurationController=require("../Controller/configurationController")
const express=require("express")
const configureRouter=express.Router()
configureRouter.get("/api/configurelaptop",configurationController.getconfiguration)
configureRouter.post("/api/configurelaptop",configurationController.createConfiguration)

module.exports=configureRouter