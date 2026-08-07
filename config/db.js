const mongoose=require("mongoose")
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MangoDB connected successfully")
    }catch(err){
        console.log("database connection failed")
        console.log(err.message)
    }


}
module.exports=connectDB;