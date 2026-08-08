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

        res.status(200).json({count:configurations.length,configurations, totalPrice: configurations.map(c => c.totalPrice)})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}

configurationController.updateConfiguration = async (req, res) => {
  try {
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
        success: false,
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

    const configuration = await LaptopConfiguration.findByIdAndUpdate(
      req.params.id,
      {
        customerName,
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

        totalPrice,
      },
      { new: true }
    );

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }
   

    res.status(200).json({
      success: true,
      message: "Configuration updated successfully",
      configuration,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
configurationController.deleteConfiguration = async (req, res) => {
  try {
    const configuration = await LaptopConfiguration.findByIdAndDelete(req.params.id);

    if (!configuration) {
      return res.status(404).json({
        message: "Configuration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Configuration deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

configurationController.searchConfiguration = async (req, res) => {
  try {
    const { customerName } = req.query;

    const configurations = await LaptopConfiguration.find({
      customerName: { $regex: customerName, $options: "i" }
    })
      .populate("processor", "type name price")
      .populate("ram", "type name price")
      .populate("storage", "type name price")
      .populate("graphicsCard", "type name price")
      .populate("display", "type name price")
      .populate("battery", "type name price")
      .populate("keyboard", "type name price")
      .populate("operatingSystem", "type name price");

    res.status(200).json({
      count: configurations.length,
      configurations,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });

  }
};

configurationController.dashboard = async (req, res) => {
  try {
    const totalComponents = await Component.countDocuments();

    const totalConfigurations =
      await LaptopConfiguration.countDocuments();

    const configurations = await LaptopConfiguration.find();

    const totalRevenue = configurations.reduce(
      (sum, config) => sum + (config.totalPrice || 0),
      0
    );

    const averagePrice =
      totalConfigurations > 0
        ? totalRevenue / totalConfigurations
        : 0;

    const highestConfiguration = await LaptopConfiguration.findOne()
      .sort({ totalPrice: -1 })
      .populate("processor ram storage graphicsCard display battery keyboard operatingSystem");

    res.status(200).json({
      totalComponents,
      totalConfigurations,
      totalRevenue,
      averagePrice,
      highestConfiguration,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports=configurationController