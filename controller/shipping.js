const knex=require("../database/db")



shipping=(req,res)=>{
    knex.select("*").from("shipping_region")
    .then((shipping_data)=>{
        res.json({
            success:true,
            status:200,
            message:"Get data successfully",
            shipping_data:shipping_data
        })
    }).catch((err)=>{
        res.json({
            success:false,
            status:400,
            error:err
        })
        console.log(err)
    })
}

Get_shippingBYId=(req,res)=>{
    knex.select("*").from("shipping").where("shipping_region_id","=",req.params.shipping_region_id)
    .then((shipping_data)=>{
        res.json({
            success:true,
            status:200,
            message:"Get data successfully",
            shipping_data:shipping_data
        })
    }).catch((err)=>{
        res.json({
            success:false,
            status:400,
            error:err
        })
        console.log(err)
    })
}



module.exports={shipping,Get_shippingBYId}