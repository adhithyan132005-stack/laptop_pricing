const Component=require("../model/components")
const componentcontroller={}
 componentcontroller.create=async(req,res)=>{
    try{
        const{type,name,price}=req.body
        if(!type || !name|| !price===undefined){
            return re.status(400).json({message:"all fields are required"})
        }
        const component=new Component({type,name,price})
        await component.save()
        res.status(500).json({message:"component created successfully",component})
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
        const component=await Component.findByIdAndUpdate(id,body,{new:true})
     if(!component){
            return res.status({message:"component not found"})
        }
        return res.status(200).json({message:"component updated successfuly ",component})

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