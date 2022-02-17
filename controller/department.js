const knex=require("../database/db")

getData=(req,res)=>{
    knex.select("*").from("department")
    .then((department)=>{
        res.send({message:"get data successfully",data:department})
        console.log(department)
    }).catch((err)=>{
        res.send({message:"not get data",error:err})
        console.log(err)
    })
}

deparment_id=(req,res)=>{
    knex.select("*").from("department").where("department_id","=",req.params.department_id)
    .then((id_data)=>{
        res.send({message:"get department_id successfully",id_data:id_data})
        console.log(id_data)

    }).catch((err)=>{
        res.send({message:"not get department_id",error:err})
        console.log(err)
    })
}

module.exports={getData,deparment_id}