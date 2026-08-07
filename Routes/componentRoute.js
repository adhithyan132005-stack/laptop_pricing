const componentRoute=require("../Controller/componentController")
const authMiddleware=require("../middleware/middleware")
const express=require("express")
const componentRouter=express.Router()


componentRouter.post("/api/components",componentRoute.create)
componentRouter.get("/api/components/:id",componentRoute.getbyid)
componentRouter.get("/api/components",componentRoute.get)
componentRouter.put("/api/components/:id",componentRoute.update)
componentRouter.delete("/api/components/:id",componentRoute.remove)
 
module.exports=componentRouter