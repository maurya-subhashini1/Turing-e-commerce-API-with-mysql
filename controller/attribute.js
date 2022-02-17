const knex=require("../database/db")

Get_attribute_data=(req,res)=>{
    knex.select("*").from("attribute")
    .then((attribute_data)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get attribute data successfully",
            attribute_data:attribute_data
        })
    }).catch((err)=>{
        res.json({
        succes:false,
        status:400,
        message:"Not Get data attribute data",
        error:err
        })
    })
}


Get_attribute_id=(req,res)=>{
    knex.select("*").from("attribute").where("attribute_id","=",req.params.attribute_id)
    .then((attribute_idDtata)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get By id data attribute successfully",
            attribute_idDtata:attribute_idDtata
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:500,
            error:"Not get attribute_id ",
            error:err
        })
    })
}


Get_attribute_value=(req,res)=>{
    knex("attribute")
    .innerJoin("attribute_value","attribute_value.attribute_id","attribute.attribute_id",)
    .select("*").where("attribute_value.attribute_id","=",req.params.attribute_id)
    .then((attribute_valueData)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get attribute_value successfully ",
            attribute_value:attribute_valueData
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:500,
            message:"Not Get attribute_value ",
            error:err
        })
    })
}

Get_product_idData=(req,res)=>{
    knex("attribute")
    .innerJoin("attribute_value","attribute_value.attribute_id","attribute.attribute_id")
    .innerJoin("product_attribute","attribute_value.attribute_value_id","product_attribute.attribute_value_id")
    .select("*").where("product_attribute.product_id",req.params.product_id)
    .then((product_idData)=>{
        res.send({message:"get data product_id",product_idData:product_idData})
    }).catch((err)=>{
        res.send({message:"not get data",err:err})
        console.log(err)
    })
}




module.exports={Get_attribute_data,Get_attribute_id,Get_attribute_value,Get_product_idData}