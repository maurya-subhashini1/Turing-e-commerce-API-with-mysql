const knex=require("../database/db")
const generateUniqueId=require("generate-unique-id")



Get_gernete_unique=(req,res)=>{
        id=generateUniqueId({
            includeSymbols:['@','#','|'],
            excludeSymbols:['0']
        })
        res.send({cart_id:id})
    
}

shoppingcart_add=(req,res)=>{
    const add={
        cart_id:req.body.cart_id,
        product_id:req.body.product_id,
        attributes:req.body.attributes,
        quantity:1,
        added_on:new Date()
    }

    knex("shopping_cart").insert(add)
        .then((data)=>{
            knex("shopping_cart")
            .select("*").where("item_id",data)
            .then((postData)=>{
                res.json({
                    succes:true,
                    status:200,
                    message:"post succesfully",
                    data:postData
                })
            }).catch((err)=>{
                console.log(err)
                res.send({
                    message:"Not posted data succesfully",
                    err:err
                }) 
            })
        }).catch((err)=>{
            console.log(err)
            res.send({
                message:"this data already posted",
                error:err
            })
        })
}

shoppin_data=(req,res)=>{
    knex.select("*").from("shopping_cart")
    .then((shopping_cart)=>{
        res.send({message:"get data successfully",data:shopping_cart})
    }).catch((err)=>{
        res.send({message:"not get data",error:err})
        console.log(err)
    })
}

Get_shopping_cart_BY_cart_id=(req,res)=>{
    knex("shopping_cart")
    .join("product","product.product_id","shopping_cart.product_id")
    .select("item_id","product.name","attributes","product.product_id",
    "product.price","quantity","product.image").where("cart_id",req.params.cart_id)
    .then((shoppin_data)=>{
        console.log(shoppin_data);
        for(i of shoppin_data){
            i.subtotal=i.price * i.quantity
        }
        res.json({
            succes:true,
            status:201,
            message:"Get shopping_cart data successfullly",
            shoppin_data:shoppin_data
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"Not get shopping data",
            error:err
        })
        console.log(err);


    })
}

update_BY_item=(req,res)=>{
    knex.select("*").from("shopping_cart").where('item_id',req.params.item_id).update({
        quantity:req.body.quantity
    }).then((update_data)=>{
        res.json({
            succes:true,
            status:200,
            message:"Quantity update succesfully",
            update:update_data
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"Not update quantity data",
            error:err
        })
        console.log(err);
    })
    
}

delete_cart_id=(req,res)=>{
    knex.delete("cart_id").from("shopping_cart").where("cart_id",req.params.cart_id)
    .then((delete_cart_id)=>{
    res.json({
        succes:true,
        status:201,
        message:"cart_id deleted succesfully",
        delete_cart_id:delete_cart_id
    })
}).catch((err)=>{
    res.json({
        succes:false,
        status:400,
        message:"Not deleted cart_id data",
        error:err
    })
    console.log(err);

})
}

Get_totalAmount_of_product=(req,res)=>{
    knex("shopping_cart")
    .join('product','product.product_id','shopping_cart.product_id')
    .select('*').where('shopping_cart.cart_id',req.params.cart_id)
    .then((totalAmount)=>{
        console.log(totalAmount)
        sum=0
        for(i of totalAmount){
            sum+=i.price * i.quantity
            
        }
        res.send({
            total_Amount:sum

        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"Not totalamount cart_id data",
            error:err
        })
        console.log(err);
    })

}

delete_product_BY_item_id=(req,res)=>{
    knex.delete("*").from("shopping_cart").where("item_id","=",req.params.item_id)
    .then((delete_product)=>{
        res.json({
            succes:true,
            status:200,
            message:"deleted product successfully",
            delete_product:delete_product
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"not deleted product",
            error:err
        })
        console.log(err);
    })
}
module.exports={Get_gernete_unique,shoppingcart_add,update_BY_item,delete_cart_id,Get_totalAmount_of_product,shoppin_data,Get_shopping_cart_BY_cart_id,delete_product_BY_item_id}


