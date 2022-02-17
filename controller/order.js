const knex=require("../database/db")



create_order=(req,res)=>{
    knex("shopping_cart")
    .innerJoin("product","shopping_cart.product_id","product.product_id")
    .select('*')
    .then((data)=>{
        sum=0
        for (i of data){
            sum+=i.price *  i.quantity
        }
      
        knex("orders").insert({
            total_amount:sum,
            created_on:new Date(),
            shipped_on:new Date(),
            status:1,
            customer_id:req.userData.customer_id, 
            shipping_id:req.body.shipping_id,
            tax_id:req.body.tax_id

        })
        .then((postData)=>{
            for(i of data){
               const order_detail={
                order_id:postData[0] ,
               product_id:i.product_id,
               attributes:i.attributes,
               product_name:i.name,
               quantity:i.quantity,
               unit_cost:i.price
               }
               knex("order_detail").insert(order_detail)
               .then((order_detail_Data)=>{
               }).catch((err)=>{
                   res.json({
                       succes:false,
                       status:500,
                       message:"Not inserted order_detail",
                       error:err
                   })
               })
            }
            knex.select("*").from("shopping_cart").where("cart_id","=",req.body.cart_id).del()
            .then((del_data)=>{
                res.send({message:"deleted successfully",del_data:del_data})
            }).catch((err)=>{
                res.send({ err:err})
                console.log(err)
            })

        }).catch((err)=>{
            res.json({
                succes:false,
                status:500,
                error:"not post data",
                error:err
            })
        })
    }).catch((err)=>{
        res.send({error:"error",err:err})
        console.log(err)
    })

}


Get_BYID_order_id=(req,res)=>{
    knex.select("*").from("order_detail").where("order_id","=",req.params.order_id)
    .then((Get_orders_id)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get order_id data succesfully",
            Get_orders_id:Get_orders_id
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:500,
            message:"Not get order_id",
            error:err
        })
        console.log(err);
    })
}


Get_dataIncustomer_ByID=(req,res)=>{
    knex("orders")
    .join("customer","customer.customer_id","orders.order_id")
    .select("order_id","total_amount","created_on","shipped_on","status","customer.name")
    .where("customer.customer_id","=",req.userData.customer_id)
    .then((orders_data)=>{
        console.log(orders_data);
        res.json({
            succes:true,
            status:201,
            message:"Get orders in customer id successfully",
            orders_data:orders_data
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:401,
            message:"Not get orders",
            error:err
        })
        console.log(err);
    })
}

Get_informition_BY_order_id=(req,res)=>{
    knex("orders")
    .join("customer","customer.customer_id","orders.order_id")
    .select("order_id","total_amount","created_on","shipped_on","status")
    .where("order_id","=",req.params.order_id)
    .then((short_details)=>{
        res.json({
            succes:true,
            status:201,
            message:"Get informtion about order successfully",
            short_details:short_details
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:401,
            message:"Not get short_details",
            error:err
        })
        console.log(err);
    })
}

module.exports={create_order,Get_BYID_order_id,Get_dataIncustomer_ByID,Get_informition_BY_order_id}