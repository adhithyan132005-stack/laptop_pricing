const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const connectDB=require("../Backend/config/db")
const router=require("./Routes/userRoute")
const port=6000;

dotenv.config()

connectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
