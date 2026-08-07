const LaptopConfiguration=require("../model/configurationModel")
const Component=require("../model/components")
const configurationController={}
configurationController.createConfiguration=async(req,res)=>{
    try{
        const {
      customerName,
      processor,
      ram,
      storage,
      graphicsCard,
      display,
      battery,
      keyboard,
      operatingSystem,
    } = req.body;

 const processorData = await Component.findById(processor);
    const ramData = await Component.findById(ram);
    const storageData = await Component.findById(storage);
    const graphicsData = await Component.findById(graphicsCard);
    const displayData = await Component.findById(display);
    const batteryData = await Component.findById(battery);
    const keyboardData = await Component.findById(keyboard);
    const osData = await Component.findById(operatingSystem);
if (
      !processorData ||
      !ramData ||
      !storageData ||
      !graphicsData ||
      !displayData ||
      !batteryData ||
      !keyboardData ||
      !osData
    ) {
      return res.status(404).json({
        message: "One or more components not found",
      });
    }
 const totalPrice =
      processorData.price +
      ramData.price +
      storageData.price +
      graphicsData.price +
      displayData.price +
      batteryData.price +
      keyboardData.price +
      osData.price;

      const configuration= new LaptopConfiguration({customerName,
      processor,
      ram,
      storage,
      graphicsCard,
      display,
      battery,
      keyboard,
      operatingSystem,

      componentPrices: {
        processor: processorData.price,
        ram: ramData.price,
        storage: storageData.price,
        graphicsCard: graphicsData.price,
        display: displayData.price,
        battery: batteryData.price,
        keyboard: keyboardData.price,
        operatingSystem: osData.price,
      },

      totalPrice,})
       await configuration.save()
      res.status(201).json({message:"configuration created successfully",configuration})
     

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
configurationController.getconfiguration=async(req,res)=>{
    try{
        const configurations=await LaptopConfiguration.find().populate("processor")
      .populate("ram")
      .populate("storage")
      .populate("graphicsCard")
      .populate("display")
      .populate("battery")
      .populate("keyboard")
      .populate("operatingSystem")
      .sort({ createdAt: -1 });

      res.status(200).json({count:configurations.length,configurations})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports=configurationController