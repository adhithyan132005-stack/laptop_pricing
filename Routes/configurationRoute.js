const configurationController=require("../Controller/configurationController")
const express=require("express")
const authMiddleware=require("../middleware/middleware")
const configureRouter=express.Router()
configureRouter.get("/api/configurelaptop",configurationController.getconfiguration)
configureRouter.post("/api/configurelaptop",configurationController.createConfiguration)
configureRouter.put("/api/configurelaptop",configurationController.updateConfiguration)
configureRouter.delete("/api/configurelaptop",configurationController.deleteConfiguration)
configureRouter.get("/api/configurations/search",configurationController.searchConfiguration);
configureRouter.get("/api/dashboard",authMiddleware,configurationController.dashboard
);
module.exports=configureRouter