const knex=require("../database/db")
const jwt =require("jsonwebtoken")
const cookies=require("cookie-parser")

Registion=(req,res)=>{
    if (!req.body.name || !req.body.password || !req.body.email) {
        res.status(500)
        return res.json({
            message: "failed all required"
        })
    }else{
        const user={
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
        }
        knex("customer").insert(user)
        .then((data)=>{
            knex.select("*").from("customer").where("customer_id",data)
            .then((post)=>{
                res.json({
                    succes:true,
                    status:200,
                    message:"customer Registered succesfully",
                    data:post
                })
            }).catch((err)=>{
                console.log(err)
                res.send({
                    message:"Email is already exite",
                    err:err
                }) 
            })
        }).catch((err)=>{
            console.log(err)
            res.send({
                message:"this data already",
                error:err
            })
        })
    }
    
}

login=(req,res)=>{
    knex.select("*").from("customer").where("password","=",req.body.password,"email","=",req.body.email)
    .then((data)=>{
        var token=jwt.sign({customer_id:data[0].customer_id},"subhashini",{expiresIn:"1h"})
        res.cookie("user",token)
        res.send({message:"login succesfully",data:data,token:token})
    }).catch((err)=>{
        console.log(err)
        res.send({error:"some informition is wrong",err:err})
    })
}
Get_by_customer_id=(req,res)=>{
    knex.select("*").from("customer").where("customer_id","=",req.params.customer_id)
    .then((customer_id_data)=>{
        res.send({message:"get customer_id succesfully",customer_id_data:customer_id_data})
    }).catch((err)=>{
        console.log(err)
        res.send({error:"not get customer_id",err:err})
    })
}

update_a_customers=(req,res)=>{
    knex.from("customer").where("customer_id","=",req.params.customer_id).update({
        name:req.body.name,
        email:req.body.email,
        password:req.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone
    }).then((updatedata)=>{
        res.send({message:"update succesfully",data:updatedata})
    }).catch((err)=>{
        console.log(err)
        res.send({error:"not update",error:err})
    })
}

update_customer_address=(req,res)=>{
    knex.from("customer").where("customer_id","=",req.params.customer_id).update({
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.postal_code,
        country:req.body.country,
        shipping_region_id:req.body.shiipping_region_id
    }).then((updateAddress)=>{
        res.send({message:"update address data succesfully",updateAddress:updateAddress})
    }).catch((err)=>{
        res.send({error:"not updated",error:err})
        console.log(err)
    })
}

update_credit_card=(req,res)=>{
    knex.from("customer").where("customer_id","=",req.params.customer_id).update({
        credit_card:req.body.credit_card
    }).then((credit_carddata)=>{
        res.send({message:"Get updated data credit card succesfully",credit_card:credit_carddata})
    }).catch((err)=>{
        res.send({message:"Not updated ",err:err})
        console.log(err)
    })
        
}
        



module.exports={Registion,login,Get_by_customer_id,update_a_customers,update_customer_address,update_credit_card}