const express=require("express")
const dotenv=require("dotenv")
const connectDB=require("../Backend/config/db")
const port=6000;

dotenv.config()

connectDB()

const app=express()
app.use(express.json())

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
