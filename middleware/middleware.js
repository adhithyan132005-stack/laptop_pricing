const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    try{
        const authHeader=req.header.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Access denied,No token provided"})

        }
        const token=authHeader.split(" ")[1]
        const verifying=jwt.verify(token,process.env.JWT_SECRET)
        req.user=verifying
        next()
    }catch(err){
        res.status(401).json({
            message:"invalid or expired token"
        })
    }
}
module.exports=authMiddleware