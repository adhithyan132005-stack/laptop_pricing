const mongoose=require("mongoose")
const componentSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:[
            "processor",
            "RAM",
            "Storage",
            "Graphics Card",
            "Display",
            "Battery",
            "Keyboard",
            "Operating System",
        ]
    },
    name:String,
    price:Number
},{timestamps:true})

module.exports=mongoose.model("Component",componentSchema)