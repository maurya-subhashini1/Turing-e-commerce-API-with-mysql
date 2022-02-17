const knex=require("../database/db")


Category_data=(req,res)=>{
    let oderList=[]
    let oderQuery=req.query.order
    console.log(oderQuery)

    let page=req.query.page
    console.log(page)
    let limit=req.query.limit
    console.log(limit)
    if(oderQuery){
        let order=oderQuery.split(',')

        oderList.push({'column':order[0],'limit':order[1]})
    }
    if(page && limit){
        page=parseInt(page)
        console.log(page)

        limit=parseInt(limit)
        page=page*limit-limit
    }else{
        page=0
        limit=7
    }

    knex.select("*").from("category").orderBy(oderList).limit(limit).offset(page)
    .then((category_data)=>{
        res.json({
            succes:true,
            status:200,
            message:"Get category data successfully",
            category_data:category_data
        })
    }).catch((err)=>{
        res.json({
            succes:false,
            status:400,
            message:"not get category data",
            error:err
        })
        console.log(err);
    })
}


Category_id=(req,res)=>{
    knex.select("*").from("category").where("category_id","=",req.params.category_id)
    .then((id_Data)=>{
        res.send({message:"Get category_id successfully",id_Data:id_Data})
    }).catch((err)=>{
        res.send({message:"Not get category_id ",error:err})
        console.log(err)
    })

}


Get_product_id=(req,res)=>{
    knex("category")
    .innerJoin("product_category","product_category.category_id","category.category_id")
    .select("category.category_id","department_id","category.name").where("product_category.product_id","=",req.params.product_id)
    .then((product_id_data)=>{
        res.send({message:"get product_id ",product_id_data:product_id_data})
    }).catch((err)=>{
        res.send({error:"error",err:err})
        console.log(err);
    })
}

Get_department_id=(req,res)=>{
    knex("category")
    .innerJoin("department","department.department_id","category.department_id")
    .select("category_id","category.description","category.name","category.department_id").where("department.department_id","=",req.params.department_id)
    .then((department_id)=>{
        res.send({message:"get product_id ",product_id_data:department_id})
    }).catch((err)=>{
        res.send({error:"erroproduct_id_datar",err:err})
        console.log(err);
    })
}
module.exports={Category_data,Category_id,Get_product_id,Get_department_id}