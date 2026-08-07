const User=require("../model/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const usercontroller={}
usercontroller.register=async(req,res)=>{
    const{username,email,password}=req.body
    try{
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"Email already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.status(201).json({message:"Registration successful",user})
    }catch(err){
        console.error(err.message)
        res.status(500).json({message:err.message})
    }
}

usercontroller.login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const userExists=await User.findOne({email})
        if(!userExists){
            return res.status(404).json({message:"email not found"})
        }
        const checkPassword=await bcrypt.compare(password,userExists.password)
        if(!checkPassword){
            return res.status(400).json({message:'password invalid'})
        }

        const token=jwt.sign({id:userExists._id,role:userExists.role},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({message:"login successful",token,userExists:{id:userExists.id,username:userExists.username,email:userExists.email}})
    }catch(err){
        console.error(err.message)
        return res.status(500).json({message:err.message})
    }
}
module.exports=usercontroller
