const knex=require("../database/db")


Get_Tax_data=(req,res)=>{
    knex.select("*").from("tax")
    .then((tax_Data)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get All_Tax data successfully",
            tax_Data:tax_Data
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"Not get data ",
            err:err

        })
    })
}

Get_tax_id=(req,res)=>{
    knex.select("*").from("tax").where("tax_id","=",req.params.tax_id)
    .then((Get_id_data)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get tax id succesfully",
            Get_id_data:Get_id_data
    
            })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"Not Get tax id ",
            err:err
    
            })
    })
        
}
module.exports={Get_Tax_data,Get_tax_id}