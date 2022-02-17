const knex=require("../database/db")

Get_All_data_Prodectes=(req,res)=>{

    let page=req.query.page
    let limit=req.query.limit
    
    if(page && limit){
        page=parseInt(page)
        console.log(page)

        limit=parseInt(limit)
        page=page*limit-limit
    }else{
        page=0
        limit=7
    }
    knex.select("*").from("product").limit(limit).offset(page)

    .then((get_data)=>{
        res.json({
          succes:true,
          status:201,
          message:"Get All Prodect  Data successdully",
          Data:get_data  
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:401,
            message:"Not Get Prodect  Data successdully",
            error:err  
          }) 
    })
}

Search_products=(req,res)=>{
  let search=req.query.search

    let page=req.query.page
    let limit=req.query.limit
    if(page && limit){
      page=parseInt(page)
      limit=parseInt(limit)
      page=page*limit-limit
  }else{
      page=0
      limit=101
  }

  knex.select("*").from("product").where("name",'like',`%${search}%`).limit(limit).offset(page)
  .then((data)=>{
    res.send({message:"search data succesfully",data:data})
  }).catch((err)=>{
    res.send({message:"not search data"})
    console.log(err)
  })
}

Get_BY_product_id=(req,res)=>{
  knex.select("*").from("product").where("product_id","=",req.params.product_id)
  .then((prodect_id_data)=>{
    res.json({
      succes:true,
      status:200,
      message:"get prodect id",
      data:prodect_id_data
    })
  }).catch((err)=>{
    console.log(err)
    res.json({
      succes:false,
      status:400,
      message:"NOt get prodect id",
      error:err
    })
  })
}

Get_DataBY_Category_id=(req,res)=>{
  let page=req.query.page
    let limit=req.query.limit
    
    if(page && limit){
        page=parseInt(page)

        limit=parseInt(limit)
        page=page*limit-limit
    }else{
        page=0
        limit=7
    }
    knex("product")
    .innerJoin("product_category","product_category.category_id","product.product_id")
    .select("*").from("product").where("product_category.category_id","=",req.params.category_id).limit(limit).offset(page)
    .then((category_idData)=>{
      res.json({
        succes:true,
        status:200,
        message:"Get By data category_id ",
        category_idData:category_idData
      })
    }).catch((err)=>{
      res.send({
        succes:false,
        status:400,
        message:"Not get data in category id ",
        error:err
      })
      console.log(err)
    })
}



Get_BY_department_id=(req,res)=>{
  let page=req.query.page
  let limit=req.query.limit
  
  if(page && limit){
      page=parseInt(page)

      limit=parseInt(limit)
      page=page*limit-limit
  }else{
      page=0
      limit=7
  }
  knex("product")
  .innerJoin("category","category.department_id","product.product_id")
  .select("*").from("product").where("category.department_id","=",req.params.department_id).limit(limit).offset(page)
  .then((data)=>{
    res.send({message:"get department id data",data:data})
  }).catch((err)=>{
    res.sen({message:"not get id",err:err})
  })
}

Get_BY_prodect_id_detail=(req,res)=>{
  knex.select("product_id","name","description","price","discounted_price","image","image_2").from("product").where("product_id","=",req.params.product_id)
  .then((prodect_id_data)=>{
    res.json({
      succes:true,
      status:200,
      message:"get prodect_id detailes",
      data:prodect_id_data
    })
  }).catch((err)=>{
    console.log(err)
    res.json({
      succes:false,
      status:400,
      message:"NOt get prodect id detailes",
      error:err
    })
  })
}

Get_location_of_prodect=(req,res)=>{
  knex("product_category")
  .innerJoin("category","category.category_id","product_category.category_id")
  .innerJoin("department","department.department_id","category.department_id")
  .select({"category_id":"product_category.category_id","category_name":"category.name","department_name":"department.name","department_id":"category.department_id"})
  .where("product_category.product_id",req.params.product_id)
  .then((data)=>{
    console.log(data)
    res.send({message:"get location of product successfully",data:data})
  }).catch((err)=>{
    res.send({error:"error",err:err})
    console.log(err);
  })

}

Post_review_By_product_id=(req,res)=>{
  const user={
    customer_id:req.userData.customer_id,
    product_id:req.body.product_id,
    review:req.body.review,
    rating:req.body.rating,
    created_on:new Date()
  }
  knex("review").insert(user)
        .then((data)=>{
            knex.select("*").from("review").where("review_id",data)
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
    
Get_reviewData_from_product_id=(req,res)=>{
  knex("review")
  .innerJoin("customer","customer.customer_id","review.customer_id")
  .select("name","review","rating","created_on").from("review").where("review.product_id","=",req.params.product_id)
  .then((get_data)=>{
    res.json({
      succes:true,
      status:200,
      message:"get data",
      get_data:get_data

    })
  }).catch((err)=>{
    res.json({
      succes:false,
      status:400,
      message:"not get",
      error:err
    })
    console.log(err);
  })

}



module.exports={Get_All_data_Prodectes,Get_BY_product_id,Get_BY_department_id,Get_BY_prodect_id_detail,Get_location_of_prodect,Search_products,Get_DataBY_Category_id,Post_review_By_product_id,Get_reviewData_from_product_id}