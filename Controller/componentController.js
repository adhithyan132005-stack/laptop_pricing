const Component=require("../model/components")
const componentcontroller={}
 componentcontroller.create=async(req,res)=>{
    try{
        const{type,name,price}=req.body
        if(!type || !name || price === undefined || price === ""){
            return res.status(400).json({message:"all fields are required"})
        }
        const component = new Component({type, name, price: Number(price), priceHistory: [{price: Number(price), date: new Date()}]});
        await component.save()
        res.status(201).json({message:"component created successfully",component})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
componentcontroller.get=async(req,res)=>{
    try{
        const component=await Component.find().sort({createdAt:-1})
        res.status(200).json({count:component.length,component})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
componentcontroller.getbyid=async(req,res)=>{
    const id=req.params.id
    try{
        const component=await Component.findById(id)
        if(!component){
            return res.status({message:"component not found"})
        }
        return res.status(200).json({component})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
componentcontroller.update=async(req,res)=>{
    const id=req.params.id
    const body=req.body
    try{
        const existing = await Component.findById(id);
        if (!existing) {
            return res.status(404).json({message:"component not found"});
        }
    
        if (body.price !== undefined && Number(body.price) !== existing.price) {
            existing.priceHistory.push({price: Number(body.price), date: new Date()});
            existing.price = Number(body.price);
        }
        
        if (body.type) existing.type = body.type;
        if (body.name) existing.name = body.name;
        await existing.save();
        return res.status(200).json({message:"component updated successfully", component: existing});

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
componentcontroller.remove=async(req,res)=>{
    const id=req.params.id
    
    try{
        const component=await Component.findByIdAndDelete(id)
     if(!component){
            return res.status({message:"component not found"})
        }
        return res.status(200).json({message:"component deleted successfuly ",component})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports=componentcontroller