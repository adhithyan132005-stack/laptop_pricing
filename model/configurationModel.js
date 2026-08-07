const mongoose=require("mongoose")
const laptopConfigurationSchema=new mongoose.Schema({
    customerName:String,
    processor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Component",
        required:true
    },
    ram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    storage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    graphicsCard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    display: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    battery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    keyboard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    operatingSystem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Component",
      required: true,
    },

    componentPrices:{
         processor: Number,
         ram: Number,
         storage: Number,
         graphicsCard: Number,
         display: Number,
         battery: Number,
         keyboard: Number,
         operatingSystem: Number,
    },
    totalprice:Number
},{timestamps:true})
module.exports=mongoose.model("LaptopConfiguration",laptopConfigurationSchema)